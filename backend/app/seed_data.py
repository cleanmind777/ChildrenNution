"""
Script to seed initial data (quizzes and videos)
Run this after setting up the database
"""
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models
import json

def seed_data():
    db: Session = SessionLocal()
    
    try:
        # Sample Quiz
        quiz_data = {
            "questions": [
                {
                    "question": "Which food group helps build strong muscles?",
                    "options": ["Fruits", "Vegetables", "Protein", "Grains"],
                    "correct": "Protein"
                },
                {
                    "question": "How many servings of fruits and vegetables should you eat daily?",
                    "options": ["1-2", "3-4", "5-6", "7-8"],
                    "correct": "5-6"
                },
                {
                    "question": "Which drink is best for hydration?",
                    "options": ["Soda", "Water", "Juice", "Energy drinks"],
                    "correct": "Water"
                }
            ]
        }
        
        quiz = models.Quiz(
            title="Healthy Eating Basics",
            description="Test your knowledge about healthy eating!",
            questions=json.dumps(quiz_data["questions"]),
            coins_reward=10
        )
        db.add(quiz)
        
        # Sample Video
        video = models.Video(
            title="Fun Food Facts for Kids",
            description="Learn interesting facts about different foods!",
            video_url="https://example.com/video1.mp4",  # Replace with actual video URL
            duration_seconds=120,
            coins_reward=5
        )
        db.add(video)
        
        db.commit()
        print("Sample data seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding data: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
