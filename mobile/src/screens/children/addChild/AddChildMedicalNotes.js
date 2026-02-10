import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../../config/api';
import { useAddChild } from '../../../context/AddChildContext';

export default function AddChildMedicalNotes() {
  const navigation = useNavigation();
  const { form, update, reset } = useAddChild();
  const [notes, setNotes] = useState(form.medicalNotes || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!form.name?.trim()) {
      setError('Please enter the child\'s name');
      return;
    }
    const ageNum = parseInt(form.age, 10);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 18) {
      setError('Age must be between 1 and 18');
      return;
    }

    setLoading(true);
    setError('');
    update('medicalNotes', notes);

    try {
      const payload = {
        name: form.name.trim(),
        age: ageNum,
        sex: form.gender,
        food_allergies: Array.isArray(form.foodAllergies) ? form.foodAllergies.join(', ') || null : form.foodAllergies || null,
        dietary_restrictions: Array.isArray(form.dietaryRestrictions) ? form.dietaryRestrictions.join(', ') || null : form.dietaryRestrictions || null,
        feeding_preferences: Array.isArray(form.feedingPreferences) ? form.feedingPreferences.join(', ') || null : form.feedingPreferences || null,
        medical_notes: notes.trim() || null,
      };
      await api.post('/api/children/', payload);
      reset();
      navigation.getParent()?.goBack();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to add child');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical / Other Notes</Text>
      <TextInput
        label="Medical or other notes"
        value={notes}
        onChangeText={setNotes}
        mode="outlined"
        multiline
        numberOfLines={4}
        placeholder="Any medical or other notes..."
        style={styles.input}
      />
      <Button mode="contained" onPress={handleSave} loading={loading} disabled={loading} style={styles.button}>
        Save Child Profile
      </Button>
      <Snackbar visible={!!error} onDismiss={() => setError('')} duration={3000}>
        {error}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 20 },
  input: { marginBottom: 16 },
  button: { marginTop: 16 },
});
