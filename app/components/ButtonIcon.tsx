import React, { FC, useContext } from 'react';

import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity
} from 'react-native';
import scaleSize from '../assets/scale';
import { SvgProps } from 'react-native-svg';
import { useAppSelector } from '../redux/hooks';
import { colors } from '../assets/theme';

interface ButtonIconProps {
  width?: number | string;
  height?: number | string;
  Icon: FC<SvgProps>;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const ButtonIcon: FC<ButtonIconProps> = ({
  width,
  height,
  Icon,
  onPress,
  containerStyle,
}) => {
  const { theme } = useAppSelector(state => state.theme);
  const activeColors = colors[theme];

  const styles = StyleSheet.create({
    button_cont: {
      width: width ? width : 'auto',
      height: height ? height : 'auto',
      borderWidth: 1,
      borderColor: activeColors.border,
      backgroundColor: activeColors.background,
      padding: scaleSize(16),
      borderRadius: scaleSize(8),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  return (
    <TouchableOpacity
      style={[styles.button_cont, containerStyle]}
      onPress={() => {
        onPress();
      }}>
      <Icon />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
