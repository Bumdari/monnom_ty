import React, { FC, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import scale from '../assets/scale';
import { ButtonProps } from '../helpers/componentsTypes';
import { useAppSelector } from '../redux/hooks';
import { colors, icons } from '../assets/theme';

const Button: FC<ButtonProps> = ({
  title,
  color,
  onPress,
  disabled,
  backgroundColor,
  width,
  fontWeight,
  fontSize,
  LeftIcon,
  RightIcon,
  borderColor,
  borderWidth,
  borderStyle,
  height,
}) => {
  const { theme } = useAppSelector(state => state.theme);
  const activeIcons = icons[theme];
  const activeColors = colors[theme];
  let bgColor;
  if (disabled) {
    bgColor = activeColors.surface;
  } else if (backgroundColor) {
    bgColor = backgroundColor;
  } else {
    bgColor = activeColors.primary;
  }

  const styles = StyleSheet.create({
    button: {
      display: 'flex',
      paddingVertical: scale(16),
      marginVertical: scale(8),
      backgroundColor: bgColor,
      width: width ? width : 'auto',
      height: height ? height : scale(56),
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: scale(8),
      borderRadius: scale(8),
      borderColor: borderColor,
      borderWidth: borderWidth,
      borderStyle: borderStyle,
    },
    button_line: {
      borderWidth: 1,
      borderColor: activeColors.border,
      padding: scale(16),
    },
    buttonText: {
      color: color ? color : activeColors.btnText,
      fontWeight: fontWeight ? fontWeight : '700',
      fontSize: fontSize ? fontSize : scale(14),
    },
  });

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={disabled ? disabled : false}>
      {LeftIcon && <LeftIcon width={scale(24)} height={scale(24)} />}
      <Text style={styles.buttonText}>{title}</Text>
      {RightIcon && <RightIcon width={scale(24)} height={scale(24)} />}
    </TouchableOpacity>
  );
};

export default Button;
