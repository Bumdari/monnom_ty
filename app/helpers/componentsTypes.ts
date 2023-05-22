// Input
import {FC} from 'react';
import {SvgProps} from 'react-native-svg';
import {ColorValue} from 'react-native';
import {Asset, ImagePickerResponse} from 'react-native-image-picker';
import {Double} from 'react-native/Libraries/Types/CodegenTypes';

export type InputValidation = {
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
};

export enum KeyboardTypes {
  NUMERIC = 'numeric',
  EMAIL_ADDRESS = 'email-address',
  PHONE_PAD = 'phone-pad',
  NUMBER_PAD = 'number-pad',
  DECIMAL_PAD = 'decimal-pad',
  PASSWORD = 'default',
  REPEAT_PASSWORD = 'repeat-password',
}

export type SafeAreaProps = {
  children: string;
  ph: Double;
  pv: Double;
  disabled?: boolean;
};

// Button
export type ButtonProps = {
  title: string;
  color?: string;
  backgroundColor?: string;
  onPress: () => void;
  disabled?: boolean;
  width?: number | string;
  height?: number | string;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  LeftIcon?: FC<SvgProps>;
  RightIcon?: FC<SvgProps>;
  borderStyle?: 'solid' | 'dotted' | 'dashed';
  borderWidth?: number;
  borderColor?: ColorValue;
};

// SuccessfulScreen

export type SuccessfulScreenProps = {
  title: string;
  subtitle: string;
  onButtonClick: () => void;
};

// Dropdown
export type DropdownProps = {
  label: string;
  dropdown: JSX.Element;
};

//Image picker
export type ImagePickerProps = {
  pickImages: () => void;
  deleteImage: (id: Asset) => void;
  pickedImages: ImagePickerResponse;
};

export type ImageFile = {
  fileName: string;
  fileSize: number;
  height: number;
  type: string;
  uri: string;
  width: number;
};

//Responsive modal
export type ResponsiveModalProps = {
  title: string;
  description: string;
  modalVisible: boolean;
  buttonTitle: string;
  setModalVisible: (val: boolean) => void;
  onPressButton: () => void;
};
