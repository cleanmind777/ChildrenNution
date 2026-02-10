import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Checkbox, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useAddChild } from '../../../context/AddChildContext';
import api from '../../../config/api';

const FALLBACK_OPTIONS = [
  'Milk / Dairy', 'Eggs', 'Peanuts', 'Tree nuts', 'Soy', 'Wheat', 'Fish', 'Shellfish', 'Sesame',
];

const NO_KNOWN_LABEL = 'No known food allergies';

export default function AddChildFoodAllergies() {
  const navigation = useNavigation();
  const { form, update } = useAddChild();

  const [options, setOptions] = useState(FALLBACK_OPTIONS);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [noKnown, setNoKnown] = useState(true);
  const [other, setOther] = useState('');

  useEffect(() => {
    let cancelled = false;
    api.get('/api/food-allergy-options/')
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
    const current = Array.isArray(form.foodAllergies)
      ? form.foodAllergies
      : (form.foodAllergies ? String(form.foodAllergies).split(',').map(s => s.trim()).filter(Boolean) : []);

    if (!current.length || current.includes(NO_KNOWN_LABEL)) {
      setNoKnown(true);
      setSelected([]);
      setOther('');
      return;
    }

    setNoKnown(false);

    const baseSelected = current.filter(v => v !== 'Other');
    const otherFromValue = baseSelected.find(v => v.startsWith('Other: '));
    if (otherFromValue) {
      setOther(otherFromValue.replace('Other: ', ''));
      setSelected(baseSelected.filter(v => v !== otherFromValue));
    } else {
      setOther('');
      setSelected(baseSelected);
    }
  }, []);

  const toggleOption = (option) => {
    setNoKnown(false);
    setSelected(prev =>
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option],
    );
  };

  const toggleNoKnown = () => {
    const next = !noKnown;
    setNoKnown(next);
    if (next) {
      setSelected([]);
      setOther('');
    }
  };

  const handleNext = () => {
    let values;

    if (noKnown) {
      values = [NO_KNOWN_LABEL];
    } else {
      values = [...selected];
      if (other.trim().length > 0) {
        values.push(`Other: ${other.trim()}`);
      }
    }

    update('foodAllergies', values);
    navigation.navigate('AddChildDietaryRestrictions');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Food Allergies</Text>

      {loading ? (
        <Text style={styles.loading}>Loading options...</Text>
      ) : null}
      {options.map((option) => (
        <Checkbox.Item
          key={option}
          label={option}
          status={selected.includes(option) && !noKnown ? 'checked' : 'unchecked'}
          onPress={() => toggleOption(option)}
        />
      ))}

      <Text style={styles.sectionTitle}>Additional options</Text>

      <Checkbox.Item
        label={NO_KNOWN_LABEL + ' (default)'}
        status={noKnown ? 'checked' : 'unchecked'}
        onPress={toggleNoKnown}
      />

      <View style={styles.otherRow}>
        <Checkbox
          status={!noKnown && other.trim().length > 0 ? 'checked' : 'unchecked'}
          onPress={() => {
            setNoKnown(false);
            if (!other) {
              setOther('');
            }
          }}
        />
        <View style={styles.otherInputWrapper}>
          <TextInput
            mode="outlined"
            label="Other"
            placeholder="Enter other allergy"
            value={other}
            onChangeText={text => {
              setNoKnown(false);
              setOther(text);
            }}
          />
        </View>
      </View>

      <Button
        mode="contained"
        onPress={handleNext}
        style={styles.button}
      >
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
