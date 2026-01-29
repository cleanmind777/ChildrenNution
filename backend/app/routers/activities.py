from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security

router = APIRouter(prefix="/api/activities", tags=["activities"])

@router.get("/quizzes", response_model=List[schemas.QuizResponse])
async def get_quizzes(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all available quizzes"""
    quizzes = db.query(models.Quiz).all()
    return quizzes

@router.get("/quizzes/{quiz_id}", response_model=schemas.QuizResponse)
async def get_quiz(
    quiz_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific quiz"""
    quiz = db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()
    
    if not quiz:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Quiz not found"
        )
    
    return quiz

@router.get("/videos", response_model=List[schemas.VideoResponse])
async def get_videos(
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all available videos"""
    videos = db.query(models.Video).all()
    return videos

@router.get("/videos/{video_id}", response_model=schemas.VideoResponse)
async def get_video(
    video_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get a specific video"""
    video = db.query(models.Video).filter(models.Video.id == video_id).first()
    
    if not video:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Video not found"
        )
    
    return video

@router.post("/complete", response_model=schemas.ActivityResponse)
async def complete_activity(
    activity: schemas.ActivityCreate,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Complete an activity (quiz or video) and award coins"""
    # Verify child belongs to user
    child = db.query(models.Child).filter(
        models.Child.id == activity.child_id,
        models.Child.parent_id == current_user.id
    ).first()
    
    if not child:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Child not found"
        )
    
    coins_earned = 0
    
    # Get coins reward based on activity type
    if activity.activity_type == schemas.ActivityType.QUIZ and activity.quiz_id:
        quiz = db.query(models.Quiz).filter(models.Quiz.id == activity.quiz_id).first()
        if quiz:
            coins_earned = quiz.coins_reward
    elif activity.activity_type == schemas.ActivityType.VIDEO and activity.video_id:
        video = db.query(models.Video).filter(models.Video.id == activity.video_id).first()
        if video:
            coins_earned = video.coins_reward
    
    # Create activity record
    db_activity = models.Activity(
        child_id=activity.child_id,
        activity_type=activity.activity_type,
        quiz_id=activity.quiz_id,
        video_id=activity.video_id,
        coins_earned=coins_earned
    )
    
    db.add(db_activity)
    
    # Award coins
    if coins_earned > 0:
        coin = models.Coin(
            child_id=activity.child_id,
            amount=coins_earned,
            source=activity.activity_type.value,
            source_id=activity.quiz_id or activity.video_id
        )
        db.add(coin)
    
    db.commit()
    db.refresh(db_activity)
    
    return db_activity

@router.get("/child/{child_id}", response_model=List[schemas.ActivityResponse])
async def get_child_activities(
    child_id: int,
    current_user: models.User = Depends(security.get_current_active_user),
    db: Session = Depends(get_db)
):
    """Get all activities for a child"""
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
    
    activities = db.query(models.Activity).filter(
        models.Activity.child_id == child_id
    ).order_by(models.Activity.completed_at.desc()).all()
    
    return activities
