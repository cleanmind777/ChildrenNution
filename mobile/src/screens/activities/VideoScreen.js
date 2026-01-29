import React, { useState, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { Video, ResizeMode } from 'expo-av';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../config/api';

export default function VideoScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { child, mealType, video } = route.params;
  const [completed, setCompleted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const videoRef = useRef(null);

  const handleVideoEnd = async () => {
    setCompleted(true);
    
    try {
      // Complete activity
      await api.post('/api/activities/complete', {
        child_id: child.id,
        activity_type: 'video',
        video_id: video.id,
      });
    } catch (error) {
      console.error('Error completing video:', error);
    }
  };

  const handleContinue = () => {
    navigation.navigate('Camera', { child, mealType });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          {video.title}
        </Text>
        {video.description && (
          <Text variant="bodyMedium" style={styles.description}>
            {video.description}
          </Text>
        )}
      </View>

      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: video.video_url }}
          style={styles.video}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish && !completed) {
              handleVideoEnd();
            }
          }}
        />
      </View>

      {completed && (
        <View style={styles.completedContainer}>
          <Text variant="titleLarge" style={styles.completedText}>
            Great job! You earned {video.coins_reward} coins!
          </Text>
          <Button
            mode="contained"
            onPress={handleContinue}
            style={styles.button}
          >
            Continue to Food Capture
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontWeight: 'bold',
    color: '#000',
  },
  description: {
    marginTop: 5,
    color: '#666',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  completedContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  completedText: {
    marginBottom: 15,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 5,
  },
});
