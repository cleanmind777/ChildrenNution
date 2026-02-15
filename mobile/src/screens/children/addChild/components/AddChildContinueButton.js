import React from "react";
import { TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContinueButtonChild from "../../../../../assets/pic/addChild/continue.png";

const COLORS = {
  blue: "#083B9A",
  white: "#FFFFFF",
};

/**
 * Continue button for Add Child flow: label + arrow icon.
 * Use addChild/continue.png when the asset is added; until then uses arrow icon.
 */
export function AddChildContinueButton({
  onPress,
  label = "Continue",
  disabled,
  style,
}) {
  return (
    <View style={styles.continueButtonWrapper}>
      <Image
        source={ContinueButtonChild}
        style={styles.continueButtonChild}
        pointerEvents="none"
      />
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        activeOpacity={1}
        style={[styles.button, disabled && styles.buttonDisabled, style]}
      >
        <Text style={styles.label}>{label} →</Text>
        {/* <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="arrow-right" size={22} color={COLORS.blue} />
      </View> */}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
    paddingVertical: 16,
    paddingHorizontal: 34,
    borderRadius: 45,
    width: 345,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.blue,
  },
  continueButtonChild: {
    zIndex: 11,
    bottom: 25,
    width: 143,
    height: 165,
  },
  continueButtonWrapper:{
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
});
