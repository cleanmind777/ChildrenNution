import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAddChild } from '../../../context/AddChildContext';

export default function AddChildSetName() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();
  const [notification, setNotification] = useState('');
  const canNext = (form.name || '').trim().length > 0;

  const handleNext = () => {
    if (!canNext) {
      setNotification('Please enter the child\'s name to continue.');
      return;
    }
    navigation.navigate('AddChildSelectGender');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Name</Text>
      <TextInput
        label="Child's name *"
        value={form.name}
        onChangeText={(v) => update('name', v)}
        mode="outlined"
        style={styles.input}
        placeholder="Enter name"
      />
      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next
      </Button>
      <Snackbar visible={!!notification} onDismiss={() => setNotification('')} duration={3000}>
        {notification}
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
