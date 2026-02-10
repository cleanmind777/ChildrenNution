import React from 'react';
import { useAuth } from '../context/AuthContext';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import CongratulationsScreen from '../screens/auth/CongratulationsScreen';

/**
 * Root navigator: picks onboarding, auth (login/signup), or main app.
 * Keeps AuthNavigator and MainNavigator from importing each other (no require cycle).
 */
export default function RootNavigator() {
  const { isAuthenticated, hasCompletedOnboarding, justSignedUp } = useAuth();

  if (!hasCompletedOnboarding) {
    return <OnboardingScreen />;
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  if (justSignedUp) {
    return <CongratulationsScreen />;
  }

  return <MainNavigator />;
}
