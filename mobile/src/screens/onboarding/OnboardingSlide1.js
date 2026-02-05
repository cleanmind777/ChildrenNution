import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import Bg1Svg from '../../../assets/pic/bg1.svg';
import { ContinueButton, VideoView } from './components';

const DESIGN_WIDTH = 441;
const DESIGN_HEIGHT = 956;

const ONBOARDING_VIDEO = require('../../../assets/onboard.mp4');

/**
 * First onboarding page: bg1.svg background with video and Continue button.
 * Layout scales from design size 441×956 for various screen sizes.
 */
export default function OnboardingSlide1({ onContinue }) {
  const { width: screenWidth, height: screenHeight } = useWindowDimensions();
  const scaleW = screenWidth / DESIGN_WIDTH;
  const scaleH = screenHeight / DESIGN_HEIGHT;
  const styles = createStyles(screenWidth, screenHeight, scaleW, scaleH);

  return (
    <View style={styles.container}>
      <View style={styles.svgWrap}>
        <Bg1Svg
          width={screenWidth}
          height={screenHeight}
          preserveAspectRatio="xMidYMid meet"
        />
      </View>
      <View style={styles.videoWrap}>
        <VideoView videoSource={ONBOARDING_VIDEO} placeholderStyle={styles.videoPlaceholder} />
      </View>
      <View style={styles.continueWrap}>
        <ContinueButton
          onPress={onContinue}
          label="Continue"
          style={styles.continueButton}
        />
      </View>
    </View>
  );
}

function createStyles(screenWidth, screenHeight, scaleW, scaleH) {
  const r = (v, useH = false) => Math.round((useH ? scaleH : scaleW) * v);

  return StyleSheet.create({
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
      left: r(44),
      top: r(266, true),
    },
    videoPlaceholder: {
      width: Math.min(r(359), screenWidth - r(44) * 2),
      height: r(196, true),
      borderRadius: r(10),
      opacity: 1,
    },
    continueWrap: {
      position: 'absolute',
      left: r(124),
      top: r(619, true),
      paddingHorizontal: 0,
      paddingBottom: 0,
      paddingTop: 0,
    },
    continueButton: {
      width: r(193.74),
      height: r(57.44, true),
      opacity: 1,
    },
  });
}
