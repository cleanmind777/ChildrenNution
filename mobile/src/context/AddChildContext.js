import React, { createContext, useContext, useState } from 'react';

const AddChildContext = createContext();

export const useAddChild = () => {
  const ctx = useContext(AddChildContext);
  if (!ctx) throw new Error('useAddChild must be used within AddChildProvider');
  return ctx;
};

const initial = {
  name: '',
  gender: 'male',
  avatarUri: null,
  birthday: '', // YYYY-MM-DD
  foodAllergies: [],
  dietaryRestrictions: [],
  feedingPreferences: [],
  medicalNotes: '',
};

export const AddChildProvider = ({ children }) => {
  const [form, setForm] = useState(initial);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const reset = () => setForm(initial);

  return (
    <AddChildContext.Provider value={{ form, update, reset }}>
      {children}
    </AddChildContext.Provider>
  );
};
