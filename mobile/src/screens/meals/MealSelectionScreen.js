import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const MEAL_TYPES = [
  { type: 'breakfast', label: 'Breakfast', icon: 'weather-sunny' },
  { type: 'lunch', label: 'Lunch', icon: 'weather-sunset' },
  { type: 'dinner', label: 'Dinner', icon: 'weather-night' },
  { type: 'snack', label: 'Snack', icon: 'cookie' },
];

export default function MealSelectionScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { child } = route.params;

  const handleSelectMeal = (mealType) => {
    navigation.navigate('Activity', { child, mealType });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Select Meal Type
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          For {child.name}
        </Text>
      </View>

      <View style={styles.mealsContainer}>
        {MEAL_TYPES.map((meal) => (
          <TouchableOpacity
            key={meal.type}
            onPress={() => handleSelectMeal(meal.type)}
            style={styles.mealCard}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <MaterialCommunityIcons
                  name={meal.icon}
                  size={48}
                  color="#6200ee"
                />
                <Text variant="titleLarge" style={styles.mealLabel}>
                  {meal.label}
                </Text>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 5,
    color: '#666',
  },
  mealsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  mealCard: {
    marginBottom: 15,
  },
  card: {
    elevation: 4,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  mealLabel: {
    marginTop: 15,
    fontWeight: 'bold',
  },
});
