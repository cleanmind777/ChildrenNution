from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/coins", tags=["coins"])

@router.get("/child/{child_id}/balance", response_model=schemas.CoinBalanceResponse)
async def get_coin_balance(
    child_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get total coin balance for a child"""
    # Verify child belongs to user
    child = db.query(models.Child).filter(
        models.Child.id == child_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not child:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child not found"
        )
    
    total_coins = db.query(func.sum(models.Coin.amount)).filter(
        models.Coin.child_id == child_id
    ).scalar() or 0
    
    return {"child_id": child_id, "total_coins": int(total_coins)}

@router.get("/child/{child_id}/history", response_model=list[schemas.CoinResponse])
async def get_coin_history(
    child_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get coin earning history for a child"""
    # Verify child belongs to user
    child = db.query(models.Child).filter(
        models.Child.id == child_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not child:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child not found"
        )
    
    coins = db.query(models.Coin).filter(
        models.Coin.child_id == child_id
    ).order_by(models.Coin.earned_at.desc()).all()
    
    return coins
