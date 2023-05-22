import React, { FC, useContext } from 'react';

import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  StyleProp,
  ViewStyle,
  TextStyle,
  Text,
  TouchableOpacity,
} from 'react-native';
import mainStyles from '../assets/mainStyles';
import scale from '../assets/scale';
import { useAppSelector } from '../redux/hooks';
import { colors, icons } from '../assets/theme';

interface TextButtonProps {
  text: string;
  value?: boolean;
  position?: string;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

const ButtonText: FC<TextButtonProps> = ({
  text,
  position,
  onPress,
  textStyle,
  value,
  disabled,
}) => {
  const { theme } = useAppSelector(state => state.theme);
  const activeColors = colors[theme];

  function setPosition() {
    switch (position) {
      case 'end':
        return 'flex-end';
      case 'start':
        return 'flex-start';
      default:
        return 'center';
    }
  }
  const styles = StyleSheet.create({
    font14: {
      ...mainStyles.font14_500,
      fontWeight: '600',
      color: activeColors.textLight,
    },
    container: {
      flexDirection: 'row',
      // alignItems: 'center',
      justifyContent: setPosition(),
      marginVertical: scale(8),
      marginLeft: scale(8),
    },
  });
  return (
    <TouchableOpacity
      style={styles.container}
      disabled={disabled}
      onPress={() => {
        onPress();
      }}>
      <Text style={textStyle ? textStyle : styles.font14}>
        {text ? text : ''}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonText;
