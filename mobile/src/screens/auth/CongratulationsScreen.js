import React from "react";
import { View, StyleSheet, Image, ScrollView, Dimensions } from "react-native";
import { Text } from "react-native-paper";
import { BlueContinue } from "../onboarding/components";
import { useAuth } from "../../context/AuthContext";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;
const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;

// Card size for design 440×956 (same as LoginScreen)
const CARD_WIDTH = 475 * scaleX;
const CARD_HEIGHT = 606 * scaleY;
const CARD_LEFT = -18 * scaleX;
const CARD_BOTTOM = -24 * scaleY;
// const CARD_MARGIN_H = ((DESIGN_WIDTH - 407) / 2) * scaleX;
const CARD_MARGIN_H = 0;

// LOGO background positioning for design 440×956
const LOGO_WIDTH = 205 * scaleX;
const LOGO_HEIGHT = 205 * scaleX;
const LOGO_TOP = 52 * scaleY;

const CONGRATULATIONS_WIDTH = SCREEN_WIDTH;
const CONGRATULATIONS_HEIGHT = 278 * scaleX;

// BlueContinue button size for design 440×956
const BLUE_CONTINUE_WIDTH = 368 * scaleX;
const BLUE_CONTINUE_HEIGHT = 67 * scaleY;

const COLORS = {
  blueDark: "#083B9A",
  blueLight: "#8CA9F3",
  dot: "#F68B1F",
  orange: "#F68B1F",
  white: "#FFFFFF",
  textLight: "#E8EEFC",
  textDark: "#3B3B3B",
};

// Assets from /assets/pic/auth/login (same as LoginScreen)

const IMG_RECTANGLE = require("../../../assets/pic/auth/congratulations/rectangle.png");
const IMG_LOGO = require("../../../assets/pic/auth/congratulations/logo.png");
const IMG_CONGRATULATIONS = require("../../../assets/pic/auth/congratulations/congratulations.png");

export default function CongratulationsScreen() {
  const { setJustSignedUp } = useAuth();

  const handleContinue = () => {
    setJustSignedUp(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top section: blue background + circles + character (same as LoginScreen) */}
        <View style={styles.headerSection}>
          <Image source={IMG_LOGO} style={styles.logo} resizeMode="cover" />
          <View style={styles.welcomeWrap}>
            <Text style={styles.welcome}>Welcome to </Text>
            <Text style={styles.welcomePlateful}>Plateful</Text>
            <Text style={styles.welcomeDot}>.</Text>
          </View>
        </View>

        {/* Card: same layout as CongratulationsScreen */}
        <View
          style={[
            styles.cardWrap,
            {
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              left: CARD_LEFT,
              bottom: CARD_BOTTOM,
              marginHorizontal: CARD_MARGIN_H,
            },
          ]}
        >
          <Image
            source={IMG_RECTANGLE}
            style={[styles.cardBg, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
            resizeMode="stretch"
          />
          <View style={styles.cardContent}>
            <Image
              source={IMG_CONGRATULATIONS}
              style={styles.congratulationsImage}
              resizeMode="cover"
            />
            <Text style={styles.subtitle}>
              You’re all set. Let’s get started.
            </Text>

            <BlueContinue
              label="Continue"
              fontFamily="Futura PT"
              fontSize={21.68}
              width={BLUE_CONTINUE_WIDTH}
              height={BLUE_CONTINUE_HEIGHT}
              marginBottom={150 * scaleY}
              borderRadius={15}
              onPress={handleContinue}
              style={styles.blueContinueButton}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueDark,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerSection: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
  },
  logo: {
    // position: "absolute",
    marginTop: LOGO_TOP,
    // top: LOGO_TOP,
    // left: LOGO_LEFT,
    width: LOGO_WIDTH,
    height: LOGO_HEIGHT,
  },
  cardWrap: {
    marginTop: 8,
    position: "absolute",
    bottom: 0,
  },
  cardBg: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    borderRadius: 24,
  },
  cardContent: {
    paddingHorizontal: 24,
    paddingTop: 52 * scaleY,
    paddingBottom: 73 * scaleY,
    borderRadius: 24,
    height: CARD_HEIGHT,
    gap: 0,
  },
  congratulationsImage: {
    width: CONGRATULATIONS_WIDTH,
    height: CONGRATULATIONS_HEIGHT,
    alignSelf: "center",
  },
  subtitle: {
    fontFamily: "Futura PT",
    fontWeight: "450",
    fontSize: 18.68,
    lineHeight: 18.68,
    letterSpacing: 0,
    textAlign: "center",
    color: COLORS.textDark,
    marginBottom: 120 * scaleY,
  },
  blueContinueButton: {
    alignSelf: "center",
  },
  welcomeWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 26 * scaleY,
    marginBottom: 23 * scaleY,
    gap: 4 * scaleX,
  },
  welcome: {
    fontFamily: "Futura PT",
    fontSize: 28.68,
    color: COLORS.textLight,
  },
  welcomePlateful: {
    fontFamily: "Futura",
    fontWeight: "700",
    fontSize: 33.91,
    lineHeight: 33.91,
    letterSpacing: 0,
    color: COLORS.textLight,
  },
  welcomeDot: {
    fontFamily: "Futura",
    fontWeight: "700",
    fontSize: 33.91,
    lineHeight: 33.91,
    letterSpacing: 0,
    color: COLORS.dot,
  },
});
