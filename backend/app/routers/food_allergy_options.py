"""Food allergy options: public GET for app, admin CRUD to manage the list."""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/food-allergy-options", tags=["food-allergy-options"])


@router.get("/", response_model=List[schemas.FoodAllergyOptionResponse])
async def list_food_allergy_options(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Get the list of food allergy options for the add-child flow. All authenticated users."""
    options = (
        db.query(models.FoodAllergyOption)
        .order_by(models.FoodAllergyOption.sort_order.asc(), models.FoodAllergyOption.id.asc())
        .all()
    )
    return options
