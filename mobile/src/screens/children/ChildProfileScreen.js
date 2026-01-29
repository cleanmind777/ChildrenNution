import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../config/api';

export default function ChildProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const childId = route.params?.childId;
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChild();
  }, []);

  const loadChild = async () => {
    try {
      const response = await api.get(`/api/children/${childId}`);
      setChild(response.data);
    } catch (error) {
      console.error('Error loading child:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!child) {
    return (
      <View style={styles.center}>
        <Text>Child not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall">{child.name}</Text>
          <Text variant="bodyMedium" style={styles.info}>
            Age: {child.age} • {child.sex}
          </Text>
        </Card.Content>
      </Card>

      {child.food_allergies && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Food Allergies</Text>
            <Text variant="bodyMedium">{child.food_allergies}</Text>
          </Card.Content>
        </Card>
      )}

      {child.dietary_restrictions && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Dietary Restrictions</Text>
            <Text variant="bodyMedium">{child.dietary_restrictions}</Text>
          </Card.Content>
        </Card>
      )}

      {child.feeding_preferences && (
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="titleMedium">Feeding Preferences</Text>
            <Text variant="bodyMedium">{child.feeding_preferences}</Text>
          </Card.Content>
        </Card>
      )}

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('MealSelection', { child })}
          style={styles.button}
        >
          Start Meal
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
  card: {
    margin: 10,
  },
  info: {
    marginTop: 5,
    color: '#666',
  },
  actions: {
    padding: 20,
  },
  button: {
    paddingVertical: 5,
  },
});
