import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ArrowRightSvg from '../../../../assets/pic/arrow_right.svg';
// import ArrowRightSvg from '../../../assets/pic/arrow_right.svg';

const COLORS = {
  blue: '#083B9A',
  orange: '#f97316',
  white: '#FFFFFF',
};

/**
 * ContinueButton - Blue primary button with "Continue" text and orange circle with arrow icon.
 */
export function ContinueButton1({ onPress, label = 'Continue', disabled, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.button, disabled && styles.buttonDisabled, style]}
    >
      <Text style={styles.label}>{label}</Text>
      <View style={styles.iconWrap}>
        <ArrowRightSvg name="arrow-right" size={20} color={COLORS.blue} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 16,
    paddingHorizontal: 34,
    borderRadius:45,
    gap: 10,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  label: {
    color: COLORS.blue,
    fontSize: 18,
    fontWeight: '700',
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
