from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from app.models import MealType, Gender, ActivityType

# User Schemas
class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    is_active: bool
    is_verified: bool
    
    class Config:
        from_attributes = True

class VerificationCodeRequest(BaseModel):
    email: EmailStr

class VerificationCodeVerify(BaseModel):
    email: EmailStr
    code: str

# Child Schemas
class ChildCreate(BaseModel):
    name: str
    age: int = Field(..., gt=0, le=18)
    sex: Gender
    food_allergies: Optional[str] = None
    dietary_restrictions: Optional[str] = None
    feeding_preferences: Optional[str] = None

class ChildUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = Field(None, gt=0, le=18)
    sex: Optional[Gender] = None
    food_allergies: Optional[str] = None
    dietary_restrictions: Optional[str] = None
    feeding_preferences: Optional[str] = None

class ChildResponse(BaseModel):
    id: int
    parent_id: int
    name: str
    age: int
    sex: Gender
    food_allergies: Optional[str]
    dietary_restrictions: Optional[str]
    feeding_preferences: Optional[str]
    created_at: datetime
    
    class Config:
        from_attributes = True

# Meal Schemas
class MealCreate(BaseModel):
    child_id: int
    meal_type: MealType
    food_category: Optional[str] = None
    notes: Optional[str] = None
    image_url: Optional[str] = None
    nutrition_data: Optional[str] = None

class MealResponse(BaseModel):
    id: int
    child_id: int
    meal_type: MealType
    food_image_url: Optional[str]
    nutrition_data: Optional[str]
    food_category: Optional[str]
    notes: Optional[str]
    logged_at: datetime
    
    class Config:
        from_attributes = True

# Activity Schemas
class ActivityCreate(BaseModel):
    child_id: int
    activity_type: ActivityType
    quiz_id: Optional[int] = None
    video_id: Optional[int] = None

class ActivityResponse(BaseModel):
    id: int
    child_id: int
    activity_type: ActivityType
    quiz_id: Optional[int]
    video_id: Optional[int]
    completed_at: datetime
    coins_earned: int
    
    class Config:
        from_attributes = True

# Quiz Schemas
class QuizResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    questions: str
    coins_reward: int
    
    class Config:
        from_attributes = True

# Video Schemas
class VideoResponse(BaseModel):
    id: int
    title: str
    description: Optional[str]
    video_url: str
    duration_seconds: int
    coins_reward: int
    
    class Config:
        from_attributes = True

# Coin Schemas
class CoinResponse(BaseModel):
    id: int
    child_id: int
    amount: int
    source: str
    source_id: Optional[int]
    earned_at: datetime
    
    class Config:
        from_attributes = True

class CoinBalanceResponse(BaseModel):
    child_id: int
    total_coins: int

# Nutrition Analysis Schema
class NutritionAnalysisRequest(BaseModel):
    child_id: int
    meal_type: MealType

class NutritionAnalysisResponse(BaseModel):
    food_items: List[str]
    calories: Optional[float]
    protein: Optional[float]
    carbs: Optional[float]
    fats: Optional[float]
    vitamins: Optional[dict]
    allergens_detected: List[str]
    recommendations: Optional[str]

# Token Schema
class Token(BaseModel):
    access_token: str
    token_type: str
