import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Card, Text, Button, FAB, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import api from '../../config/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ChildrenListScreen() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    loadChildren();
    
    const unsubscribe = navigation.addListener('focus', () => {
      loadChildren();
    });

    return unsubscribe;
  }, [navigation]);

  const loadChildren = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/children/');
      setChildren(response.data);
    } catch (error) {
      console.error('Error loading children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChild = (child) => {
    navigation.navigate('MealSelection', { child });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (children.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="account-child-outline" size={80} color="#ccc" />
          <Text variant="titleLarge" style={styles.emptyText}>
            No children added yet
          </Text>
          <Text variant="bodyMedium" style={styles.emptySubtext}>
            Add a child profile to get started
          </Text>
        </View>
        <FAB
          icon="plus"
          style={styles.fab}
          onPress={() => navigation.navigate('AddChild')}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={children}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card} onPress={() => handleSelectChild(item)}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <View>
                  <Text variant="titleLarge">{item.name}</Text>
                  <Text variant="bodyMedium" style={styles.ageText}>
                    Age: {item.age} • {item.sex}
                  </Text>
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
              </View>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={styles.list}
      />
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('AddChild')}
      />
    </View>
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
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ageText: {
    color: '#666',
    marginTop: 5,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 20,
    color: '#666',
  },
  emptySubtext: {
    marginTop: 10,
    color: '#999',
    textAlign: 'center',
  },
});
