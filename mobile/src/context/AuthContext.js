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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      
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

  const signup = async (email, password) => {
    try {
      const response = await api.post('/api/auth/signup', { email, password });
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Signup failed' 
      };
    }
  };

  const verifyCode = async (email, code) => {
    try {
      const response = await api.post('/api/auth/verify', { email, code });
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
        error: error.response?.data?.detail || 'Verification failed' 
      };
    }
  };

  const resendCode = async (email) => {
    try {
      await api.post('/api/auth/resend-code', { email });
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Failed to resend code' 
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
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        signup,
        verifyCode,
        resendCode,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
