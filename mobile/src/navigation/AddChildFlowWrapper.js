import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AddChildProvider } from '../context/AddChildContext';
import AddChildFlowNavigator from './AddChildFlowNavigator';

export default function AddChildFlowWrapper({ navigation }) {
  useFocusEffect(
    useCallback(() => {
      const parent = navigation.getParent();
      if (parent) {
        parent.setOptions({ tabBarStyle: { display: 'none' } });
      }
      return () => {
        if (parent) {
          parent.setOptions({ tabBarStyle: undefined });
        }
      };
    }, [navigation])
  );

  return (
    <AddChildProvider>
      <AddChildFlowNavigator />
    </AddChildProvider>
  );
}
