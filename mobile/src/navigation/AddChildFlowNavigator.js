import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddChildSetName from '../screens/children/addChild/AddChildSetName';
import AddChildSelectGender from '../screens/children/addChild/AddChildSelectGender';
import AddChildChooseAvatar from '../screens/children/addChild/AddChildChooseAvatar';
import AddChildInputAge from '../screens/children/addChild/AddChildInputAge';
import AddChildFoodAllergies from '../screens/children/addChild/AddChildFoodAllergies';
import AddChildDietaryRestrictions from '../screens/children/addChild/AddChildDietaryRestrictions';
import AddChildFeedingPreferences from '../screens/children/addChild/AddChildFeedingPreferences';
import AddChildMedicalNotes from '../screens/children/addChild/AddChildMedicalNotes';

const Stack = createNativeStackNavigator();

export default function AddChildFlowNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        title: 'Add Child',
      }}
    >
      <Stack.Screen name="AddChildSetName" component={AddChildSetName} options={{ title: 'Set Name' }} />
      <Stack.Screen name="AddChildSelectGender" component={AddChildSelectGender} options={{ title: 'Select Gender' }} />
      <Stack.Screen name="AddChildChooseAvatar" component={AddChildChooseAvatar} options={{ title: 'Choose Avatar' }} />
      <Stack.Screen name="AddChildInputAge" component={AddChildInputAge} options={{ title: 'Input Age' }} />
      <Stack.Screen name="AddChildFoodAllergies" component={AddChildFoodAllergies} options={{ title: 'Food Allergies' }} />
      <Stack.Screen name="AddChildDietaryRestrictions" component={AddChildDietaryRestrictions} options={{ title: 'Dietary Restrictions' }} />
      <Stack.Screen name="AddChildFeedingPreferences" component={AddChildFeedingPreferences} options={{ title: 'Feeding Preferences' }} />
      <Stack.Screen name="AddChildMedicalNotes" component={AddChildMedicalNotes} options={{ title: 'Medical / Other Notes' }} />
    </Stack.Navigator>
  );
}
