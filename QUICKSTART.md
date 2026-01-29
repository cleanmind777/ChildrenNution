# Quick Start Guide

Get your Children Meals app running in 5 minutes!

## Step 1: Backend Setup (2 minutes)

**Prerequisites:** PostgreSQL must be installed and running.

**Install PostgreSQL (if not installed):**
- Windows: https://www.postgresql.org/download/windows/
- Mac: `brew install postgresql@15 && brew services start postgresql@15`
- Linux: `sudo apt install postgresql`

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
copy .env.example .env  # Windows
# cp .env.example .env  # Mac/Linux
```

**Create PostgreSQL database:**
```bash
# Using psql
createdb children_meals_db

# Or using SQL command
psql -U postgres
CREATE DATABASE children_meals_db;
\q
```

**See `backend/POSTGRESQL_SETUP.md` for detailed PostgreSQL setup instructions.**

Edit `.env` and set:
```
DATABASE_URL=postgresql://username:password@localhost:5432/children_meals_db
SECRET_KEY=your-random-secret-key-here
```

**Note:** Replace `username` and `password` with your PostgreSQL credentials.

Start server:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

✅ Backend running at http://localhost:8000

## Step 2: Mobile App Setup (2 minutes)

```bash
cd mobile
npm install
```

Edit `src/config/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8000';  // For iOS simulator
// const API_BASE_URL = 'http://10.0.2.2:8000';  // For Android emulator
```

Start app:
```bash
npm start
```

Press `i` for iOS or `a` for Android

## Step 3: Test the App (1 minute)

1. **Sign Up**
   - Email: test@example.com
   - Password: password123
   - Check console for verification code (if email not configured)

2. **Add Child**
   - Tap "+" button
   - Fill in child details
   - Save

3. **Start Meal**
   - Select child
   - Choose meal type
   - Complete quiz or skip
   - Take photo
   - View nutrition
   - Log meal

## Troubleshooting

**Backend won't start:**
- Check Python version (3.8+)
- Install dependencies: `pip install -r requirements.txt`
- **PostgreSQL not running:** Start PostgreSQL service
  - Windows: Check Services (services.msc)
  - Mac/Linux: `sudo systemctl start postgresql` or `brew services start postgresql@15`
- **Database connection error:** 
  - Verify PostgreSQL is running: `pg_isready`
  - Check DATABASE_URL in `.env` is correct
  - Ensure database exists: `psql -l` to list databases

**Mobile can't connect:**
- Check backend is running
- Update API_BASE_URL in `src/config/api.js`
- For physical device, use your computer's IP

**Verification code:**
- Check console output (if email not configured)
- Or set up SMTP in `.env`

## Next Steps

- Add sample quizzes/videos: `python backend/app/seed_data.py`
- Configure email service in `.env`
- Add OpenAI API key for nutrition analysis
- See SETUP.md for detailed instructions

## API Documentation

Visit http://localhost:8000/docs for interactive API documentation
