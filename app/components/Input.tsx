import React, { FC, useContext, useEffect, useState } from 'react';
import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import scale from '../assets/scale';
import { colors, icons } from '../assets/theme';
import { SvgProps } from 'react-native-svg';
import mainStyles from '../assets/mainStyles';
import { useAppSelector } from '../redux/hooks';

type InputValidation = {
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
};

enum KeyboardTypes {
  NUMERIC = 'numeric',
  EMAIL_ADDRESS = 'email-address',
  PHONE_PAD = 'phone-pad',
  NUMBER_PAD = 'number-pad',
  DECIMAL_PAD = 'decimal-pad',
  PASSWORD = 'default',
  REPEAT_PASSWORD = 'repeat-password',
}
interface InputProps {
  LeftIcon?: FC<SvgProps>;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  keyboardType?: KeyboardTypes;
  validation?: InputValidation;
  numberOfLines?: number;
  autofocus?: boolean;
  secure?: boolean;
  isIcon?: boolean;
  label?: string;
  onChangeText: (val: string) => void;
  setFormError: (error: boolean) => void;
}

const Input: FC<InputProps> = ({
  LeftIcon,
  keyboardType,
  validation,
  value,
  placeholder,
  autofocus,
  numberOfLines,
  disabled,
  secure = true,
  label,
  isIcon,
  onChangeText,
  setFormError,
}) => {
  const { theme } = useAppSelector(state => state.theme);
  const activeIcons = icons[theme];
  const activeColors = colors[theme];

  const { Eye, EyeSlash, ProfileCircle, LockCircle, X } = activeIcons;
  let leftIconExist: boolean = false;
  let rightIconExist: boolean = false;

  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(
    keyboardType === KeyboardTypes.PASSWORD,
  );

  let currentKeyboardType: KeyboardType;

  switch (keyboardType) {
    case KeyboardTypes.EMAIL_ADDRESS:
      currentKeyboardType = 'email-address';
      leftIconExist = true;
      break;
    case KeyboardTypes.NUMERIC:
      currentKeyboardType = 'numeric';
      break;
    case KeyboardTypes.PHONE_PAD:
      currentKeyboardType = 'phone-pad';
      break;
    case KeyboardTypes.NUMBER_PAD:
      currentKeyboardType = 'number-pad';
      break;
    case KeyboardTypes.DECIMAL_PAD:
      currentKeyboardType = 'decimal-pad';
      break;
    case KeyboardTypes.PASSWORD:
      currentKeyboardType = 'default';
      rightIconExist = true;
      leftIconExist = true;
      break;
    case KeyboardTypes.REPEAT_PASSWORD:
      currentKeyboardType = 'default';
      rightIconExist = true;
      leftIconExist = true;
      break;
    default:
      currentKeyboardType = 'default';
      rightIconExist = false;
      leftIconExist = false;
  }
  if (LeftIcon) {
    leftIconExist = true;
  }
  const validateInput = (inputText: string) => {
    if (validation?.isRequired && !inputText) {
      return 'Input is required';
    }
    if (validation?.minLength && inputText.length < validation?.minLength) {
      return `Input must be at least ${validation?.minLength} characters`;
    }
    if (validation?.maxLength && inputText.length > validation?.maxLength) {
      return `Input must be less than ${validation?.maxLength} characters`;
    }
    if (keyboardType === KeyboardTypes.EMAIL_ADDRESS) {
      const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputText)) {
        return 'Invalid email';
      }
    }
    return null;
  };

  const handleTextChange = (inputText: string) => {
    onChangeText(inputText);
    const errorMessage: string | null = validateInput(inputText);
    setError(errorMessage);
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const clearPassword = () => {
    handleTextChange('');
  };

  useEffect(() => {
    if (error) {
      setFormError(true);
    } else {
      setFormError(false);
    }
  }, [error]);

  const styles = StyleSheet.create({
    wrapper: {
      width: '100%',
      marginVertical: scale(8)
    },
    inputWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    input: {
      fontFamily: 'GratoGrotesk-Regular',
      fontWeight: '500',
      height: numberOfLines ? scale(48) * numberOfLines : scale(48),
      width: '100%',
      paddingHorizontal: leftIconExist && isIcon ? scale(36) : scale(24),
      paddingVertical: scale(16),
      borderRadius: scale(12),
      borderColor: error ? activeColors.accent : activeColors.line,
      color: disabled ? activeColors.textSub : activeColors.text,
      backgroundColor: disabled
        ? activeColors.surface
        : activeColors.secondary,
    },
    errorText: {
      color: activeColors.accent,
      fontWeight: '500',
      fontSize: scale(12),
      marginTop: scale(8),
      marginLeft: scale(12)
    },
    leftIcon: {
      position: 'absolute',
      left: scale(10),
      zIndex: 1,
    },
    rightIcon: {
      position: 'absolute',
      right: scale(10),
    },
    label: {
      color: disabled ? activeColors.textSub : activeColors.text,
      fontSize: scale(13),
      lineHeight: scale(16),
    },
  });
  const Icon = () => {
    if (LeftIcon) {
      return <LeftIcon
        style={styles.leftIcon}
        width={scale(20)}
        height={scale(20)}
      />
    }
    if (keyboardType === KeyboardTypes.EMAIL_ADDRESS) {
      return <ProfileCircle
        style={styles.leftIcon}
        width={scale(20)}
        height={scale(20)}
      />
    }
    if (keyboardType === KeyboardTypes.PASSWORD ||
      keyboardType === KeyboardTypes.REPEAT_PASSWORD) {
      return <LockCircle
        style={styles.leftIcon}
        width={scale(20)}
        height={scale(20)}
      />
    }
    return null;
  }
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {isIcon && <Icon />}
        <TextInput
          value={value}
          onChangeText={handleTextChange}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={activeColors.textSub}
          autoCapitalize="none"
          editable={!disabled}
          keyboardType={currentKeyboardType}
          secureTextEntry={
            passwordVisible || keyboardType === KeyboardTypes.REPEAT_PASSWORD
          }
          maxLength={validation?.maxLength}
          multiline={!!numberOfLines}
          numberOfLines={numberOfLines}
          autoFocus={autofocus}
        />
        {keyboardType === KeyboardTypes.PASSWORD && secure ? (
          <TouchableOpacity onPress={togglePassword} style={styles.rightIcon}>
            {passwordVisible ? (
              <Eye width={scale(20)} height={scale(20)} />
            ) : (
              <EyeSlash width={scale(20)} height={scale(20)} />
            )}
          </TouchableOpacity>
        ) : (
          <View />
        )}
        {keyboardType === KeyboardTypes.REPEAT_PASSWORD && value.length >= 1 ? (
          <TouchableOpacity onPress={clearPassword} style={styles.rightIcon}>
            <X width={scale(20)} height={scale(20)} />
          </TouchableOpacity>
        ) : (
          <View />
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;
