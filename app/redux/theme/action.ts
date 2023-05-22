import {createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';

export const getThemeRequest = createAsyncThunk(
  'theme/getThemeRequest',
  async () => {
    try {
      const theme = await AsyncStorage.getItem('@ThemeStore:theme');
      return theme != null ? JSON.parse(theme) : Appearance.getColorScheme();
    } catch (e) {
      // error reading value
      console.error(e);
    }
  },
);

export const toggleThemeRequest = createAsyncThunk(
  'theme/toggleThemeRequest',
  // @ts-ignore
  async (theme: 'dark' | 'light') => {
    try {
      await AsyncStorage.setItem('@ThemeStore:theme', JSON.stringify(theme));
      return theme;
    } catch (e) {
      console.error(e);
    }
  },
);
