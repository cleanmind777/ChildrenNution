import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const COLORS = {
  orange: '#f97316',
  white: '#fff',
};

/**
 * InfoBox - Orange rounded box with white descriptive text.
 */
export function InfoBox({ text, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.orange,
    paddingVertical: 28,
    paddingHorizontal: 22,
    borderRadius: 12,
  },
  text: {
    color: COLORS.white,
    fontWeight: 450,
    fontStyle: 'medium',
    fontSize: 19,
    lineHeight: '100%',
    textAlign: 'center',
  },
});
