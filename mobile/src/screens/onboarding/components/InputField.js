import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const DEFAULT_COLORS = {
  icon: '#FFFFFF',
  background: '#567CD3',
  outline: '#8CA9F3',
  text: '#FFFFFF',
  placeholder: '#9CA3AF',
};

const DEFAULT_FONT_SIZE = 18.68;
const DEFAULT_HEIGHT = 54;
const DEFAULT_FONT_FAMILY = 'Futura PT';

/**
 * InputField - Reusable text input with label and optional right icon (e.g. eye for password).
 * Supports fontSize, height, and fontFamily. No border (outline removed).
 */
export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  rightIcon,
  onRightPress,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  editable = true,
  fontSize = DEFAULT_FONT_SIZE,
  height = DEFAULT_HEIGHT,
  fontFamily = DEFAULT_FONT_FAMILY,
  style,
  colors = {},
  ...rest
}) {
  const themeColors = { ...DEFAULT_COLORS, ...colors };

  const right = rightIcon ? (
    <TextInput.Icon
      icon={rightIcon}
      onPress={onRightPress}
      color={themeColors.icon}
    />
  ) : undefined;

  return (
    <View style={[styles.wrap, style]}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? label}
        placeholderTextColor={themeColors.placeholder}
        mode="outlined"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        editable={editable}
        right={right}
        dense
        style={[styles.input, { backgroundColor: themeColors.background, fontSize, fontFamily, height, paddingVertical: 0, paddingTop: 0, paddingBottom: 0 }]}
        outlineStyle={styles.noBorder}
        contentStyle={[styles.content, { minHeight: height, height, justifyContent: 'center', paddingVertical: 0, paddingTop: 0, paddingBottom: 0 }]}
        theme={{
          colors: {
            background: themeColors.background,
            outline: 'transparent',
            onSurface: themeColors.text,
          },
        }}
        {...rest}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: 14,
  },
  input: {
    justifyContent: 'center',
  },
  noBorder: {
    borderWidth: 0,
    borderRadius: 10,
  },
  content: {},
});
