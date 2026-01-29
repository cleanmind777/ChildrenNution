import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import api from '../../config/api';

export default function CameraScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { child, mealType } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      setPhoto(photo);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
    }
  };

  const handleContinue = async () => {
    if (!photo) return;

    setUploading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', {
        uri: photo.uri,
        type: 'image/jpeg',
        name: 'food.jpg',
      });

      // Upload image
      const uploadRes = await api.post('/api/meals/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Navigate to nutrition screen
      navigation.navigate('Nutrition', {
        child,
        mealType,
        imageUri: photo.uri,
        imageUrl: uploadRes.data.image_url,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.center}>
        <Text>No access to camera</Text>
        <Button onPress={pickImage} style={styles.button}>
          Pick from Gallery
        </Button>
      </View>
    );
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo.uri }} style={styles.preview} />
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={() => setPhoto(null)}
            style={styles.button}
          >
            Retake
          </Button>
          <Button
            mode="contained"
            onPress={handleContinue}
            loading={uploading}
            disabled={uploading}
            style={styles.button}
          >
            Continue
          </Button>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={(ref) => setCameraRef(ref)}
      >
        <View style={styles.overlay}>
          <View style={styles.instructions}>
            <Text variant="titleLarge" style={styles.instructionText}>
              Capture your food
            </Text>
          </View>
          <View style={styles.controls}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={pickImage}
            >
              <Text style={styles.galleryButtonText}>Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.captureButton}
              onPress={takePicture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            <View style={styles.placeholder} />
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
  },
  instructions: {
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  instructionText: {
    color: '#fff',
    textAlign: 'center',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  galleryButton: {
    padding: 10,
  },
  galleryButtonText: {
    color: '#fff',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ee',
  },
  placeholder: {
    width: 70,
  },
  preview: {
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});
