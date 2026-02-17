import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import api, { API_BASE_URL } from '../../config/api';
import AddChildContentCard from '../../components/AddChildContentCard';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;
const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;

const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = 499;

const DEFAULT_AVATAR = require('../../../assets/pic/addChild/select_gender.png');
const LAST_SEEN_CHILD_ID_KEY = 'last_seen_child_id';
const IMG_RECTANGLE = require('../../../assets/pic/addChild/rectangle1.png');

const IMG_LOG_MEAL = require('../../../assets/pic/children/log_a_meal.png');
const IMG_WATCH_LEARN = require('../../../assets/pic/children/watch_and_learn.png');
const IMG_TAKE_QUIZ = require('../../../assets/pic/children/take_a_quiz.png');
const IMG_VIEW_PROGRESS = require('../../../assets/pic/children/view_progress.png');

const COLORS = {
  blueDark: '#083B9A',
  blueCard: '#3F68C7',
  blueLight: '#8CA9F3',
  orange: '#F68B1F',
  white: '#FFFFFF',
  textSecondary: '#6A6A6A',
};

export default function ChildProfileScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const childId = route.params?.childId;
  const [child, setChild] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (childId) {
        AsyncStorage.setItem(LAST_SEEN_CHILD_ID_KEY, String(childId));
      }
    }, [childId])
  );

  useEffect(() => {
    loadChild();
  }, [childId]);

  const loadChild = async () => {
    if (!childId) return;
    try {
      const response = await api.get(`/api/children/${childId}`);
      setChild(response.data);
    } catch (error) {
      console.error('Error loading child:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogAMeal = () => {
    navigation.navigate('MealSelection', { child });
  };

  const handleWatchAndLearn = () => {
    navigation.navigate('Activity', { child, mealType: 'snack' });
  };

  const handleTakeAQuiz = () => {
    navigation.navigate('Activity', { child, mealType: 'snack' });
  };

  const handleViewProgress = () => {
    navigation.navigate('Progress', { child });
  };

  const goToChildrenList = () => {
    navigation.navigate('ChildrenList');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  if (!child) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text style={styles.errorText}>Child not found</Text>
      </View>
    );
  }

  const avatarSource = child.avatar_url
    ? (child.avatar_url.startsWith('http')
      ? { uri: child.avatar_url }
      : { uri: `${API_BASE_URL}${child.avatar_url}` })
    : DEFAULT_AVATAR;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={goToChildrenList} style={styles.settingsButton} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
            <MaterialCommunityIcons name="cog-outline" size={26} color={COLORS.blueLight} />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Image source={avatarSource} style={styles.avatarImage} resizeMode="cover" />
            <Text style={styles.headerName}>{child.name}</Text>
            <Text style={styles.headerTagline}>Let&apos;s get started.</Text>
          </View>
          <View style={styles.headerPlaceholder} />
        </View>
      </View>
      <View style={styles.cardContent}>
        <Image
          source={IMG_RECTANGLE}
          style={[styles.cardBg, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
          resizeMode="stretch"
        />
        <View style={styles.scrollContent}>
          <Text style={styles.sectionHeading}>Let&apos;s explore some foods together</Text>
          <Text style={styles.sectionSubheading}>Every meal is a chance to explore.</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleLogAMeal} style={styles.cardOptionWrapper}>
              <AddChildContentCard>
                <View style={styles.optionInner}>
                  <Image source={IMG_LOG_MEAL} style={styles.cardIcon} resizeMode="contain" />
                  <Text style={styles.optionText}>Log a Meal</Text>
                  <Text style={styles.optionSubtext}>When it&apos;s time to eat</Text>
                </View>
              </AddChildContentCard>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleWatchAndLearn} style={styles.cardOptionWrapper}>
              <AddChildContentCard>
                <View style={styles.optionInner}>
                  <Image source={IMG_WATCH_LEARN} style={styles.cardIcon} resizeMode="contain" />
                  <Text style={styles.optionText}>Watch and Learn</Text>
                  <Text style={styles.optionSubtext}>Learn about foods</Text>
                </View>
              </AddChildContentCard>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleTakeAQuiz} style={styles.cardOptionWrapper}>
              <AddChildContentCard>
                <View style={styles.optionInner}>
                  <Image source={IMG_TAKE_QUIZ} style={styles.cardIcon} resizeMode="contain" />
                  <Text style={styles.optionText}>Take a Quiz</Text>
                  <Text style={styles.optionSubtext}>Show what you know</Text>
                </View>
              </AddChildContentCard>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={handleViewProgress} style={styles.cardOptionWrapper}>
              <AddChildContentCard>
                <View style={styles.optionInner}>
                  <Image source={IMG_VIEW_PROGRESS} style={styles.cardIcon} resizeMode="contain" />
                  <Text style={styles.optionText}>View Progress</Text>
                  <Text style={styles.optionSubtext}>See habits over time</Text>
                </View>
              </AddChildContentCard>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueDark,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.white,
    fontSize: 16,
  },
  cardContent: {
    marginTop: 37 * scaleY,
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT - 37 * scaleY,
    backgroundColor: COLORS.white,
    position: 'relative',
    flex: 1,
    alignItems: 'center',
  },
  cardBg: {
    position: 'absolute',
    top: -32 * scaleY,
    zIndex: 0,
  },
  scrollContent: {
    flex: 1,
    zIndex: 1,
    width: '100%',
    alignItems: 'center',
  },
  sectionHeading: {
    fontFamily: 'Futura PT',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
    color: '#333',
    textAlign: 'center',
    marginTop: 24 * scaleY,
    paddingHorizontal: 24,
  },
  sectionSubheading: {
    fontFamily: 'Futura PT',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 20,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13 * scaleX,
    marginTop: 36 * scaleY,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cardOptionWrapper: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    width: 184 * scaleX,
  },
  optionInner: {
    width: '100%',
    minHeight: 110,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    gap: 6,
  },
  cardIcon: {
    width: 48,
    height: 48,
  },
  optionText: {
    fontFamily: 'Futura PT',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    color: COLORS.blueDark,
    textAlign: 'center',
  },
  optionSubtext: {
    fontFamily: 'Futura PT',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  headerContainer: {
    backgroundColor: COLORS.blueDark,
    paddingTop: 50,
    paddingBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarImage: {
    width: 95 * scaleX,
    height: 95 * scaleX,
    borderRadius: 44,
    zIndex: 1,
  },
  headerName: {
    fontFamily: 'Futura PT',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 26,
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 10,
  },
  headerTagline: {
    fontFamily: 'Futura PT',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    color: COLORS.blueLight,
    textAlign: 'center',
    marginTop: 4,
  },
  headerPlaceholder: {
    width: 44,
    height: 44,
  },
});
