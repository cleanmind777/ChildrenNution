import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAddChild } from '../../../context/AddChildContext';

export default function AddChildFeedingPreferences() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();
  const value = Array.isArray(form.feedingPreferences) ? form.feedingPreferences.join(', ') : (form.feedingPreferences || '');

  const onChange = (text) => update('feedingPreferences', text ? text.split(',').map((s) => s.trim()).filter(Boolean) : []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Feeding Preferences</Text>
      <TextInput
        label="Feeding preferences (comma-separated)"
        value={value}
        onChangeText={onChange}
        mode="outlined"
        multiline
        numberOfLines={3}
        placeholder="e.g. Prefers soft foods, Likes spicy"
        style={styles.input}
      />
      <Button mode="contained" onPress={() => navigation.navigate('AddChildMedicalNotes')} style={styles.button}>
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 20 },
  input: { marginBottom: 16 },
  button: { marginTop: 16 },
});
