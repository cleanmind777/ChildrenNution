import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import Bg1Svg from '../../../assets/pic/bg1_multiline.svg';
import PlatefulSvg from '../../../assets/pic/Pl8ful.svg';
import Img1at1onboarding from '../../../assets/pic/img1at1onboarding.svg';
import Img2at1onboarding from '../../../assets/pic/img2at1onboarding.svg';
import Img3at1onboarding from '../../../assets/pic/img3at1onboarding.svg';
import Img4at1onboarding from '../../../assets/pic/img4at1onboarding.svg';
import Img5at1onboarding from '../../../assets/pic/img5at1onboarding.svg';
import Img6at1onboarding from '../../../assets/pic/img6at1onboarding.svg';
import Img7at1onboarding from '../../../assets/pic/img7at1onboarding.svg';
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
      <View style={styles.backgroundSvgWrap}>
        <Bg1Svg
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          style={[
            styles.backgroundSvg
          ]}
          preserveAspectRatio="xMidYMid meet"
        />
      </View>
      <View style={styles.platefulSvgWrap}>
        <PlatefulSvg></PlatefulSvg>
      </View>
      <View style={styles.img1at1onboardingWrap}>
        <Img1at1onboarding></Img1at1onboarding>
      </View>
      <View style={styles.img2at1onboardingWrap}>
        <Img2at1onboarding></Img2at1onboarding>
      </View>
      <View style={styles.img3at1onboardingWrap}>
        <Img3at1onboarding width={69} height={69} />
      </View>
      <View style={styles.img4at1onboardingWrap}>
        <Img4at1onboarding></Img4at1onboarding>
      </View>
      <View style={styles.img5at1onboardingWrap}>
        <Img5at1onboarding></Img5at1onboarding>
      </View>
      <View style={styles.img6at1onboardingWrap}>
        <Img6at1onboarding></Img6at1onboarding>
      </View>
      <View style={styles.img7at1onboardingWrap}>
        <Img7at1onboarding></Img7at1onboarding>
      </View>
      {/* <View style={styles.mainBox}>
        <View style={styles.videoWrap}>
          <VideoView videoSource={ONBOARDING_VIDEO} placeholderStyle={styles.videoPlaceholder} />
        </View>
        <View style={styles.shortLine}>
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
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#faf9f7',
  },
  backgroundSvgWrap: {
    ...StyleSheet.absoluteFillObject,  // Full screen absolute
    zIndex: -10,
  },
  backgroundSvg: {
    position: 'absolute',
  },
  svgWrap: {
    zIndex: -10,
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
  mainBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortLine: {
    position: 'absolute',
    width: 30.18,
    height: 4.87,
    borderRadius: 52.57,
    opacity: 1,
    top: 555,
    left: 205.59,
    backgroundColor: '#F68B1F',
  },
  platefulSvgWrap:{
    position: 'absolute',
    top: 40,
    left: 31
  },
  img1at1onboardingWrap:{
    position: 'absolute',
    top: 40,
    right: 1
  },
  img2at1onboardingWrap:{
    position: 'absolute',
    top: 120,
    left: 183
  },
  img3at1onboardingWrap:{
    position: 'absolute',
    top: 120,
    left: 35,
  },
  img4at1onboardingWrap:{
    position: 'absolute',
    top: 250,
    left: 332
  },
  img5at1onboardingWrap:{
    position: 'absolute',
    top: 478,
    left: 108
  },
  img6at1onboardingWrap:{
    position: 'absolute',
    top: 489,
    left: 345
  },
  img7at1onboardingWrap:{
    position: 'absolute',
    bottom: 231,
  }
});
