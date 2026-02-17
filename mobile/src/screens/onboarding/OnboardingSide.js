import React from "react";
import { View, StyleSheet, Dimensions, Image } from "react-native";
import { Text } from "react-native-paper";
import Bg1Svg from "../../../assets/pic/Onbording/multicircles.svg";
import Bg2Svg from "../../../assets/pic/Onbording/rectangle.svg";
import { ContinueButton1 } from "./components/ContinueButton1";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;

const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;
const scaleFont = Math.min(scaleX, scaleY);

// FIXED bottomView aspect ratio (383:295)
const BOTTOM_WIDTH = 383 * scaleX;
const BOTTOM_HEIGHT = BOTTOM_WIDTH * (295 / 383); // Maintains exact ratio

const defaultImage = require("../../../assets/pic/Onbording/slide/img_slide2.png");
const defaultTitle = "Guidance when it matters most";
const defaultDescription = "Plateful works alongside your child during meals — offering gentle reminders, encouragement, and praise that support healthier choices in real time.";

export default function OnboardingSlide({ onContinue, imageSource = defaultImage, title = defaultTitle, description = defaultDescription }) {
  return (
    <View style={styles.container}>
      {/* Responsive background SVG */}
      <View style={styles.backgroundSvgWrap}>
        <Bg1Svg
          width={685 * scaleX}
          height={685 * scaleY}
          style={[
            styles.backgroundSvg,
            { top: -38 * scaleY, left: -115 * scaleX },
          ]}
        />
      </View>

      <View style={styles.contentWrap}>
        <View style={[styles.contentView, { 
          width: 424 * scaleX, 
          height: 501 * scaleY, 
          marginTop: 46 * scaleY 
        }]}>
          <Image 
            source={imageSource}
            style={styles.slideImage}
            resizeMode="contain" 
          />
        </View>
        
        <View style={[styles.bottomView, { 
          width: BOTTOM_WIDTH,
          height: BOTTOM_HEIGHT,
          marginHorizontal: 28 * scaleX, 
          marginBottom: 78 * scaleY 
        }]}>
          <View style={styles.bottomBackground}>
            <Bg2Svg width="100%" height="100%" />
          </View>
          
          <View style={[styles.bottomContent, { 
            paddingHorizontal: 20 * scaleX, 
            paddingTop: 43 * scaleY, 
            paddingBottom: 78 * scaleY 
          }]}>
            <Text style={[styles.title, { 
              fontSize: 36 * scaleFont, 
              lineHeight: 42 * scaleFont 
            }]}>
              {title}
            </Text>
            <Text style={[styles.description, { fontSize: 15 * scaleFont }]}>
              {description}
            </Text>
          </View>
          
          <View style={{
            position: "absolute",
            bottom: -10 * scaleY,
            width: "100%",
            alignItems: "center",
          }}>
            <ContinueButton1 onPress={onContinue} label="Continue" />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#083B9A",
  },
  backgroundSvgWrap: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
    overflow: "hidden",
  },
  backgroundSvg: {
    position: "absolute",
  },
  contentWrap: {
    flex: 1,
  },
  contentView: {
    flex: 1,
    alignItems: "center",
  },
  slideImage: {
    width: "100%",
    height: "100%",
  },
  bottomBackground: {
    zIndex: 0,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  bottomView: {
    position: "relative",
  },
  bottomContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontWeight: 500,
    textAlign: "center",
    color: "#FFFFFF",
  },
  description: {
    fontWeight: 400,
    textAlign: "center",
    color: "#FFFFFF",
  },
});
