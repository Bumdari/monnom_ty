import {Alert, Linking} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import axios, {AxiosResponse} from 'axios';
import {store} from './redux/store';
import {strapi} from './constants/constant';
// import {setToken} from './redux/auth/slice';

export async function GetRequest(url: string, isAuth: boolean): Promise<any> {
  const token = store.getState().auth.token;
  try {
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
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    throw error;
  }
}
export async function PostRequest(
  url: string,
  isAuth: boolean,
  data?: any,
): Promise<any> {
  const token = store.getState().auth.token;
  try {
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
  } catch (error) {
    console.log(error);
    handleNetworkError(error);
    throw error;
  }
}

// export async function LoginRequest(data?: any) {
//   try {
//     const response: AxiosResponse = await axios.post(`${strapi}/auth/local`, {
//       identifier: data.username,
//       password: data.password,
//     });
//     if (response.status === 200) {
//       return response.data;
//     } else if (response.status === 400) {
//       // return
//     }
//   } catch (error) {
//     console.log(error);
//     // handleNetworkError(error);
//     throw error;
//   }
// }

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
