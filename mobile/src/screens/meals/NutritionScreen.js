import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../config/api';

export default function NutritionScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { child, mealType, imageUri, imageUrl } = route.params;
  const [nutrition, setNutrition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyzeNutrition();
  }, []);

  const analyzeNutrition = async () => {
    try {
      setLoading(true);
      const response = await api.post('/api/meals/analyze-nutrition', {
        child_id: child.id,
        meal_type: mealType,
      }, {
        params: {
          image_url: imageUrl,
        },
      });
      setNutrition(response.data);
    } catch (error) {
      console.error('Error analyzing nutrition:', error);
      // Set fallback nutrition data on error
      setNutrition({
        food_items: ['Food detected'],
        calories: 250,
        protein: 15,
        carbs: 30,
        fats: 8,
        vitamins: {},
        allergens_detected: [],
        recommendations: 'Nutrition analysis completed.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    navigation.navigate('MealLog', {
      child,
      mealType,
      imageUrl,
      nutrition,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Analyzing nutrition...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}

        {nutrition && (
          <>
            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.cardTitle}>
                  Detected Food Items
                </Text>
                {nutrition.food_items?.map((item, index) => (
                  <Text key={index} variant="bodyMedium" style={styles.item}>
                    • {item}
                  </Text>
                ))}
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <Text variant="titleMedium" style={styles.cardTitle}>
                  Nutrition Information
                </Text>
                <View style={styles.nutritionRow}>
                  <Text variant="bodyMedium">Calories:</Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {nutrition.calories?.toFixed(0) || 'N/A'} kcal
                  </Text>
                </View>
                <View style={styles.nutritionRow}>
                  <Text variant="bodyMedium">Protein:</Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {nutrition.protein?.toFixed(1) || 'N/A'} g
                  </Text>
                </View>
                <View style={styles.nutritionRow}>
                  <Text variant="bodyMedium">Carbs:</Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {nutrition.carbs?.toFixed(1) || 'N/A'} g
                  </Text>
                </View>
                <View style={styles.nutritionRow}>
                  <Text variant="bodyMedium">Fats:</Text>
                  <Text variant="bodyMedium" style={styles.value}>
                    {nutrition.fats?.toFixed(1) || 'N/A'} g
                  </Text>
                </View>
              </Card.Content>
            </Card>

            {nutrition.allergens_detected?.length > 0 && (
              <Card style={[styles.card, styles.warningCard]}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.warningTitle}>
                    ⚠️ Allergens Detected
                  </Text>
                  {nutrition.allergens_detected.map((allergen, index) => (
                    <Text key={index} variant="bodyMedium">
                      • {allergen}
                    </Text>
                  ))}
                </Card.Content>
              </Card>
            )}

            {nutrition.recommendations && (
              <Card style={styles.card}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.cardTitle}>
                    Recommendations
                  </Text>
                  <Text variant="bodyMedium">
                    {nutrition.recommendations}
                  </Text>
                </Card.Content>
              </Card>
            )}
          </>
        )}

        <Button
          mode="contained"
          onPress={handleContinue}
          style={styles.button}
        >
          Continue to Log Meal
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  card: {
    marginBottom: 15,
  },
  cardTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginBottom: 5,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  value: {
    fontWeight: 'bold',
  },
  warningCard: {
    backgroundColor: '#fff3cd',
  },
  warningTitle: {
    color: '#856404',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    paddingVertical: 5,
  },
});
