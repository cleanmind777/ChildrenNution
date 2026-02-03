import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const COLORS = {
  blue: '#2563eb',
  orange: '#f97316',
  white: '#fff',
};

/**
 * ContinueButton - Blue primary button with "Continue" text and orange circle with arrow icon.
 */
export function ContinueButton({ onPress, label = 'Continue', disabled, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.buttonDisabled, style]}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons name="arrow-right" size={20} color={COLORS.white} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.blue,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    gap: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.orange,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
