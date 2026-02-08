import React from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Bg1Svg from '../../../assets/pic/bg1_multiline.svg';
import PlatefulSvg from '../../../assets/pic/Pl8ful.svg';
import ImgCup from '../../../assets/pic/Onbording/page1/img_cup.svg';
import { Text } from 'react-native-paper';
import { VideoView } from './components/VideoView';
import { InfoBox } from './components/InfoBox';
import { ContinueButton } from './components/ContinueButton';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;

const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;

export default function OnboardingSlide1({ onContinue }) {
  return (
    <View style={styles.container}>
      {/* Background & Images - ALREADY RESPONSIVE */}
      <View style={styles.backgroundSvgWrap}>
        <Bg1Svg width={619 * scaleX} height={554 * scaleY} 
          style={[styles.backgroundSvg, { top: -90 * scaleY, left: -60 * scaleX }]} />
      </View>
      <View style={styles.backpicSvgWrap}>
        <PlatefulSvg width={89 * scaleX} height={31 * scaleY} 
          style={[styles.backgroundSvg, { top: 40 * scaleY, left: 31 * scaleX }]} />
        <ImgCup width={80 * scaleX} height={72 * scaleY} 
          style={[styles.backgroundSvg, { top: 40 * scaleY, left: 332 * scaleX }]} />
        
        {/* PNG Images - ALREADY RESPONSIVE */}
        <Image source={require('../../../assets/pic/Onbording/page1/book.png')}
          style={{ width: 69 * scaleX, height: 69 * scaleY, position: 'absolute', top: 162 * scaleY, left: 35 * scaleX }}
          resizeMode="contain" />
        <Image source={require('../../../assets/pic/Onbording/page1/circle.png')}
          style={{ width: 51 * scaleX, height: 51 * scaleY, position: 'absolute', top: 215 * scaleY, left: 385 * scaleX }}
          resizeMode="contain" />
        <Image source={require('../../../assets/pic/Onbording/page1/heart.png')}
          style={{ width: 90 * scaleX, height: 89 * scaleY, position: 'absolute', top: 120 * scaleY, left: 183 * scaleX }}
          resizeMode="contain" />
        <Image source={require('../../../assets/pic/Onbording/page1/rocket.png')}
          style={{ width: 54 * scaleX, height: 60 * scaleY, position: 'absolute', top: 664 * scaleY, left: 0 }}
          resizeMode="contain" />
        <Image source={require('../../../assets/pic/Onbording/page1/line.png')}
          style={{ width: 55 * scaleX, height: 74 * scaleY, position: 'absolute', top: 478 * scaleY, left: 108 * scaleX }}
          resizeMode="contain" />
        <Image source={require('../../../assets/pic/Onbording/page1/sun.png')}
          style={{ width: 50 * scaleX, height: 50 * scaleY, position: 'absolute', top: 489 * scaleY, left: 345 * scaleX }}
          resizeMode="contain" />
      </View>

      {/* CONTENT - NOW RESPONSIVE */}
      <View style={[styles.contentWrap, { marginTop: 266 * scaleY, paddingHorizontal: 38 * scaleX }]}>
        <View style={[styles.videoContainer, { width: 359 * scaleX, height: 196 * scaleY }]}>
          <VideoView
            videoSource={require('../../../assets/pic/Onbording/page1/onboard.mp4')}
            placeholderStyle={styles.placeholderStyle}
          />
        </View>
        
        <View style={[styles.textContainer, { marginTop: 93 * scaleY, marginBottom: 20 * scaleY }]}>
          <View style={[styles.squre, { width: 30 * scaleX, height: 5 * scaleY }]} />
          <Text style={[styles.description, { 
            fontSize: 16 * Math.min(scaleX, scaleY), 
            marginTop: 14 * scaleY,
            lineHeight: 41 * Math.min(scaleX, scaleY) 
          }]}>
            Helping little eaters explore food
          </Text>
        </View>

        <ContinueButton
          onPress={onContinue}
          label="Continue"
          style={[styles.continueButton, { marginHorizontal: 9 * scaleX }]}
        />

        <InfoBox
          text="If mealtimes feel stressful, you're not alone. Plateful helps turn everyday meals into calm, playful moments that encourage balanced eating — without pressure or bribing."
          style={[styles.infoBox, { marginTop: 44 * scaleY, marginHorizontal: 9 * scaleX }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#faf9f7',
    flex: 1,
  },
  backgroundSvgWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -10,
  },
  backpicSvgWrap: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'visible',
    zIndex: -5,
  },
  backgroundSvg: {
    position: 'absolute',
  },
  contentWrap: {
    flex: 1,
    alignItems: 'center',
  },
  placeholderStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: '#D9D9D9',
  },
  videoContainer: {},
  textContainer: {
    alignItems: 'center',
  },
  squre: {
    borderRadius: 50,
    backgroundColor: '#F68B1F',
  },
  description: {
    fontWeight: '400',
    color: '#000000',
    textAlign: 'center',
  },
  infoBox: {},
  continueButton: {},
});
