import React, { FC, useContext } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  StyleProp,
  ViewStyle,
} from 'react-native';
import scaleSize from '../assets/scale';
import { useAppSelector } from '../redux/hooks';
import { colors, icons } from '../assets/theme';

interface SafeAreaProps {
  ph?: number;
  pv?: number;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
}

const SafeAreaBox: FC<SafeAreaProps> = ({ ph, pv, children, containerStyle }) => {
  const { theme } = useAppSelector(state => state.theme);
  const activeIcons = icons[theme];
  const activeColors = colors[theme];

  const container = {
    flex: 1,
    paddingHorizontal: ph || ph == 0 ? scaleSize(ph) : scaleSize(24),
    paddingVertical: pv ? scaleSize(pv) : scaleSize(16),
  };
  const flex1 = {
    flex: 1,
    backgroundColor: activeColors.background,
  };

  return (
    <SafeAreaView style={[flex1, containerStyle]}>
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        hidden={false}
      />
      <View style={container}>{children}</View>
    </SafeAreaView>
  );
};

export default SafeAreaBox;
