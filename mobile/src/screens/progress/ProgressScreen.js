import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Card, ActivityIndicator } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { API_BASE_URL } from '../../config/api';
// import api from '../../config/api'; // use when progress API is ready

const DEFAULT_AVATAR = require('../../../assets/pic/addChild/select_gender.png');

function getAvatarSource(child) {
  const url = child?.avatar_url;
  if (!url) return DEFAULT_AVATAR;
  if (url.startsWith('http')) return { uri: url };
  return { uri: `${API_BASE_URL}${url}` };
}

const COLORS = {
  primary: '#083B9A',
  primaryLight: '#3F68C7',
  surface: '#f5f5f5',
  cardBg: '#fff',
  textSecondary: '#666',
  star: '#F68B1F',
};

export default function ProgressScreen() {
  const route = useRoute();
  const child = route.params?.child;
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(!!child?.id);

  useEffect(() => {
    if (child?.id) {
      loadProgress();
    } else {
      setLoading(false);
    }
  }, [child?.id]);

  const loadProgress = async () => {
    try {
      // Replace with your progress API when ready, e.g. GET /api/children/:id/progress
      // const res = await api.get(`/api/children/${child.id}/progress`);
      // setStats(res.data);
      setStats({
        stars_earned: 0,
        videos_watched: 0,
        quizzes_completed: 0,
        veggies_tried: 0,
        badges_unlocked: 0,
        path_progress: 0, // 0–100 or steps completed
      });
    } catch (error) {
      console.error('Error loading progress:', error);
      setStats({
        stars_earned: 0,
        videos_watched: 0,
        quizzes_completed: 0,
        veggies_tried: 0,
        badges_unlocked: 0,
        path_progress: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  const s = stats || {};
  const starsEarned = s.stars_earned ?? 0;
  const videosWatched = s.videos_watched ?? 0;
  const quizzesCompleted = s.quizzes_completed ?? 0;
  const veggiesTried = s.veggies_tried ?? 0;
  const badgesUnlocked = s.badges_unlocked ?? 0;
  const pathProgress = Math.min(100, Math.max(0, s.path_progress ?? 0));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar */}
      <View style={styles.avatarSection}>
        <Image
          source={getAvatarSource(child)}
          style={styles.avatar}
        />
        {child?.name && (
          <Text style={styles.childName}>{child.name}</Text>
        )}
      </View>

      {/* Stat cards */}
      <View style={styles.statsGrid}>
        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons name="star" size={28} color={COLORS.star} />
            <Text style={styles.statCount}>{starsEarned}</Text>
            <Text style={styles.statLabel}>Stars Earned</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons name="play-circle" size={28} color={COLORS.primary} />
            <Text style={styles.statCount}>{videosWatched}</Text>
            <Text style={styles.statLabel}>Videos Watched</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons name="quiz" size={28} color={COLORS.primary} />
            <Text style={styles.statCount}>{quizzesCompleted}</Text>
            <Text style={styles.statLabel}>Quizzes Completed</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons name="carrot" size={28} color="#2E7D32" />
            <Text style={styles.statCount}>{veggiesTried}</Text>
            <Text style={styles.statLabel}>Veggies Tried</Text>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons name="medal" size={28} color={COLORS.star} />
            <Text style={styles.statCount}>{badgesUnlocked}</Text>
            <Text style={styles.statLabel}>Badges Unlocked</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Path progress */}
      <Card style={styles.pathCard}>
        <Card.Content>
          <View style={styles.pathHeader}>
            <MaterialCommunityIcons name="chart-line" size={24} color={COLORS.primary} />
            <Text style={styles.pathTitle}>Path Progress</Text>
          </View>
          <View style={styles.progressBarWrap}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${pathProgress}%` }]} />
            </View>
            <Text style={styles.progressPercent}>{pathProgress}%</Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  childName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 20,
  },
  statCard: {
    width: '50%',
    paddingHorizontal: 6,
    paddingVertical: 6,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statCount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  pathCard: {
    marginTop: 4,
    elevation: 2,
  },
  pathHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pathTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#111',
  },
  progressBarWrap: {
    marginTop: 4,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
  },
  progressPercent: {
    marginTop: 8,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
});
