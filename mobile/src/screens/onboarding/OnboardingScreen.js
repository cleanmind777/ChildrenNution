import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import OnboardingSlide1 from './OnboardingSlide1';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SLIDES = [
  null, // first slide is custom OnboardingSlide1
  {
    icon: 'food-apple',
    title: 'Log Meals Easily',
    description: 'Snap a photo or pick from categories. We help you record breakfast, lunch, dinner, and snacks.',
  },
  {
    icon: 'account-multiple',
    title: 'Profiles for Each Child',
    description: 'Add your children with ages and preferences. We personalize tips and nutrition for each one.',
  },
  {
    icon: 'chart-box',
    title: 'Nutrition at a Glance',
    description: 'See simple nutrition insights and food categories so you can balance meals over time.',
  },
  {
    icon: 'gamepad-variant',
    title: 'Quizzes & Videos',
    description: 'Kids learn about food through fun activities and earn coins for completing them.',
  },
  {
    icon: 'cash',
    title: 'Coins & Rewards',
    description: 'Children earn coins for meals and activities. Use them to motivate healthy habits.',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const { completeOnboarding } = useAuth();

  const onScroll = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < SLIDES.length) {
      setCurrentIndex(index);
    }
  };

  const goNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      scrollRef.current?.scrollTo({
        x: (currentIndex + 1) * SCREEN_WIDTH,
        animated: true,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      completeOnboarding();
    }
  };

  const skip = () => {
    completeOnboarding();
  };

  const isLast = currentIndex === SLIDES.length - 1; // 6 slides total (index 0..5)

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {currentIndex !== 0 && (
        <View style={styles.skipRow}>
          <Button mode="text" onPress={skip} compact textColor="#666">
            Skip
          </Button>
        </View>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        <View key={0} style={[styles.slide, styles.slide1, { width: SCREEN_WIDTH }]}>
          <OnboardingSlide1 onContinue={goNext} />
        </View>
        {SLIDES.slice(1).map((slide, idx) => {
          const index = idx + 1;
          if (!slide) return null;
          return (
            <View key={index} style={[styles.slide, { width: SCREEN_WIDTH }]}>
              <View style={styles.iconWrap}>
                <MaterialCommunityIcons
                  name={slide.icon}
                  size={72}
                  color="#6200ee"
                />
              </View>
              <Text variant="headlineSmall" style={styles.title}>
                {slide.title}
              </Text>
              <Text variant="bodyLarge" style={styles.description}>
                {slide.description}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {currentIndex !== 0 && (
        <View style={styles.footer}>
          <Button
            mode="contained"
            onPress={goNext}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {isLast ? 'Get Started' : 'Next'}
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  skipRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  slide: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide1: {
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingHorizontal: 0,
  },
  iconWrap: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0e6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingVertical: 6,
  },
});
