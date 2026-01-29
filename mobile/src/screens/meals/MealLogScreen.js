import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../config/api';

const FOOD_CATEGORIES = [
  'Fruits',
  'Vegetables',
  'Grains',
  'Protein',
  'Dairy',
  'Snacks',
  'Beverages',
  'Other',
];

export default function MealLogScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { child, mealType, imageUrl, nutrition } = route.params;
  const [foodCategory, setFoodCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!foodCategory) {
      setError('Please select a food category');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await api.post('/api/meals/', {
        child_id: child.id,
        meal_type: mealType,
        food_category: foodCategory,
        notes: notes || null,
        image_url: imageUrl,
        nutrition_data: JSON.stringify(nutrition),
      });

      // Navigate back to children list
      navigation.navigate('ChildrenList');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save meal');
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineSmall" style={styles.title}>
          Log Meal
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Meal Type: {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
        </Text>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.label}>
            Food Category *
          </Text>
          <View style={styles.categories}>
            {FOOD_CATEGORIES.map((category) => (
              <Button
                key={category}
                mode={foodCategory === category ? 'contained' : 'outlined'}
                onPress={() => setFoodCategory(category)}
                style={styles.categoryButton}
              >
                {category}
              </Button>
            ))}
          </View>
        </View>

        <TextInput
          label="Notes (Optional)"
          value={notes}
          onChangeText={setNotes}
          mode="outlined"
          multiline
          numberOfLines={4}
          placeholder="Add any additional notes about the meal..."
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSave}
          loading={saving}
          disabled={saving || !foodCategory}
          style={styles.button}
        >
          Save Meal Log
        </Button>
      </View>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
      >
        {error}
      </Snackbar>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    marginBottom: 20,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    marginRight: 10,
    marginBottom: 10,
  },
  input: {
    marginBottom: 20,
  },
  button: {
    paddingVertical: 5,
  },
});
