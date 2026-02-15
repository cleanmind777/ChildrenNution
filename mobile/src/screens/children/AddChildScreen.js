import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Snackbar, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api';

export default function AddChildScreen() {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [sex, setSex] = useState('male');
  const [foodAllergies, setFoodAllergies] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [feedingPreferences, setFeedingPreferences] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleSave = async () => {
    if (!name || !birthday) {
      setError('Please fill in name and birthday (YYYY-MM-DD)');
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(birthday.trim())) {
      setError('Birthday must be YYYY-MM-DD');
      return;
    }
    const [y, m, d] = birthday.trim().split('-').map(Number);
    const birthDate = new Date(y, m - 1, d);
    if (isNaN(birthDate.getTime()) || birthDate.getFullYear() !== y || birthDate.getMonth() !== m - 1 || birthDate.getDate() !== d) {
      setError('Please enter a valid birthday (YYYY-MM-DD)');
      return;
    }
    let age = new Date().getFullYear() - birthDate.getFullYear();
    const monthDiff = new Date().getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && new Date().getDate() < birthDate.getDate())) age--;
    if (age < 1 || age > 18) {
      setError('Child\'s age must be between 1 and 18 years');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/api/children/', {
        name,
        birthday: birthday.trim(),
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
            label="Birthday (YYYY-MM-DD) *"
            value={birthday}
            onChangeText={setBirthday}
            mode="outlined"
            style={styles.input}
            placeholder="e.g. 2018-05-15"
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
