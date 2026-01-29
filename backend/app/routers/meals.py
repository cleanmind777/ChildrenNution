from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Query
from sqlalchemy.orm import Session
from typing import List
import os
import shutil
from datetime import datetime
from app.database import get_db
from app import models, schemas, security
from app.ai_service import analyze_food_nutrition
import json

router = APIRouter(prefix="/api/meals", tags=["meals"])

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload-image")
async def upload_food_image(
    file: UploadFile = File(...),
    current_user: models.User = Depends(security.get_current_active_user)
):
    """Upload food image"""
    # Save file
    file_path = os.path.join(UPLOAD_DIR, f"{datetime.now().timestamp()}_{file.filename}")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return URL (in production, upload to cloud storage)
    file_url = f"/uploads/{os.path.basename(file_path)}"
    return {"image_url": file_url, "file_path": file_path}

@router.post("/analyze-nutrition")
async def analyze_nutrition(
    request: schemas.NutritionAnalysisRequest,
    image_url: str = Query(..., description="URL of the food image"),
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Analyze food nutrition using AI"""
    # Verify child belongs to user
    child = db.query(models.Child).filter(
        models.Child.id == request.child_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not child:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child not found"
        )
    
    # Analyze nutrition
    nutrition_data = await analyze_food_nutrition(
        image_url=image_url,
        child_allergies=child.food_allergies,
        dietary_restrictions=child.dietary_restrictions
    )
    
    return nutrition_data

@router.post("/", response_model=schemas.MealResponse)
async def create_meal(
    meal: schemas.MealCreate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a meal log"""
    # Verify child belongs to user
    child = db.query(models.Child).filter(
        models.Child.id == meal.child_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not child:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child not found"
        )
    
    db_meal = models.Meal(
        child_id=meal.child_id,
        meal_type=meal.meal_type,
        food_image_url=meal.image_url,
        nutrition_data=meal.nutrition_data,
        food_category=meal.food_category,
        notes=meal.notes
    )
    
    db.add(db_meal)
    db.commit()
    db.refresh(db_meal)
    
    # Award coins for meal logging
    coin = models.Coin(
        child_id=meal.child_id,
        amount=5,
        source="meal",
        source_id=db_meal.id
    )
    db.add(coin)
    db.commit()
    
    return db_meal

@router.get("/child/{child_id}", response_model=List[schemas.MealResponse])
async def get_child_meals(
    child_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all meals for a child"""
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
    
    meals = db.query(models.Meal).filter(models.Meal.child_id == child_id).order_by(models.Meal.logged_at.desc()).all()
    return meals

@router.get("/{meal_id}", response_model=schemas.MealResponse)
async def get_meal(
    meal_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific meal"""
    meal = db.query(models.Meal).join(models.Child).filter(
        models.Meal.id == meal_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not meal:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Meal not found"
        )
    
    return meal
