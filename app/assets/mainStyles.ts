import scale from './scale';
import {StyleSheet, StyleSheetProperties} from 'react-native';

const Regular: string = 'GratoGrotesk-Regular';
const Bold: string = 'GratoGrotesk-Bold';

const mainStyles = {
  h1: {
    lineHeight: scale(36),
    fontSize: scale(30),
    fontWeight: '700',
  },
  h2: {
    lineHeight: scale(32),
    fontSize: scale(28),
    fontWeight: '700',
  },
  h3: {
    lineHeight: scale(21),
    fontSize: scale(16),
    fontWeight: '700',
  },
  h4: {
    lineHeight: scale(18),
    fontSize: scale(14),
    fontWeight: '700',
  },
  h5: {
    lineHeight: scale(16),
    fontSize: scale(12),
    fontWeight: '700',
  },
  font16_bold: {
    lineHeight: scale(24),
    fontSize: scale(16),
    fontFamily: Bold,
  },
  font14_500: {
    lineHeight: scale(21),
    fontSize: scale(14),
    fontWeight: '600',
    fontFamily: Regular,
  },
  title18: {
    fontFamily: Bold,
    fontSize: scale(18),
    lineHeight: scale(24),
  },
  container: {
    paddingHorizontal: scale(20),
    paddingVertical: scale(16),
  },
  headerBackButton: {
    marginLeft: scale(15),
  },
};

export default mainStyles;
