import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Card, Text, ActivityIndicator } from 'react-native-paper';
import api from '../../config/api';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CoinsScreen() {
  const [children, setChildren] = useState([]);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const childrenRes = await api.get('/api/children/');
      setChildren(childrenRes.data);

      // Load balances for each child
      const balancePromises = childrenRes.data.map(async (child) => {
        const balanceRes = await api.get(`/api/coins/child/${child.id}/balance`);
        return { childId: child.id, balance: balanceRes.data.total_coins };
      });

      const balanceResults = await Promise.all(balancePromises);
      const balanceMap = {};
      balanceResults.forEach(({ childId, balance }) => {
        balanceMap[childId] = balance;
      });
      setBalances(balanceMap);
    } catch (error) {
      console.error('Error loading data:', error);
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          Coin Balance
        </Text>
      </View>

      <FlatList
        data={children}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.childInfo}>
                <Text variant="titleLarge">{item.name}</Text>
                <Text variant="bodyMedium" style={styles.ageText}>
                  Age: {item.age}
                </Text>
              </View>
              <View style={styles.coinInfo}>
                <MaterialCommunityIcons name="coin" size={32} color="#FFD700" />
                <Text variant="headlineMedium" style={styles.coinAmount}>
                  {balances[item.id] || 0}
                </Text>
              </View>
            </Card.Content>
          </Card>
        )}
        contentContainerStyle={styles.list}
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  childInfo: {
    flex: 1,
  },
  ageText: {
    color: '#666',
    marginTop: 5,
  },
  coinInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  coinAmount: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
