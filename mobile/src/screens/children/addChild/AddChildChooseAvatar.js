import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Button, Text, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useAddChild } from '../../../context/AddChildContext';

export default function AddChildChooseAvatar() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();
  const [notification, setNotification] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!result.canceled) update('avatarUri', result.assets[0].uri);
  };

  const handleNext = () => {
    if (!form.avatarUri) {
      setNotification('Please choose an avatar or tap Skip to continue without one.');
      return;
    }
    navigation.navigate('AddChildInputAge');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Avatar</Text>
      <TouchableOpacity style={styles.avatarWrap} onPress={pickImage}>
        {form.avatarUri ? (
          <Image source={{ uri: form.avatarUri }} style={styles.avatar} />
        ) : (
          <Text style={styles.avatarPlaceholder}>Tap to choose photo</Text>
        )}
      </TouchableOpacity>
      <View style={styles.buttons}>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('AddChildInputAge')}
          style={styles.button}
        >
          Skip
        </Button>
        <Button mode="contained" onPress={handleNext} style={styles.button}>
          Next
        </Button>
      </View>
      <Snackbar visible={!!notification} onDismiss={() => setNotification('')} duration={3000}>
        {notification}
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 20 },
  avatarWrap: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#eee', marginBottom: 16, justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  avatarPlaceholder: { color: '#666' },
  buttons: { flexDirection: 'row', gap: 12, marginTop: 16 },
  button: { flex: 1 },
});
