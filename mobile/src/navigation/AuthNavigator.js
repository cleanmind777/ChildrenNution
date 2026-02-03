import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import MainNavigator from './MainNavigator';

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  const { isAuthenticated, hasCompletedOnboarding } = useAuth();

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen />;
  }

  if (isAuthenticated) {
    return <MainNavigator />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
