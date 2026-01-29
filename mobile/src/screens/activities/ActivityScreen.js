import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api from '../../config/api';

export default function ActivityScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { child, mealType } = route.params;
  const [quizzes, setQuizzes] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const [quizzesRes, videosRes] = await Promise.all([
        api.get('/api/activities/quizzes'),
        api.get('/api/activities/videos'),
      ]);
      setQuizzes(quizzesRes.data);
      setVideos(videosRes.data);
    } catch (error) {
      console.error('Error loading activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQuiz = (quiz) => {
    navigation.navigate('Quiz', { child, mealType, quiz });
  };

  const handleSelectVideo = (video) => {
    navigation.navigate('Video', { child, mealType, video });
  };

  const handleSkip = () => {
    navigation.navigate('Camera', { child, mealType });
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
          Choose Activity
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Complete a quiz or watch a video to earn coins!
        </Text>
      </View>

      <View style={styles.activitiesContainer}>
        {quizzes.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Quizzes
            </Text>
            {quizzes.map((quiz) => (
              <TouchableOpacity
                key={quiz.id}
                onPress={() => handleSelectQuiz(quiz)}
              >
                <Card style={styles.activityCard}>
                  <Card.Content style={styles.cardContent}>
                    <MaterialCommunityIcons
                      name="quiz"
                      size={32}
                      color="#6200ee"
                    />
                    <View style={styles.activityInfo}>
                      <Text variant="titleMedium">{quiz.title}</Text>
                      <Text variant="bodySmall" style={styles.coinsText}>
                        {quiz.coins_reward} coins
                      </Text>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#666"
                    />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {videos.length > 0 && (
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Videos
            </Text>
            {videos.map((video) => (
              <TouchableOpacity
                key={video.id}
                onPress={() => handleSelectVideo(video)}
              >
                <Card style={styles.activityCard}>
                  <Card.Content style={styles.cardContent}>
                    <MaterialCommunityIcons
                      name="play-circle"
                      size={32}
                      color="#6200ee"
                    />
                    <View style={styles.activityInfo}>
                      <Text variant="titleMedium">{video.title}</Text>
                      <Text variant="bodySmall" style={styles.coinsText}>
                        {video.coins_reward} coins
                      </Text>
                    </View>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={24}
                      color="#666"
                    />
                  </Card.Content>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.skipContainer}>
        <Button mode="outlined" onPress={handleSkip}>
          Skip Activity
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    marginTop: 5,
    color: '#666',
  },
  activitiesContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  activityCard: {
    marginBottom: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityInfo: {
    flex: 1,
    marginLeft: 15,
  },
  coinsText: {
    color: '#6200ee',
    marginTop: 5,
  },
  skipContainer: {
    paddingVertical: 10,
  },
});
