import {createAsyncThunk, createStore} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
// import {store} from '../store';
import Api from '../../Api';
import userAPI from '../../Api';
import {express} from '../../constants/constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import authSlice from './slice';

// const store = createStore(authSlice)

export const loginRequest = createAsyncThunk(
  'auth/loginRequest',
  async (data?: any) => {
    try {
      const response: AxiosResponse = await axios.post(
        `https://strapi.monnom.mn/auth/local`,
        {
          identifier: data.username,
          password: data.password,
        },
      );
      await AsyncStorage.setItem(
        '@AuthStore:authToken',
        JSON.stringify({token: response.data['jwt']}),
      );
      return response.data;
    } catch (error) {
      // Handle the error
      console.log('error ' + error);
      throw 'Incorrect password';
    }
  },
);

export const bookListRequest = createAsyncThunk(
  'auth/getRequest',
  async (data?: any) => {
    try {
      const response = await userAPI.getRequest(
        `${express}/app/books/main/${data}`,
        true,
      );
      return response;
    } catch (error) {
      // Handle the error
      console.log('error ' + error);
      throw 'Incorrect password';
    }
  },
);
export const bookDetailRequest = createAsyncThunk(
  'auth/getRequest',
  async (data?: any) => {
    try {
      const response = await userAPI.getRequest(
        `${express}/app/book/${data}`,
        true,
      );
      return response;
    } catch (error) {
      // Handle the error
      console.log('error ' + error);
      throw 'Incorrect password';
    }
  },
);

