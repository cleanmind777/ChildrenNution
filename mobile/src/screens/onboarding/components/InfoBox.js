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
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  text: {
    color: COLORS.white,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'left',
  },
});
