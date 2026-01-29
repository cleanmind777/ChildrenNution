from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app import models, schemas, security
import json

router = APIRouter(prefix="/api/admin", tags=["admin"])

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
