import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;
const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;

const COLORS = {
  white: "#FFFFFF",
};

/**
 * Wraps content in the Add Child flow card: gradient background + white rounded card.
 * Use as: <AddChildContentCard>{/* your content *\/}</AddChildContentCard>
 */
export default function AddChildContentCard({ children }) {
  return (
    <View style={styles.inputCardWrapper}>
      <LinearGradient
        colors={["rgba(69, 131, 241, 0.6)", "rgba(255, 85, 91, 0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.cardContentInner}
      />
      <View style={styles.inputCard}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputCardWrapper: {
    // marginTop: 37 * scaleY,
    position: "relative",
  },
  cardContentInner: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 10,
    zIndex: 0,
    filter: "blur(18px)",
  },
  inputCard: {
    // width: 378 * scaleX,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
});
