# Children Meals Mobile App

React Native mobile application for tracking children's meals with gamification features.

## Features

- User authentication (email/password with verification code)
- Child profile management
- Meal type selection (Breakfast, Lunch, Dinner, Snack)
- Quiz and video activities to earn coins
- Food image capture and AI nutrition analysis
- Meal logging with food categories
- Coin reward system

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update API configuration in `src/config/api.js`:
   - Set your backend API URL

3. Run the app:
```bash
npm start
```

Then press:
- `a` for Android
- `i` for iOS
- `w` for web

## Project Structure

- `src/screens/` - All screen components
- `src/navigation/` - Navigation configuration
- `src/context/` - React context providers
- `src/config/` - Configuration files

## Notes

- Make sure your backend API is running and accessible
- Update the API base URL in `src/config/api.js` for your environment
- For production, configure proper API endpoints
