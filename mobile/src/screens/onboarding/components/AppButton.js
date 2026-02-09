import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const VARIANTS = {
  primary: {
    backgroundColor: '#F68B1F',
    fontColor: '#FFFFFF',
    fontSize: 16,
    radius: 14,
    fontFamily: undefined,
    fontStyle: 'normal',
  },
  secondary: {
    backgroundColor: 'transparent',
    fontColor: '#083B9A',
    fontSize: 16,
    radius: 14,
    fontFamily: undefined,
    fontStyle: 'normal',
  },
};

/**
 * AppButton - General purpose button (e.g. Sign In, Sign Up, Continue).
 * Supports loading state and optional style overrides.
 *
 * Parameters: backgroundColor, fontColor, fontSize, radius, fontFamily, fontStyle
 */
export function AppButton({
  label,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  backgroundColor,
  fontColor,
  fontSize,
  radius,
  fontFamily,
  fontStyle,
  style,
  contentStyle,
  labelStyle,
  ...rest
}) {
  const base = VARIANTS[variant] || VARIANTS.primary;

  const bg = backgroundColor ?? base.backgroundColor;
  const fg = fontColor ?? base.fontColor;
  const fSize = fontSize ?? base.fontSize;
  const r = radius ?? base.radius;
  const fFamily = fontFamily ?? base.fontFamily;
  const fStyle = fontStyle ?? base.fontStyle;

  const labelStyleMerged = [
    styles.label,
    { color: fg, fontSize: fSize, fontStyle: fStyle },
    fFamily != null && { fontFamily: fFamily },
    labelStyle,
  ].filter(Boolean);

  return (
    <Button
      mode="contained"
      onPress={onPress}
      loading={loading}
      disabled={disabled}
      style={[styles.button, { backgroundColor: bg, borderRadius: r }, style]}
      contentStyle={[styles.content, contentStyle]}
      labelStyle={labelStyleMerged}
      {...rest}
    >
      {label}
    </Button>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingBottom: 0,
  },
  content: {
    paddingVertical: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  label: {},
});
