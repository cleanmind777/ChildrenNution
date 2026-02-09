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
import OnboardingSlide from './OnboardingSide';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Content for slides 1–3: same format (image + bottom card with title/description), different content
const CONTENT_SLIDES = [
  {
    imageSource: require('../../../assets/pic/Onbording/slide/img_slide1.png'),
    title: 'Guidance when it matters most',
    description: 'Plateful works alongside your child during meals — offering gentle reminders, encouragement, and praise that support healthier choices in real time.',
  },
  {
    imageSource: require('../../../assets/pic/Onbording/slide/img_slide2.png'),
    title: 'Small wins. Real progress.',
    description: 'With gentle guidance and encouragement, kids build confidence around food — and healthy habits grow over time.',
  },
  {
    imageSource: require('../../../assets/pic/Onbording/slide/img_slide3.png'),
    title: 'More than an app.',
    description: 'Plateful combines short learning modules before meals with a smart plate that supports kids during meals — together building healthy eating habits.',
  },
  {
    imageSource: require('../../../assets/pic/Onbording/slide/img_slide4.png'),
    title: 'Built for growing kids',
    description: 'Designed for young children, Plateful meets kids where they are — encouraging exploration, balance, and confidence around food from an early age.',
  },
  {
    imageSource: require('../../../assets/pic/Onbording/slide/img_slide5.png'),
    title: 'Lorem ipsum doller',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,',
  },
];


const TOTAL_SLIDES = 1 + CONTENT_SLIDES.length ; // slide0 + content slides + icon slides

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef(null);
  const { completeOnboarding } = useAuth();

  const onScroll = (e) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SCREEN_WIDTH);
    if (index !== currentIndex && index >= 0 && index < TOTAL_SLIDES) {
      setCurrentIndex(index);
    }
  };

  const goNext = () => {
    if (currentIndex < TOTAL_SLIDES - 1) {
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

  const isLast = currentIndex === TOTAL_SLIDES - 1;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>

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
        {CONTENT_SLIDES.map((content, idx) => (
          <View key={idx + 1} style={[styles.slide, styles.slide1, { width: SCREEN_WIDTH }]}>
            <OnboardingSlide
              onContinue={goNext}
              imageSource={content.imageSource}
              title={content.title}
              description={content.description}
            />
          </View>
        ))}
     
      </ScrollView>

      
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
 
});
