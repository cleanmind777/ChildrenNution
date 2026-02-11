import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, Checkbox } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAddChild } from '../../../context/AddChildContext';
import api from '../../../config/api';

const FALLBACK_OPTIONS = [
  'Vegetarian',
  'Vegan',
  'Dairy-free',
  'Egg-free',
  'Gluten-free',
  'Kosher',
  'Halal',
  'Religious / cultural preference',
];

export default function AddChildDietaryRestrictions() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();

  const [options, setOptions] = useState(FALLBACK_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [other, setOther] = useState('');

  // Load options from API
  useEffect(() => {
    let cancelled = false;
    api.get('/api/dietary-restriction-options/')
      .then((res) => {
        if (cancelled) return;
        const list = (res.data || []).map((o) => (typeof o === 'string' ? o : o.label));
        if (list.length) setOptions(list);
      })
      .catch(() => { if (!cancelled) setOptions(FALLBACK_OPTIONS); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Initialise from context
  useEffect(() => {
    const current = Array.isArray(form.dietaryRestrictions)
      ? form.dietaryRestrictions
      : (form.dietaryRestrictions ? String(form.dietaryRestrictions).split(',').map((s) => s.trim()).filter(Boolean) : []);

    if (!current.length) {
      setSelected([]);
      setOther('');
      return;
    }

    const otherFromValue = current.find((v) => v.startsWith('Other: '));
    if (otherFromValue) {
      setOther(otherFromValue.replace('Other: ', ''));
      setSelected(current.filter((v) => v !== otherFromValue));
    } else {
      setOther('');
      setSelected(current);
    }
  }, []);

  const toggleOption = (option) => {
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option],
    );
  };

  const handleNext = () => {
    let values = [...selected];
    if (other.trim().length > 0) {
      values.push(`Other: ${other.trim()}`);
    }
    update('dietaryRestrictions', values);
    navigation.navigate('AddChildFeedingPreferences');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Dietary Restrictions</Text>

      {loading ? (
        <Text style={styles.loading}>Loading options...</Text>
      ) : null}

      {options.map((option) => (
        <Checkbox.Item
          key={option}
          label={option}
          status={selected.includes(option) ? 'checked' : 'unchecked'}
          onPress={() => toggleOption(option)}
        />
      ))}

      <Text style={styles.sectionTitle}>Other</Text>
      <View style={styles.otherRow}>
        <Checkbox
          status={other.trim().length > 0 ? 'checked' : 'unchecked'}
          onPress={() => {
            if (!other) {
              setOther('');
            }
          }}
        />
        <View style={styles.otherInputWrapper}>
          <TextInput
            mode="outlined"
            label="Other"
            placeholder="Enter other restriction"
            value={other}
            onChangeText={(text) => setOther(text)}
          />
        </View>
      </View>

      <Button mode="contained" onPress={handleNext} style={styles.button}>
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, marginBottom: 12 },
  loading: { marginBottom: 12, color: '#666' },
  sectionTitle: { marginTop: 12, marginBottom: 4, fontSize: 14, fontWeight: '600' },
  otherRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  otherInputWrapper: { flex: 1 },
  button: { marginTop: 16 },
});
