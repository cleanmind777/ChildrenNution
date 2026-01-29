from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.database import engine, Base
from app.routers import auth, children, meals, activities, coins, admin

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Children Meals API", version="1.0.0")

# CORS middleware for React Native
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your React Native app's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files for uploaded images
UPLOAD_DIR = os.getenv("UPLOAD_DIR", "./uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Include routers
app.include_router(auth.router)
app.include_router(children.router)
app.include_router(meals.router)
app.include_router(activities.router)
app.include_router(coins.router)
app.include_router(admin.router)

@app.get("/")
async def root():
    return {"message": "Children Meals API", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
