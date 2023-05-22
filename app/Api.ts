import {Alert, Linking, YellowBox} from 'react-native';
import axios, {AxiosResponse} from 'axios';
import {store} from './redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const userAPI = {
  async getRequest(url: string, isAuth: boolean): Promise<any> {
    const tokenParse = await AsyncStorage.getItem('@AuthStore:authToken');
    // @ts-ignore
    const token = JSON.parse(tokenParse).token;

    const response: AxiosResponse = await axios.get(
      url,
      isAuth
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {},
    );
    return response.data;
  },
  async postRequest(url: string, isAuth: boolean, data?: any): Promise<any> {
    const tokenParse = await AsyncStorage.getItem('@AuthStore:authToken');
    // @ts-ignore
    const token = JSON.parse(tokenParse).token;
    const response: AxiosResponse = await axios.post(
      url,
      isAuth
        ? {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        : {},
      data,
    );
    return response.data;
  },
};

export default userAPI;

// Handle network errors
const handleNetworkError = (error: any): void => {
  console.error(error);
  Alert.alert(
    'Network Error',
    'Check your network connection and open Wi-Fi settings',
    [
      {
        text: 'Open Wi-Fi SettingsScreen',
        onPress: () => {
          Linking.openSettings();
        },
      },
      {
        text: 'OK',
        style: 'cancel',
      },
    ],
    {cancelable: false},
  );
};
