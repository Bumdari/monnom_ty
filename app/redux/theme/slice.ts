import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Appearance} from 'react-native';

import {colors, icons} from '../../assets/theme';

import {getThemeRequest, toggleThemeRequest} from './action';

export interface ThemeSliceI {
  theme: 'dark' | 'light';
  isLoadingTheme: boolean;
}

const initialState: ThemeSliceI = {
  // @ts-ignore
  theme: Appearance.getColorScheme(),
  isLoadingTheme: true,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: state => {
      if (state.theme === 'dark') {
        state.theme = 'light';
        AsyncStorage.setItem('@ThemeStorage:theme', JSON.stringify('light'));
      } else if (state.theme === 'light') {
        state.theme = 'dark';
        AsyncStorage.setItem('@ThemeStorage:theme', JSON.stringify('dark'));
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(getThemeRequest.fulfilled, (state, action) => {
      if (action.payload) {
        state.theme = action.payload;
      }
      state.isLoadingTheme = false;
    });
    builder.addCase(getThemeRequest.pending, state => {
      state.isLoadingTheme = true;
    });
    builder.addCase(getThemeRequest.rejected, state => {
      state.isLoadingTheme = false;
    });

    builder.addCase(toggleThemeRequest.fulfilled, (state, action) => {
      if (action.payload) {
        state.theme = action.payload;
      }
    });
  },
});

// Action creators are generated for each case reducer function
export const {toggleTheme} = themeSlice.actions;

export default themeSlice.reducer;
