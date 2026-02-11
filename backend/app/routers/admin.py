from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security
import json

router = APIRouter(prefix="/api/admin", tags=["admin"])


# ---------- Food allergy options (admin-managed list for add-child flow) ----------
@router.get("/food-allergy-options", response_model=List[schemas.FoodAllergyOptionResponse])
async def admin_list_food_allergy_options(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """List all food allergy options (admin)."""
    return (
        db.query(models.FoodAllergyOption)
        .order_by(models.FoodAllergyOption.sort_order.asc(), models.FoodAllergyOption.id.asc())
        .all()
    )


@router.post("/food-allergy-options", response_model=schemas.FoodAllergyOptionResponse)
async def admin_create_food_allergy_option(
    payload: schemas.FoodAllergyOptionCreate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Add a new food allergy option (admin)."""
    opt = models.FoodAllergyOption(label=payload.label, sort_order=payload.sort_order or 0)
    db.add(opt)
    db.commit()
    db.refresh(opt)
    return opt


@router.put("/food-allergy-options/{option_id}", response_model=schemas.FoodAllergyOptionResponse)
async def admin_update_food_allergy_option(
    option_id: int,
    payload: schemas.FoodAllergyOptionUpdate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Update a food allergy option (admin)."""
    opt = db.query(models.FoodAllergyOption).filter(models.FoodAllergyOption.id == option_id).first()
    if not opt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    if payload.label is not None:
        opt.label = payload.label
    if payload.sort_order is not None:
        opt.sort_order = payload.sort_order
    db.commit()
    db.refresh(opt)
    return opt


@router.delete("/food-allergy-options/{option_id}")
async def admin_delete_food_allergy_option(
    option_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Delete a food allergy option (admin)."""
    opt = db.query(models.FoodAllergyOption).filter(models.FoodAllergyOption.id == option_id).first()
    if not opt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    db.delete(opt)
    db.commit()
    return {"message": "Deleted"}


# ---------- Dietary restriction options (admin-managed list for add-child flow) ----------
@router.get("/dietary-restriction-options", response_model=List[schemas.DietaryRestrictionOptionResponse])
async def admin_list_dietary_restriction_options(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """List all dietary restriction options (admin)."""
    return (
        db.query(models.DietaryRestrictionOption)
        .order_by(models.DietaryRestrictionOption.sort_order.asc(), models.DietaryRestrictionOption.id.asc())
        .all()
    )


@router.post("/dietary-restriction-options", response_model=schemas.DietaryRestrictionOptionResponse)
async def admin_create_dietary_restriction_option(
    payload: schemas.DietaryRestrictionOptionCreate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Add a new dietary restriction option (admin)."""
    opt = models.DietaryRestrictionOption(label=payload.label, sort_order=payload.sort_order or 0)
    db.add(opt)
    db.commit()
    db.refresh(opt)
    return opt


@router.put("/dietary-restriction-options/{option_id}", response_model=schemas.DietaryRestrictionOptionResponse)
async def admin_update_dietary_restriction_option(
    option_id: int,
    payload: schemas.DietaryRestrictionOptionUpdate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Update a dietary restriction option (admin)."""
    opt = db.query(models.DietaryRestrictionOption).filter(models.DietaryRestrictionOption.id == option_id).first()
    if not opt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    if payload.label is not None:
        opt.label = payload.label
    if payload.sort_order is not None:
        opt.sort_order = payload.sort_order
    db.commit()
    db.refresh(opt)
    return opt


@router.delete("/dietary-restriction-options/{option_id}")
async def admin_delete_dietary_restriction_option(
    option_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Delete a dietary restriction option (admin)."""
    opt = db.query(models.DietaryRestrictionOption).filter(models.DietaryRestrictionOption.id == option_id).first()
    if not opt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    db.delete(opt)
    db.commit()
    return {"message": "Deleted"}


# ---------- Feeding preference options (admin-managed list for add-child flow) ----------
@router.get("/feeding-preference-options", response_model=List[schemas.FeedingPreferenceOptionResponse])
async def admin_list_feeding_preference_options(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """List all feeding preference options (admin)."""
    return (
        db.query(models.FeedingPreferenceOption)
        .order_by(models.FeedingPreferenceOption.sort_order.asc(), models.FeedingPreferenceOption.id.asc())
        .all()
    )


@router.post("/feeding-preference-options", response_model=schemas.FeedingPreferenceOptionResponse)
async def admin_create_feeding_preference_option(
    payload: schemas.FeedingPreferenceOptionCreate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Add a new feeding preference option (admin)."""
    opt = models.FeedingPreferenceOption(label=payload.label, sort_order=payload.sort_order or 0)
    db.add(opt)
    db.commit()
    db.refresh(opt)
    return opt


@router.put("/feeding-preference-options/{option_id}", response_model=schemas.FeedingPreferenceOptionResponse)
async def admin_update_feeding_preference_option(
    option_id: int,
    payload: schemas.FeedingPreferenceOptionUpdate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Update a feeding preference option (admin)."""
    opt = db.query(models.FeedingPreferenceOption).filter(models.FeedingPreferenceOption.id == option_id).first()
    if not opt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    if payload.label is not None:
        opt.label = payload.label
    if payload.sort_order is not None:
        opt.sort_order = payload.sort_order
    db.commit()
    db.refresh(opt)
    return opt


@router.delete("/feeding-preference-options/{option_id}")
async def admin_delete_feeding_preference_option(
    option_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db),
):
    """Delete a feeding preference option (admin)."""
    opt = db.query(models.FeedingPreferenceOption).filter(models.FeedingPreferenceOption.id == option_id).first()
    if not opt:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Option not found")
    db.delete(opt)
    db.commit()
    return {"message": "Deleted"}

@router.post("/quizzes", response_model=schemas.QuizResponse)
async def create_quiz(
    title: str,
    description: str = None,
    questions: str = None,
    coins_reward: int = 10,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new quiz (for admin/testing)"""
    quiz = models.Quiz(
        title=title,
        description=description,
        questions=questions or json.dumps([]),
        coins_reward=coins_reward
    )
    db.add(quiz)
    db.commit()
    db.refresh(quiz)
    return quiz

@router.post("/videos", response_model=schemas.VideoResponse)
async def create_video(
    title: str,
    description: str = None,
    video_url: str = None,
    duration_seconds: int = 60,
    coins_reward: int = 5,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Create a new video (for admin/testing)"""
    video = models.Video(
        title=title,
        description=description,
        video_url=video_url or "https://example.com/video.mp4",
        duration_seconds=duration_seconds,
        coins_reward=coins_reward
    )
    db.add(video)
    db.commit()
    db.refresh(video)
    return video
