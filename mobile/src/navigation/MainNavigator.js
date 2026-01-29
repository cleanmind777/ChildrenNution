import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AuthNavigator from './AuthNavigator';

// Screens
import ChildrenListScreen from '../screens/children/ChildrenListScreen';
import ChildProfileScreen from '../screens/children/ChildProfileScreen';
import AddChildScreen from '../screens/children/AddChildScreen';
import MealSelectionScreen from '../screens/meals/MealSelectionScreen';
import ActivityScreen from '../screens/activities/ActivityScreen';
import QuizScreen from '../screens/activities/QuizScreen';
import VideoScreen from '../screens/activities/VideoScreen';
import CameraScreen from '../screens/meals/CameraScreen';
import NutritionScreen from '../screens/meals/NutritionScreen';
import MealLogScreen from '../screens/meals/MealLogScreen';
import CoinsScreen from '../screens/coins/CoinsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function ChildrenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ChildrenList" 
        component={ChildrenListScreen}
        options={{ title: 'My Children' }}
      />
      <Stack.Screen 
        name="ChildProfile" 
        component={ChildProfileScreen}
        options={{ title: 'Child Profile' }}
      />
      <Stack.Screen 
        name="AddChild" 
        component={AddChildScreen}
        options={{ title: 'Add Child' }}
      />
      <Stack.Screen 
        name="MealSelection" 
        component={MealSelectionScreen}
        options={{ title: 'Select Meal' }}
      />
      <Stack.Screen 
        name="Activity" 
        component={ActivityScreen}
        options={{ title: 'Activity' }}
      />
      <Stack.Screen 
        name="Quiz" 
        component={QuizScreen}
        options={{ title: 'Quiz' }}
      />
      <Stack.Screen 
        name="Video" 
        component={VideoScreen}
        options={{ title: 'Video' }}
      />
      <Stack.Screen 
        name="Camera" 
        component={CameraScreen}
        options={{ title: 'Capture Food' }}
      />
      <Stack.Screen 
        name="Nutrition" 
        component={NutritionScreen}
        options={{ title: 'Nutrition Analysis' }}
      />
      <Stack.Screen 
        name="MealLog" 
        component={MealLogScreen}
        options={{ title: 'Log Meal' }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tab.Screen
        name="Children"
        component={ChildrenStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-child" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Coins"
        component={CoinsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="coin" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function MainNavigator() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
