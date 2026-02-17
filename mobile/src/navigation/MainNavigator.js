import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import ChildrenListScreen from '../screens/children/ChildrenListScreen';
import ChildProfileScreen from '../screens/children/ChildProfileScreen';
import AddChildFlowWrapper from './AddChildFlowWrapper';
import MealSelectionScreen from '../screens/meals/MealSelectionScreen';
import ActivityScreen from '../screens/activities/ActivityScreen';
import QuizScreen from '../screens/activities/QuizScreen';
import VideoScreen from '../screens/activities/VideoScreen';
import CameraScreen from '../screens/meals/CameraScreen';
import NutritionScreen from '../screens/meals/NutritionScreen';
import MealLogScreen from '../screens/meals/MealLogScreen';
import CoinsScreen from '../screens/coins/CoinsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';

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
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddChild" 
        component={AddChildFlowWrapper}
        options={{ title: 'Add Child', headerShown: false }}
      />
      <Stack.Screen 
        name="MealSelection" 
        component={MealSelectionScreen}
        options={{ headerShown: false }}
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
      <Stack.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{ title: 'View Progress' }}
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
        name="ChildProfileTab"
        component={ChildrenStack}
        options={{
          title: 'Child Profile',
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
            <MaterialCommunityIcons name="cash" size={size} color={color} />
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
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}
