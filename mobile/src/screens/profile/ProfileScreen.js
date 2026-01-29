import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await logout();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>
            Profile
          </Text>
          <Text variant="bodyLarge" style={styles.email}>
            {user?.email}
          </Text>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.button}
          buttonColor="#d32f2f"
        >
          Logout
        </Button>
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
  card: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    color: '#666',
  },
  actions: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 5,
  },
});
