import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text, Snackbar, Checkbox } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { InputField, AppButton } from '../onboarding/components';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const DESIGN_WIDTH = 440;
const DESIGN_HEIGHT = 956;
const scaleX = SCREEN_WIDTH / DESIGN_WIDTH;
const scaleY = SCREEN_HEIGHT / DESIGN_HEIGHT;

// Login card (and IMG_RECTANGLE) size for design 440×956
const CARD_WIDTH = 407 * scaleX;
const CARD_HEIGHT = 499;
const CARD_MARGIN_H = ((DESIGN_WIDTH - 407) / 2) * scaleX;

// Character image positioning for design 440×956
const CHAR_WIDTH = 395 * scaleX;
const CHAR_HEIGHT = 473 * scaleY;
const CHAR_TOP = 1 * scaleY;
const CHAR_LEFT = 17 * scaleX;

// Circles background positioning for design 440×956
// On very tall screens (height > 1000), keep fixed 511×511
const IS_TALL_SCREEN = SCREEN_HEIGHT > 1000;
const CIRCLES_WIDTH = IS_TALL_SCREEN ? 511 : 511 * scaleX;
const CIRCLES_HEIGHT = IS_TALL_SCREEN ? 511 : 511 * scaleY;
const CIRCLES_TOP = 0;
// Center horizontally within the screen
const CIRCLES_LEFT = (SCREEN_WIDTH - CIRCLES_WIDTH) / 2;

const COLORS = {
  blueDark: '#083B9A',
  blueCard: '#3F68C7',
  blueLight: '#8CA9F3',
  orange: '#F68B1F',
  white: '#FFFFFF',
  inputBg: 'rgba(255,255,255,0.2)',
  textLight: '#E8EEFC',
};

// Assets from /assets/pic/auth/login
const IMG_CIRCLES = require('../../../assets/pic/auth/login/circles.png');
const IMG_CHARACTER = require('../../../assets/pic/auth/login/character.png');
const IMG_RECTANGLE = require('../../../assets/pic/auth/login/rectangle.png');
const IMG_GOOGLE = require('../../../assets/pic/auth/google.png');
const IMG_APPLE = require('../../../assets/pic/auth/apple.png');

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigation = useNavigation();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    const result = await login(email, password);
    if (!result.success) setError(result.error || 'Login failed');
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        
        {/* Top section: blue background + circles + character */}
        <View style={styles.headerSection}>
          <Image source={IMG_CIRCLES} style={styles.circles} resizeMode="cover" />
          <Image source={IMG_CHARACTER} style={styles.character} resizeMode="contain" />
        </View>

        {/* Login card: 407×499 at design 440×956 */}
        <View style={[styles.cardWrap, { width: CARD_WIDTH, height: CARD_HEIGHT, marginHorizontal: CARD_MARGIN_H }]}>
          <Image
            source={IMG_RECTANGLE}
            style={[styles.cardBg, { width: CARD_WIDTH, height: CARD_HEIGHT }]}
            resizeMode="stretch"
          />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Login</Text>

            <InputField
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Email"
              rightIcon="email-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              colors={{ icon: COLORS.textLight, background: COLORS.inputBg, outline: COLORS.blueLight, text: COLORS.white, placeholder: '#9CA3AF' }}
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
              onRightPress={() => setShowPassword(!showPassword)}
              secureTextEntry={!showPassword}
              colors={{ icon: COLORS.textLight, background: COLORS.inputBg, outline: COLORS.blueLight, text: COLORS.white, placeholder: '#9CA3AF' }}
            />

            <View style={styles.rowRemember}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setRemember(!remember)} style={styles.rememberRow}>
                <Checkbox.Android status={remember ? 'checked' : 'unchecked'} onPress={() => setRemember(!remember)} color={COLORS.orange} />
                <Text style={styles.rememberText}>Remember</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <AppButton
              label="Sign In"
              backgroundColor={COLORS.orange}
              fontColor={COLORS.white}
              fontSize={21.68}
              radius={15}
              fontFamily="Futura PT"
              fontStyle="normal"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              variant="primary"
            />

            <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.signUpWrap}>
              <Text style={styles.signUpText}>Don't have an account? </Text>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.socialRow}>
              <TouchableOpacity style={styles.socialIcon}>
                <Image source={IMG_GOOGLE} style={styles.socialIconImage} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialIcon}>
                <Image source={IMG_APPLE} style={styles.socialIconImage} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      <Snackbar visible={!!error} onDismiss={() => setError('')} duration={3000}>
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueDark,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  headerSection: {
    width: '100%',
    // minHeight: 280,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  circles: {
    position: 'absolute',
    top: CIRCLES_TOP,
    left: CIRCLES_LEFT,
    width: CIRCLES_WIDTH,
    height: CIRCLES_HEIGHT,
  },
  character: {
    position: 'absolute',
    width: CHAR_WIDTH,
    height: CHAR_HEIGHT,
    top: CHAR_TOP,
    left: CHAR_LEFT,
  },
  cardWrap: {
    marginTop: 8,
    position: 'absolute',
    bottom: 17,
  },
  cardBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },
  cardContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 20,
    borderRadius: 24,
    gap: 5,
  },
  cardTitle: {
    fontFamily: 'Futura PT',
    fontSize: 46.68,
    lineHeight: 46.68,
    letterSpacing: 0,
    textAlign: 'left',
    color: COLORS.white,
    marginBottom: 20,
  },
  rowRemember: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberText: {
    color: COLORS.textLight,
    fontSize: 21.68,
    marginLeft: 4,
  },
  forgotText: {
    color: COLORS.textLight,
    fontSize: 21.68,
  },
  signUpWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signUpText: {
    fontFamily: 'Futura PT',
    color: COLORS.textLight,
    fontSize: 18.68,
  },
  signUpLink: {
    fontFamily: 'Futura PT',
    color: COLORS.white,
    fontSize: 18.68,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    gap: 20,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconImage: {
    width: '100%',
    height: '100%',
  },
});
