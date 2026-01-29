import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Snackbar, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api';

export default function AddChildScreen() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('male');
  const [foodAllergies, setFoodAllergies] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [feedingPreferences, setFeedingPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!name || !age) {
      setError('Please fill in name and age');
      return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 18) {
      setError('Age must be between 1 and 18');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/api/children/', {
        name,
        age: ageNum,
        sex,
        food_allergies: foodAllergies || null,
        dietary_restrictions: dietaryRestrictions || null,
        feeding_preferences: feedingPreferences || null,
      });
      
      navigation.goBack();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add child');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <TextInput
            label="Name *"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Age *"
            value={age}
            onChangeText={setAge}
            mode="outlined"
            keyboardType="number-pad"
            style={styles.input}
          />

          <Text variant="bodyMedium" style={styles.label}>
            Gender *
          </Text>
          <SegmentedButtons
            value={sex}
            onValueChange={setSex}
            buttons={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
              { value: 'other', label: 'Other' },
            ]}
            style={styles.segmentedButtons}
          />

          <TextInput
            label="Food Allergies"
            value={foodAllergies}
            onChangeText={setFoodAllergies}
            mode="outlined"
            multiline
            numberOfLines={3}
            placeholder="e.g., Peanuts, Dairy, Eggs"
            style={styles.input}
          />

          <TextInput
            label="Dietary Restrictions"
            value={dietaryRestrictions}
            onChangeText={setDietaryRestrictions}
            mode="outlined"
            multiline
            numberOfLines={3}
            placeholder="e.g., Vegetarian, Gluten-free"
            style={styles.input}
          />

          <TextInput
            label="Feeding Preferences"
            value={feedingPreferences}
            onChangeText={setFeedingPreferences}
            mode="outlined"
            multiline
            numberOfLines={3}
            placeholder="e.g., Prefers soft foods, Likes spicy food"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleSave}
            loading={loading}
            disabled={loading}
            style={styles.button}
          >
            Save Child Profile
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
      >
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  input: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 10,
    marginTop: 5,
  },
  segmentedButtons: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
  },
});
