import React, { FC, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { colors, icons } from '../assets/theme';
import { getThemeRequest } from '../redux/theme/action';

const SplashScreen: FC = () => {
  const { width, height } = Dimensions.get('screen');
  const { theme } = useAppSelector(state => state.theme);
  const activeIcons = icons[theme];
  const activeColors = colors[theme];

  const { Logo } = activeIcons;
  const dispatch = useAppDispatch();

  const getToken = async () => {
    try {
      const token = dispatch(getTokenRequest());
      return token;
    } catch (e) {
      throw e;
    }
  };

  const getTheme = async () => {
    try {
      dispatch(getThemeRequest());
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    getTheme();
    getToken();
  }, []);

  const styles = StyleSheet.create({
    wrapper: {
      position: 'absolute',
      width: width,
      height: height,
      flex: 1,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      backgroundColor: activeColors.background,
      zIndex: 999,
      elevation: 5
    },
    version: {
      color: activeColors.primary,
    },
  });

  return (
    <View style={styles.wrapper}>
      <Logo />
      <Text style={styles.version}>v1.0</Text>
    </View>
  );
};

export default SplashScreen;
function getTokenRequest(): any {
  throw new Error('Function not implemented.');
}

