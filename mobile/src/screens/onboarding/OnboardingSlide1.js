import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Bg1Svg from '../../../assets/pic/bg1.svg';
import { ContinueButton, VideoView } from './components';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const ONBOARDING_VIDEO = require('../../../assets/onboard.mp4');

const TEXT_BETWEEN_VIDEO_AND_CONTINUE = 'Helping little eaters explore food';

const INFO_TEXT =
  "If mealtimes feel stressful, you're not alone. Plateful helps turn everyday meals into calm, playful moments that encourage balanced eating — without pressure or bribing.";

/**
 * First onboarding page: uses only bg1.svg as the visual, with a Continue button and info box.
 */
export default function OnboardingSlide1({ onContinue }) {
  return (
    <View style={styles.container}>
      <View style={styles.svgWrap}>
        <Bg1Svg
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          preserveAspectRatio="xMidYMid meet"
        />
      </View>
      <View style={styles.videoWrap}>
        <VideoView videoSource={ONBOARDING_VIDEO} placeholderStyle={styles.videoPlaceholder} />
      </View>
      <View style={styles.textBetweenWrap}>
        <Text style={styles.textBetween}>{TEXT_BETWEEN_VIDEO_AND_CONTINUE}</Text>
      </View>
      <View style={styles.continueWrap}>
        <ContinueButton
          onPress={onContinue}
          label="Continue"
          style={styles.continueButton}
        />
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.infoText}>{INFO_TEXT}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf9f7',
  },
  svgWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoWrap: {
    position: 'absolute',
    left: 44,
    top: 266,
  },
  videoPlaceholder: {
    width: 359,
    height: 196,
    borderRadius: 10,
    opacity: 1,
  },
  textBetweenWrap: {
    position: 'absolute',
    left: 44,
    right: 44,
    top: 478,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textBetween: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  continueWrap: {
    position: 'absolute',
    left: 124,
    top: 619,
    paddingHorizontal: 0,
    paddingBottom: 0,
    paddingTop: 0,
  },
  continueButton: {
    width: 193.739013671875,
    height: 57.44021224975586,
    opacity: 1,
  },
  infoBox: {
    position: 'absolute',
    left: 47,
    top: 721,
    width: 347,
    height: 170,
    borderRadius: 11.68,
    opacity: 1,
    backgroundColor: '#FF9F3F',
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
});
