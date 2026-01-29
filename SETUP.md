# Setup Guide

## Quick Start

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment (recommended):**
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

5. **Set up PostgreSQL database:**
   ```bash
   # Create database
   createdb children_meals_db
   
   # Or using psql
   psql -U postgres
   CREATE DATABASE children_meals_db;
   ```

6. **Edit `.env` file with your settings:**
   - `DATABASE_URL`: PostgreSQL connection string: `postgresql://username:password@localhost:5432/children_meals_db`
     - Replace `username` and `password` with your PostgreSQL credentials
     - Default port is 5432
   - `SECRET_KEY`: Generate a random secret key
   - `SMTP_*`: Email settings (optional for development)
   - `OPENAI_API_KEY`: Your OpenAI API key (optional, will use fallback if not set)

7. **Run the server:**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

8. **Seed sample data (optional):**
   ```bash
   python app/seed_data.py
   ```

### Mobile App Setup

1. **Navigate to mobile directory:**
   ```bash
   cd mobile
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API configuration:**
   - Open `src/config/api.js`
   - Update `API_BASE_URL` to match your backend:
     - For Android emulator: `http://10.0.2.2:8000`
     - For iOS simulator: `http://localhost:8000`
     - For physical device: `http://YOUR_COMPUTER_IP:8000`

4. **Start the app:**
   ```bash
   npm start
   ```

5. **Run on device:**
   - Press `a` for Android
   - Press `i` for iOS
   - Press `w` for web

## Testing the Application

### 1. Create Account
- Open the app
- Tap "Sign up"
- Enter email and password
- Check console/email for verification code
- Enter verification code

### 2. Add Child Profile
- After login, tap the "+" button
- Fill in child information
- Save

### 3. Start a Meal
- Select a child
- Choose meal type (Breakfast, Lunch, Dinner, Snack)
- Complete a quiz or watch a video (or skip)
- Capture food photo
- View nutrition analysis
- Select food category and log meal

## Troubleshooting

### Backend Issues

**Database errors:**
- Make sure PostgreSQL is running: `pg_isready` or check service status
- Verify database URL format: `postgresql://user:password@host:port/dbname`
- Check PostgreSQL credentials are correct
- Ensure database exists: `psql -l` to list databases
- For connection issues, check `pg_hba.conf` and firewall settings

**Email not sending:**
- Check SMTP settings in `.env`
- For development, verification codes are printed to console

**OpenAI API errors:**
- App will use fallback nutrition data if API key is not set
- Set `OPENAI_API_KEY` in `.env` for real analysis

### Mobile App Issues

**Cannot connect to backend:**
- Check API_BASE_URL in `src/config/api.js`
- Ensure backend is running
- Check firewall settings
- For physical device, use computer's IP address

**Camera not working:**
- Grant camera permissions when prompted
- Check app permissions in device settings

**Navigation errors:**
- Make sure all screens are properly registered in navigation

## Production Deployment

### Backend
1. Ensure PostgreSQL is properly configured
2. Set proper CORS origins
3. Use cloud storage for images (S3, Cloudinary)
4. Configure production email service
5. Use environment variables for secrets
6. Enable HTTPS

### Mobile App
1. Update API URL to production endpoint
2. Build for production:
   ```bash
   expo build:android
   expo build:ios
   ```
3. Configure app signing
4. Submit to app stores

## API Testing

You can test the API using:
- Swagger UI: `http://localhost:8000/docs`
- Postman
- curl commands

Example curl for signup:
```bash
curl -X POST "http://localhost:8000/api/auth/signup" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```
