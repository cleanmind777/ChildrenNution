"""Feeding preference options: public GET for app, admin CRUD to manage the list."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/feeding-preference-options", tags=["feeding-preference-options"])


@router.get("/", response_model=List[schemas.FeedingPreferenceOptionResponse])
async def list_feeding_preference_options(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Get the list of feeding preference options for the add-child flow. All authenticated users."""
    options = (
        db.query(models.FeedingPreferenceOption)
        .order_by(models.FeedingPreferenceOption.sort_order.asc(), models.FeedingPreferenceOption.id.asc())
        .all()
    )
    return options

