# Children Meals Backend API

FastAPI backend for the Children Meals mobile application.

## Features

- User authentication (email/password with verification code)
- Child profile management
- Meal logging with AI nutrition analysis
- Quiz and video activities
- Coin reward system
- Food image upload and analysis

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
   - Database URL
   - Secret key
   - SMTP settings for email
   - OpenAI API key for nutrition analysis

4. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/verify` - Verify email with code
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/resend-code` - Resend verification code
- `GET /api/auth/me` - Get current user info

### Children
- `POST /api/children/` - Create child profile
- `GET /api/children/` - Get all children
- `GET /api/children/{child_id}` - Get child by ID
- `PUT /api/children/{child_id}` - Update child
- `DELETE /api/children/{child_id}` - Delete child

### Meals
- `POST /api/meals/upload-image` - Upload food image
- `POST /api/meals/analyze-nutrition` - Analyze nutrition from image
- `POST /api/meals/` - Create meal log
- `GET /api/meals/child/{child_id}` - Get child's meals
- `GET /api/meals/{meal_id}` - Get meal by ID

### Activities
- `GET /api/activities/quizzes` - Get all quizzes
- `GET /api/activities/quizzes/{quiz_id}` - Get quiz by ID
- `GET /api/activities/videos` - Get all videos
- `GET /api/activities/videos/{video_id}` - Get video by ID
- `POST /api/activities/complete` - Complete activity and earn coins
- `GET /api/activities/child/{child_id}` - Get child's activities

### Coins
- `GET /api/coins/child/{child_id}/balance` - Get coin balance
- `GET /api/coins/child/{child_id}/history` - Get coin history

## Database

The application uses SQLAlchemy with PostgreSQL (or SQLite for development). Tables are automatically created on startup.

## Notes

- For production, configure proper CORS origins
- Upload images to cloud storage (S3, Cloudinary, etc.)
- Configure proper email service for verification codes
- Set up OpenAI API key for nutrition analysis
