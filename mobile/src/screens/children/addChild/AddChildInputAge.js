import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAddChild } from '../../../context/AddChildContext';

const MIN_AGE = 1;
const MAX_AGE = 18;

export default function AddChildInputAge() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();
  const [age, setAge] = useState(form.age?.toString() || '');
  const [notification, setNotification] = useState('');

  const ageNum = parseInt(age, 10);
  const isValidAge = !isNaN(ageNum) && ageNum >= MIN_AGE && ageNum <= MAX_AGE;
  const canNext = isValidAge;

  const goNext = () => {
    if (!canNext) {
      setNotification(`Please enter an age between ${MIN_AGE} and ${MAX_AGE} to continue.`);
      return;
    }
    update('age', age);
    navigation.navigate('AddChildFoodAllergies');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Input Age</Text>
      <TextInput
        label="Age *"
        value={age}
        onChangeText={setAge}
        mode="outlined"
        keyboardType="number-pad"
        style={styles.input}
        placeholder={`${MIN_AGE}–${MAX_AGE}`}
        error={age.length > 0 && !isValidAge}
      />
      {age.length > 0 && !isValidAge && (
        <Text style={styles.errorText}>Please enter an age between {MIN_AGE} and {MAX_AGE}</Text>
      )}
      <Button mode="contained" onPress={goNext} style={styles.button}>
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
  input: { marginBottom: 8 },
  errorText: { color: '#b00020', fontSize: 12, marginBottom: 16 },
  button: { marginTop: 16 },
});
