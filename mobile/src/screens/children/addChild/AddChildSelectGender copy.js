import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, SegmentedButtons } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAddChild } from '../../../context/AddChildContext';

export default function AddChildSelectGender() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Gender</Text>
      <SegmentedButtons
        value={form.gender}
        onValueChange={(v) => update('gender', v)}
        buttons={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
        style={styles.segmented}
      />
      <Button mode="contained" onPress={() => navigation.navigate('AddChildChooseAvatar')} style={styles.button}>
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 20 },
  segmented: { marginBottom: 16 },
  button: { marginTop: 16 },
});
