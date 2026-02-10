import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const ONBOARDING_COMPLETE_KEY = 'onboarding_complete';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [justSignedUp, setJustSignedUp] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const [token, userData, onboardingComplete] = await Promise.all([
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY),
      ]);

      setHasCompletedOnboarding(onboardingComplete === 'true');

      if (token && userData) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
      setHasCompletedOnboarding(true);
    } catch (error) {
      console.error('Error saving onboarding state:', error);
    }
  };

  const signup = async (email, password) => {
    try {
      const response = await api.post('/api/auth/signup', { email, password });
      const { access_token } = response.data;

      await AsyncStorage.setItem('token', access_token);

      const userResponse = await api.get('/api/auth/me');
      await AsyncStorage.setItem('user', JSON.stringify(userResponse.data));

      setUser(userResponse.data);
      setIsAuthenticated(true);
      setJustSignedUp(true);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Signup failed',
      };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      
      const { access_token } = response.data;
      
      await AsyncStorage.setItem('token', access_token);
      
      // Get user info
      const userResponse = await api.get('/api/auth/me');
      await AsyncStorage.setItem('user', JSON.stringify(userResponse.data));
      
      setUser(userResponse.data);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setJustSignedUp(false);
    // Optionally keep onboarding state so returning users don't see it again
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        hasCompletedOnboarding,
        justSignedUp,
        completeOnboarding,
        setJustSignedUp,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
