import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Card, Text, FAB, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../config/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LAST_SEEN_CHILD_ID_KEY = 'last_seen_child_id';

export default function ChildrenListScreen() {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const hasNavigatedToLastSeen = useRef(false);

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
      const list = response.data;
      setChildren(list);

      // After login: navigate to last seen child profile if we have one
      if (!hasNavigatedToLastSeen.current && list.length > 0) {
        const lastId = await AsyncStorage.getItem(LAST_SEEN_CHILD_ID_KEY);
        if (lastId) {
          const exists = list.some((c) => String(c.id) === String(lastId));
          if (exists) {
            hasNavigatedToLastSeen.current = true;
            navigation.navigate('ChildProfile', { childId: lastId });
          }
        }
      }
    } catch (error) {
      console.error('Error loading children:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChild = (child) => {
    navigation.navigate('ChildProfile', { childId: child.id });
  };

  const handleDeleteChild = (child) => {
    Alert.alert(
      'Delete profile',
      `Are you sure you want to delete ${child.name}'s profile? This cannot be undone.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/api/children/${child.id}`);
              setChildren((prev) => prev.filter((c) => c.id !== child.id));
              const lastId = await AsyncStorage.getItem(LAST_SEEN_CHILD_ID_KEY);
              if (lastId && String(child.id) === String(lastId)) {
                await AsyncStorage.removeItem(LAST_SEEN_CHILD_ID_KEY);
              }
            } catch (error) {
              console.error('Error deleting child:', error);
              Alert.alert('Error', error.response?.data?.detail || 'Failed to delete profile');
            }
          },
        },
      ]
    );
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
          <Card style={styles.card}>
            <Card.Content>
              <View style={styles.cardHeader}>
                <TouchableOpacity
                  style={styles.cardTitleWrap}
                  onPress={() => handleSelectChild(item)}
                  activeOpacity={0.7}
                >
                  <Text variant="titleLarge">{item.name}</Text>
                  <Text variant="bodyMedium" style={styles.ageText}>
                    Age: {item.age} • {item.sex}
                  </Text>
                </TouchableOpacity>
                <View style={styles.cardActions}>
                  <TouchableOpacity
                    onPress={() => handleDeleteChild(item)}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    style={styles.deleteButton}
                  >
                    <MaterialCommunityIcons name="delete-outline" size={24} color="#c62828" />
                  </TouchableOpacity>
                  <MaterialCommunityIcons name="chevron-right" size={24} color="#666" />
                </View>
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
  cardTitleWrap: {
    flex: 1,
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  deleteButton: {
    padding: 4,
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
