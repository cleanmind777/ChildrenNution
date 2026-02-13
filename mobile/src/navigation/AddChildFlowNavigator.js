import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
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

const STEP_SCREENS = [
  'AddChildSetName',
  'AddChildSelectGender',
  'AddChildChooseAvatar',
  'AddChildInputAge',
  'AddChildFoodAllergies',
  'AddChildDietaryRestrictions',
  'AddChildFeedingPreferences',
  'AddChildMedicalNotes',
];

const TOTAL_STEPS = STEP_SCREENS.length;

function AddChildHeader({ navigation, route, back }) {
  const stepIndex = STEP_SCREENS.indexOf(route.name);
  const currentStep = stepIndex >= 0 ? stepIndex + 1 : 1;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        {back ? (
          <TouchableOpacity
            onPress={navigation.goBack}
            style={styles.backButton}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.backButtonPlaceholder} />
        )}

        

        <Text style={styles.stepText}>
          {currentStep}/{TOTAL_STEPS}
        </Text>
      </View>
      <Text style={styles.headerTitle}>New Profile</Text>
    </View>
  );
}

export default function AddChildFlowNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AddChildHeader {...props} />,
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

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#083B9A',
    minHeight: 152
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 64,
    paddingBottom: 12,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonPlaceholder: {
    width: 32,
    height: 32,
  },
  backText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontFamily: 'Futura',
    fontWeight: '700',
    fontStyle: 'normal',
    fontSize: 23.91,
    lineHeight: 23.91,
    letterSpacing: 0,
    textAlign: 'center',
  },
  stepText: {
    color: '#FFFFFF',
    fontFamily: 'Futura PT',
    fontWeight: '600',
    fontStyle: 'normal',
    fontSize: 19.68,
    lineHeight: 19.68,
    letterSpacing: 0,
  },
});
