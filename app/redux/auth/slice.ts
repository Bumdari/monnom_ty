import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {loginRequest} from './actions';
import axios, {AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  birthday?: string;
  created_at?: string;
  fullname?: string;
  gender?: string;
  id: string;
  phone?: string;
  email?: string;
};
// Define a type for the slice state
export interface AuthSliceProp {
  user: User;
  token: string;
  isLoading: boolean;
}

const initialState: AuthSliceProp = {
  user: {
    id: '',
  },
  token: '',
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: any) => {
      console.log('action.payload');
      state.token = action.payload.jwt;
    },
  },
  extraReducers: builder => {
    console.log('extraReducers');
    // Хүсэлтийн хариу ирхэд
    builder.addCase(loginRequest.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        state.token = action.payload.jwt;
        state.user = action.payload.user;
        AsyncStorage.setItem(
          '@AuthStore:authToken',
          JSON.stringify({
            token: action.payload.jwt,
          }),
        );
      }
      state.isLoading = false;
    });
    // Хүсэлтийн илгээхэд
    builder.addCase(loginRequest.pending, state => {
      state.isLoading = true;
    });
    // Хүсэлт амжилтгүй
    builder.addCase(loginRequest.rejected, state => {
      state.isLoading = false;
    });
  },
});

export const {setUser} = authSlice.actions;

export default authSlice.reducer;
