import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

/**
 * Icon fallbacks for onboarding images (img1at1onboarding .. img7at1onboarding).
 * To use actual SVG assets, add react-native-svg, react-native-svg-transformer,
 * and metro.config.js (see project root), then import SVGs as components here.
 */
const ICON_FALLBACKS = {
  img1at1onboarding: { name: 'circle-small', color: '#f97316', size: 24 },
  img2at1onboarding: { name: 'book-open-outline', color: '#f97316', size: 28 },
  img3at1onboarding: { name: 'heart', color: '#2563eb', size: 28 },
  img4at1onboarding: { name: 'ribbon', color: '#2563eb', size: 28 },
  img5at1onboarding: { name: 'magnify', color: '#f97316', size: 28 },
  img6at1onboarding: { name: 'format-horizontal-align-center', color: '#f97316', size: 24 },
  img7at1onboarding: { name: 'rocket-launch-outline', color: '#2563eb', size: 28 },
};

/**
 * Renders an onboarding image by key (e.g. img1at1onboarding).
 * Uses icon fallback; replace with SVG component when using react-native-svg-transformer.
 */
export function OnboardingIcon({ name, size = 40, style }) {
  const fallback = ICON_FALLBACKS[name];
  const iconSize = size || (fallback?.size ?? 40);

  if (fallback) {
    return (
      <View style={[{ width: iconSize, height: iconSize }, style]}>
        <MaterialCommunityIcons
          name={fallback.name}
          size={iconSize}
          color={fallback.color}
        />
      </View>
    );
  }
  return null;
}
