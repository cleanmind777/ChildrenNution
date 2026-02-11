from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey, Text, Float, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


def _enum_values(enum_class):
    """Use enum values (e.g. 'male') in DB, not names (e.g. 'MALE')."""
    return [e.value for e in enum_class]

class MealType(str, enum.Enum):
    BREAKFAST = "breakfast"
    LUNCH = "lunch"
    DINNER = "dinner"
    SNACK = "snack"

class Gender(str, enum.Enum):
    MALE = "male"
    FEMALE = "female"
    OTHER = "other"

class ActivityType(str, enum.Enum):
    QUIZ = "quiz"
    VIDEO = "video"

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)
    verification_code = Column(String, nullable=True)
    verification_code_expires = Column(DateTime, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    children = relationship("Child", back_populates="parent", cascade="all, delete-orphan")

class Child(Base):
    __tablename__ = "children"
    
    id = Column(Integer, primary_key=True, index=True)
    parent_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    age = Column(Integer, nullable=False)
    sex = Column(Enum(Gender, values_callable=_enum_values), nullable=False)
    food_allergies = Column(Text, nullable=True)  # JSON string or comma-separated
    dietary_restrictions = Column(Text, nullable=True)  # JSON string or comma-separated
    feeding_preferences = Column(Text, nullable=True)  # JSON string
    medical_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    parent = relationship("User", back_populates="children")
    meals = relationship("Meal", back_populates="child", cascade="all, delete-orphan")
    coins = relationship("Coin", back_populates="child", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="child", cascade="all, delete-orphan")

class Meal(Base):
    __tablename__ = "meals"
    
    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("children.id"), nullable=False)
    meal_type = Column(Enum(MealType, values_callable=_enum_values), nullable=False)
    food_image_url = Column(String, nullable=True)
    nutrition_data = Column(Text, nullable=True)  # JSON string
    food_category = Column(String, nullable=True)
    notes = Column(Text, nullable=True)
    logged_at = Column(DateTime(timezone=True), server_default=func.now())
    
    child = relationship("Child", back_populates="meals")

class Activity(Base):
    __tablename__ = "activities"
    
    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("children.id"), nullable=False)
    activity_type = Column(Enum(ActivityType, values_callable=_enum_values), nullable=False)
    quiz_id = Column(Integer, ForeignKey("quizzes.id"), nullable=True)
    video_id = Column(Integer, ForeignKey("videos.id"), nullable=True)
    completed_at = Column(DateTime(timezone=True), server_default=func.now())
    coins_earned = Column(Integer, default=0)
    
    child = relationship("Child", back_populates="activities")
    quiz = relationship("Quiz", back_populates="activities")
    video = relationship("Video", back_populates="activities")

class Quiz(Base):
    __tablename__ = "quizzes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    questions = Column(Text, nullable=False)  # JSON string
    coins_reward = Column(Integer, default=10)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    activities = relationship("Activity", back_populates="quiz")

class Video(Base):
    __tablename__ = "videos"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    video_url = Column(String, nullable=False)
    duration_seconds = Column(Integer, nullable=False)
    coins_reward = Column(Integer, default=5)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    activities = relationship("Activity", back_populates="video")

class FoodAllergyOption(Base):
    """Admin-managed list of food allergy options shown to all users when adding a child."""
    __tablename__ = "food_allergy_options"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(255), nullable=False)
    sort_order = Column(Integer, nullable=False, default=0)

class DietaryRestrictionOption(Base):
    """Admin-managed list of dietary restriction options for the add-child flow."""
    __tablename__ = "dietary_restriction_options"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(255), nullable=False)
    sort_order = Column(Integer, nullable=False, default=0)

class FeedingPreferenceOption(Base):
    """Admin-managed list of feeding preference options for the add-child flow."""
    __tablename__ = "feeding_preference_options"

    id = Column(Integer, primary_key=True, index=True)
    label = Column(String(255), nullable=False)
    sort_order = Column(Integer, nullable=False, default=0)

class Coin(Base):
    __tablename__ = "coins"
    
    id = Column(Integer, primary_key=True, index=True)
    child_id = Column(Integer, ForeignKey("children.id"), nullable=False)
    amount = Column(Integer, nullable=False)
    source = Column(String, nullable=False)  # "quiz", "video", "meal", etc.
    source_id = Column(Integer, nullable=True)  # ID of the source (quiz_id, video_id, meal_id)
    earned_at = Column(DateTime(timezone=True), server_default=func.now())
    
    child = relationship("Child", back_populates="coins")
