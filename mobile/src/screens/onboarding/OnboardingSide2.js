import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import PicSvg from "../../../assets/pic/onb1_pic.svg";
import Bg1Svg from "../../../assets/pic/onb1_multicircles.svg";
import Bg2Svg from "../../../assets/pic/onb1_rectangle.svg";
import { ContinueButton } from "./components";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Responsive offsets based on screen size (proportional to 440x956 base)
// const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();
  
  const SVG_TOP_OFFSET = -38 * (SCREEN_HEIGHT / 956);
  const SVG_LEFT_OFFSET = -115 * (SCREEN_WIDTH / 440);
  const SVG_SIZE = 685 * (SCREEN_WIDTH / 440) ;
  
export default function OnboardingSlide2({ onContinue }) {
  return (
    <View style={styles.container}>
      {/* Responsive background SVG */}
      <View style={styles.backgroundSvgWrap}>
        <Bg1Svg
          width={SVG_SIZE}
          height={SVG_SIZE}
          style={[
            styles.backgroundSvg,
            { top: SVG_TOP_OFFSET, left: SVG_LEFT_OFFSET }
          ]}
        />
      </View>
      
      {/* Foreground content */}
      <View style={styles.contentWrap}>
        <PicSvg width="100%" height="100%" />
        <View style={styles.bottomView}>
            <View style={styles.bottomBackground}>
                <Bg2Svg width="100%" height="100%"  />
           </View>
            <View style={styles.bottomContent}>
                <Text style={styles.title}>Guidance when it matters most</Text>
                <Text style={styles.description}>   Plateful works alongside your child during meals — offering gentle reminders, encouragement, and praise that support healthier choices in real time.</Text> 
                
            </View>
            <View style={{ position: 'absolute', bottom: -5, width: '100%', alignItems: 'center' }}>
                    <ContinueButton onPress={onContinue} label="Continue" />
                </View>
        </View>

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#083B9A',
  },
  backgroundSvgWrap: {
    ...StyleSheet.absoluteFillObject,  // Full screen absolute
    zIndex: -10,
  },
  backgroundSvg: {
    position: 'absolute',
  },
  bottomBackground:{
    zIndex: -5,
  },
  bottomView:{
    marginLeft: 28,
    marginRight: 28,
    marginBottom: 78,
  },
  bottomContent:{
    position: 'absolute',
    top: 43,
    left: 0,
  },
  title:{
    fontSize: 36,
    fontWeight: 500,
    paddingLeft: 20,
    textAlign: 'center',
    paddingRight: 20,
    color: '#FFFFFF',
    lineHeight: 42,
},
    
  description:{
    fontSize: 15,
    marginTop: 15,
    fontWeight: 400,
    paddingLeft: 20,
    textAlign: 'center',
    paddingRight: 20,
    color: '#FFFFFF',
},

  contentWrap: {
    flex: 1,
  },
});