"""Dietary restriction options: public GET for app, admin CRUD to manage the list."""
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/dietary-restriction-options", tags=["dietary-restriction-options"])


@router.get("/", response_model=List[schemas.DietaryRestrictionOptionResponse])
async def list_dietary_restriction_options(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Get the list of dietary restriction options for the add-child flow. All authenticated users."""
    options = (
        db.query(models.DietaryRestrictionOption)
        .order_by(models.DietaryRestrictionOption.sort_order.asc(), models.DietaryRestrictionOption.id.asc())
        .all()
    )
    return options

