import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;
const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;

const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = 499;

const COLORS = {
  blueDark: '#083B9A',
  blueLight: '#8CA9F3',
  white: '#FFFFFF',
  textDark: '#333333',
  textMuted: '#6A6A6A',
};

const IMG_RECTANGLE = require('../../../assets/pic/logMeal/rectangle.png');
const IMG_LOG_MEAL = require('../../../assets/pic/logMeal/logMeal.png');
const IMG_CHARACTER = require('../../../assets/pic/logMeal/character.png');
const IMG_BREAKFAST = require('../../../assets/pic/logMeal/breakfast.png');
const IMG_LUNCH = require('../../../assets/pic/logMeal/lunch.png');
const IMG_DINNER = require('../../../assets/pic/logMeal/dinner.png');
const IMG_SNACK = require('../../../assets/pic/logMeal/snack.png');
const IMG_PROTEIN_TOTAL = require('../../../assets/pic/logMeal/proteinTotal.png');
const IMG_VEGETABLE_TOTAL = require('../../../assets/pic/logMeal/vegetableTotal.png');

const MEAL_OPTIONS = [
  { type: 'breakfast', label: 'Breakfast', image: IMG_BREAKFAST },
  { type: 'lunch', label: 'Lunch', image: IMG_LUNCH },
  { type: 'dinner', label: 'Dinner', image: IMG_DINNER },
  { type: 'snack', label: 'Snack', image: IMG_SNACK },
];

export default function MealSelectionScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { child } = route.params || {};

  const handleSelectMeal = (mealType) => {
    if (child) navigation.navigate('Activity', { child, mealType });
  };

  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextWrap}>
        <TouchableOpacity onPress={goBack} style={styles.backButton} activeOpacity={0.8}>
          <MaterialCommunityIcons name="chevron-left" size={28} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.headerTextContent}>
          <Text style={styles.headerTitle}>What are we eating?</Text>
          <View style={styles.subtitleRow}>
            <Image source={IMG_LOG_MEAL} style={styles.logMealIcon} resizeMode="contain" />
            <Text style={styles.headerSubtitle1}>Let&apos;s Log your Meal.</Text>
          </View>
          <Text style={styles.headerSubtitle2}>Choose which meal you&apos;d like to track today</Text>
        </View>
        </View>
        <Image source={IMG_CHARACTER} style={styles.characterImage} resizeMode="contain" />
      </View>

      <View style={styles.cardContent}>
        <Image
          source={IMG_RECTANGLE}
          style={[styles.cardBg, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
          resizeMode="stretch"
        />
        <View style={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Select Meal</Text>
          {MEAL_OPTIONS.map((meal) => (
            <TouchableOpacity
              key={meal.type}
              onPress={() => handleSelectMeal(meal.type)}
              style={styles.mealRow}
              activeOpacity={0.8}
            >
              <Image source={meal.image} style={styles.mealIcon} resizeMode="contain" />
              <Text style={styles.mealLabel}>{meal.label}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={COLORS.textMuted} />
            </TouchableOpacity>
          ))}

          <Text style={[styles.sectionTitle, styles.progressSectionTitle]}>Today&apos;s Progress</Text>
          <View style={styles.progressRow}>
            <View style={styles.progressCard}>
              <Image source={IMG_PROTEIN_TOTAL} style={styles.progressIcon} resizeMode="contain" />
              <Text style={styles.progressLabel}>Protein Total</Text>
              <Text style={styles.progressValue}>2</Text>
            </View>
            <View style={styles.progressCard}>
              <Image source={IMG_VEGETABLE_TOTAL} style={styles.progressIcon} resizeMode="contain" />
              <Text style={styles.progressLabel}>Vegetable Total</Text>
              <Text style={styles.progressValue}>3</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueDark,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: 'Futura PT',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 28,
    color: COLORS.white,
    marginBottom: 4,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  logMealIcon: {
    width: 48 * scaleX,
    height: 48 * scaleX,
    marginRight: 6,
  },
  headerSubtitle1: {
    fontFamily: 'Futura PT',
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.white,
  },
  headerSubtitle2: {
    fontFamily: 'Futura PT',
    fontWeight: '400',
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  characterImage: {
    position: 'absolute',
    width: 184 * scaleX,
    height: 296 * scaleX,
    top: 100 * scaleY,
    right: 0,
  },
  cardContent: {
    marginTop: 70 * scaleY,
    width: SCREEN_WIDTH,
    minHeight: SCREEN_HEIGHT - 37 * scaleY,
    backgroundColor: COLORS.white,
    position: 'relative',
    flex: 1,
    alignItems: 'center',
  },
  cardBg: {
    position: 'absolute',
    top: -37 * scaleY,
    zIndex: 0,
  },
  scrollContent: {
    flex: 1,
    zIndex: 1,
    width: '100%',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Futura PT',
    fontWeight: '700',
    fontSize: 18,
    color: COLORS.textDark,
    marginBottom: 12,
  },
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  mealIcon: {
    width: 48,
    height: 48,
    marginRight: 14,
  },
  mealLabel: {
    flex: 1,
    fontFamily: 'Futura PT',
    fontWeight: '600',
    fontSize: 16,
    color: COLORS.blueDark,
  },
  progressSectionTitle: {
    marginTop: 20,
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: 'row',
    gap: 12,
  },
  progressCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8E8E8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  progressIcon: {
    width: 56,
    height: 56,
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: 'Futura PT',
    fontWeight: '500',
    fontSize: 13,
    color: COLORS.textDark,
    marginBottom: 4,
  },
  progressValue: {
    fontFamily: 'Futura PT',
    fontWeight: '700',
    fontSize: 22,
    color: COLORS.textDark,
  },
});
