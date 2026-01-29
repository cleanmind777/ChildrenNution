# Children Meals Application

A complete mobile application for tracking children's meals with gamification features, AI-powered nutrition analysis, and educational activities.

## Project Structure

```
.
├── backend/          # FastAPI backend
│   ├── app/
│   │   ├── routers/  # API endpoints
│   │   ├── models.py # Database models
│   │   ├── schemas.py # Pydantic schemas
│   │   └── main.py   # FastAPI app
│   └── requirements.txt
│
└── mobile/           # React Native app
    ├── src/
    │   ├── screens/  # Screen components
    │   ├── navigation/ # Navigation setup
    │   ├── context/  # Context providers
    │   └── config/   # Configuration
    └── package.json
```

## Features

### Backend (FastAPI)
- User authentication with email/password and verification codes
- Child profile management (age, sex, allergies, dietary restrictions)
- Meal logging with AI nutrition analysis
- Quiz and video activities
- Coin reward system
- Food image upload and processing

### Mobile App (React Native)
- User authentication screens
- Child profile management
- Meal type selection
- Quiz and video activities
- Camera integration for food capture
- AI nutrition analysis display
- Meal logging with categories
- Coin balance tracking

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

5. Set up PostgreSQL database:
   ```bash
   createdb children_meals_db
   ```

6. Update `.env` with your configuration:
   - `DATABASE_URL`: PostgreSQL connection string: `postgresql://username:password@localhost:5432/children_meals_db`
   - Secret key for JWT tokens
   - SMTP settings for email verification
   - OpenAI API key for nutrition analysis

7. Run the server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Mobile App Setup

1. Navigate to mobile directory:
```bash
cd mobile
```

2. Install dependencies:
```bash
npm install
```

3. Update API configuration in `src/config/api.js`:
   - Set your backend API URL (default: `http://localhost:8000` for development)

4. Start the app:
```bash
npm start
```

5. Run on device/emulator:
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/verify` - Verify email with code
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/resend-code` - Resend verification code

### Children
- `POST /api/children/` - Create child profile
- `GET /api/children/` - Get all children
- `GET /api/children/{id}` - Get child by ID
- `PUT /api/children/{id}` - Update child
- `DELETE /api/children/{id}` - Delete child

### Meals
- `POST /api/meals/upload-image` - Upload food image
- `POST /api/meals/analyze-nutrition` - Analyze nutrition
- `POST /api/meals/` - Create meal log
- `GET /api/meals/child/{child_id}` - Get child's meals

### Activities
- `GET /api/activities/quizzes` - Get all quizzes
- `GET /api/activities/videos` - Get all videos
- `POST /api/activities/complete` - Complete activity

### Coins
- `GET /api/coins/child/{child_id}/balance` - Get coin balance
- `GET /api/coins/child/{child_id}/history` - Get coin history

## Workflow

1. **Signup/Login**: User creates account and verifies email
2. **Add Children**: Parent adds child profiles with allergies and preferences
3. **Select Child**: Before meal, parent selects child profile
4. **Select Meal Type**: Choose Breakfast, Lunch, Dinner, or Snack
5. **Activity**: Child completes quiz or watches video to earn coins
6. **Capture Food**: Take photo of food
7. **Nutrition Analysis**: AI analyzes nutrition and detects allergens
8. **Log Meal**: Select food category and save meal information

## Configuration

### Backend Environment Variables
- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - JWT secret key
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` - Email settings
- `OPENAI_API_KEY` - OpenAI API key for nutrition analysis
- `UPLOAD_DIR` - Directory for uploaded images

### Mobile Configuration
- Update `API_BASE_URL` in `src/config/api.js` for your backend URL

## Development Notes

- Backend uses PostgreSQL (required)
- Email service requires SMTP configuration (or use console output for development)
- OpenAI API key required for nutrition analysis (or uses fallback)
- Image uploads stored locally (use cloud storage for production)
- CORS configured for all origins (restrict in production)

## Production Considerations

1. Configure proper CORS origins
3. Upload images to cloud storage (S3, Cloudinary, etc.)
4. Set up proper email service
5. Use environment-specific API URLs
6. Enable HTTPS
7. Add rate limiting
8. Implement proper error logging
9. Set up database migrations with Alembic
10. Add unit and integration tests

## License

This project is provided as-is for educational purposes.
