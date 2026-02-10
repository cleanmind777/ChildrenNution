import React from 'react';
import { TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Gradient: 279.92deg, #0446C2 7.96%, #3F66C6 89.7%
const GRADIENT_COLORS = ['#0446C2', '#3F66C6'];
const GRADIENT_START = { x: 1, y: 1 };
const GRADIENT_END = { x: 0, y: 0 };
const GRADIENT_LOCATIONS = [0.0796, 0.897];

// Shadow: 0px 4px 12.8px 0px #1049BA3D (3D = 24% opacity)
const SHADOW = Platform.select({
  ios: {
    shadowColor: '#1049BA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.24,
    shadowRadius: 12.8,
  },
  android: {
    elevation: 4,
  },
});

/**
 * BlueContinue - Button with blue linear gradient and shadow.
 * background: linear-gradient(279.92deg, #0446C2 7.96%, #3F66C6 89.7%);
 * box-shadow: 0px 4px 12.8px 0px #1049BA3D;
 */
export function BlueContinue({
  label = 'Continue',
  onPress,
  disabled = false,
  fontFamily = 'Futura PT',
  fontSize = 21.68,
  width,
  height,
  borderRadius = 15,
  style,
  labelStyle,
}) {
  const sizeStyle = width != null || height != null
    ? { width, height }
    : null;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.85}
      style={[styles.touchable, sizeStyle, style]}
    >
      <LinearGradient
        colors={GRADIENT_COLORS}
        start={GRADIENT_START}
        end={GRADIENT_END}
        locations={GRADIENT_LOCATIONS}
        style={[styles.gradient, { borderRadius }, SHADOW]}
      >
        <Text style={[styles.label, { fontFamily, fontSize }, labelStyle]}>
          {label}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    alignSelf: 'stretch',
  },
  gradient: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
