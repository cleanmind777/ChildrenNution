from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.database import get_db
from app import models, schemas, security
from app.email_service import send_verification_email

router = APIRouter(prefix="/api/auth", tags=["authentication"])

@router.post("/signup", response_model=schemas.UserResponse)
async def signup(user_data: schemas.UserCreate, db: Session = Depends(get_db)):
    """Register a new user and send verification code"""
    # Check if user already exists
    db_user = db.query(models.User).filter(models.User.email == user_data.email).first()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = security.get_password_hash(user_data.password)
    verification_code = security.generate_verification_code()
    
    db_user = models.User(
        email=user_data.email,
        hashed_password=hashed_password,
        is_verified=False,
        verification_code=verification_code,
        verification_code_expires=datetime.utcnow() + timedelta(minutes=10)
    )
    
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    # Send verification email
    send_verification_email(user_data.email, verification_code)
    
    return db_user

@router.post("/verify", response_model=schemas.Token)
async def verify_code(verification: schemas.VerificationCodeVerify, db: Session = Depends(get_db)):
    """Verify email with code and activate account"""
    db_user = db.query(models.User).filter(models.User.email == verification.email).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if db_user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already verified"
        )
    
    if not db_user.verification_code or db_user.verification_code != verification.code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid verification code"
        )
    
    if db_user.verification_code_expires < datetime.utcnow():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Verification code expired"
        )
    
    # Verify user
    db_user.is_verified = True
    db_user.verification_code = None
    db_user.verification_code_expires = None
    db.commit()
    
    # Generate access token
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": str(db_user.id)}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/resend-code")
async def resend_verification_code(request: schemas.VerificationCodeRequest, db: Session = Depends(get_db)):
    """Resend verification code"""
    db_user = db.query(models.User).filter(models.User.email == request.email).first()
    
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )
    
    if db_user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already verified"
        )
    
    # Generate new code
    verification_code = security.generate_verification_code()
    db_user.verification_code = verification_code
    db_user.verification_code_expires = datetime.utcnow() + timedelta(minutes=10)
    db.commit()
    
    # Send email
    send_verification_email(request.email, verification_code)
    
    return {"message": "Verification code sent"}

@router.post("/login", response_model=schemas.Token)
async def login(credentials: schemas.UserLogin, db: Session = Depends(get_db)):
    """Login with email and password"""
    db_user = db.query(models.User).filter(models.User.email == credentials.email).first()
    
    if not db_user or not security.verify_password(credentials.password, db_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not db_user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Email not verified. Please verify your email first."
        )
    
    if not db_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )
    
    access_token_expires = timedelta(minutes=security.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        data={"sub": str(db_user.id)}, expires_delta=access_token_expires
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserResponse)
async def get_current_user_info(current_user: models.User = Depends(security.get_current_active_user)):
    """Get current user information"""
    return current_user
