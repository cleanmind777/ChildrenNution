from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/children", tags=["children"])

@router.post("/", response_model=schemas.ChildResponse)
async def create_child(
    child: schemas.ChildCreate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new child profile"""
    db_child = models.Child(
        parent_id=current_user.id,
        **child.dict()
    )
    db.add(db_child)
    db.commit()
    db.refresh(db_child)
    return db_child

@router.get("/", response_model=List[schemas.ChildResponse])
async def get_children(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all children for current user"""
    children = db.query(models.Child).filter(models.Child.parent_id == current_user.id).all()
    return children

@router.get("/{child_id}", response_model=schemas.ChildResponse)
async def get_child(
    child_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific child by ID"""
    child = db.query(models.Child).filter(
        models.Child.id == child_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not child:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child not found"
        )
    
    return child

@router.put("/{child_id}", response_model=schemas.ChildResponse)
async def update_child(
    child_id: int,
    child_update: schemas.ChildUpdate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Update a child profile"""
    child = db.query(models.Child).filter(
        models.Child.id == child_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not child:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child not found"
        )
    
    update_data = child_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(child, field, value)
    
    db.commit()
    db.refresh(child)
    return child

@router.delete("/{child_id}")
async def delete_child(
    child_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Delete a child profile"""
    child = db.query(models.Child).filter(
        models.Child.id == child_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not child:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child not found"
        )
    
    db.delete(child)
    db.commit()
    return {"message": "Child deleted successfully"}
