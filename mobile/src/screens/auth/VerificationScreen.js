import React, { useState, useEffect } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function VerificationScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const email = route.params?.email || '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { verifyCode, resendCode } = useAuth();

  const handleVerify = async () => {
    if (!code || code.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setLoading(true);
    setError('');

    const result = await verifyCode(email, code);
    
    if (!result.success) {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    setSuccess('');

    const result = await resendCode(email);
    
    if (result.success) {
      setSuccess('Verification code sent!');
    } else {
      setError(result.error);
    }
    
    setResending(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Verify Email
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Enter the verification code sent to{'\n'}
          {email}
        </Text>

        <TextInput
          label="Verification Code"
          value={code}
          onChangeText={setCode}
          mode="outlined"
          keyboardType="number-pad"
          maxLength={6}
          style={styles.input}
          placeholder="000000"
        />

        <Button
          mode="contained"
          onPress={handleVerify}
          loading={loading}
          disabled={loading}
          style={styles.button}
        >
          Verify
        </Button>

        <Button
          mode="text"
          onPress={handleResend}
          loading={resending}
          disabled={resending}
          style={styles.linkButton}
        >
          Resend Code
        </Button>
      </View>

      <Snackbar
        visible={!!error}
        onDismiss={() => setError('')}
        duration={3000}
      >
        {error}
      </Snackbar>

      <Snackbar
        visible={!!success}
        onDismiss={() => setSuccess('')}
        duration={3000}
        style={{ backgroundColor: '#4caf50' }}
      >
        {success}
      </Snackbar>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
  linkButton: {
    marginTop: 15,
  },
});
