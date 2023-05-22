import {useContext} from 'react';
import {Dimensions} from 'react-native';
import {useAppSelector} from '../redux/hooks';
import {colors, icons} from './theme';

interface FontProps {
  size: number;
  weight?: string;
  family?: string;
  color?: string;
}

export const WINDOW_WIDTH: number = Dimensions.get('window').width;
export const WINDOW_HEIGHT: number = Dimensions.get('window').height;
const guidelineBaseRatio: number = 2.165;

const ratio: number = WINDOW_HEIGHT / WINDOW_WIDTH;

export default function fontSize(props: FontProps): {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  fontWeight: string;
  color: string;
} {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {theme} = useAppSelector(state => state.theme);
  const activeIcons = icons[theme];
  const activeColors = colors[theme];

  const fontfamily = (): string => {
    if (props.family === 'bold') {
      return 'GratoGrotesk-Bold';
    } else if (props.family === 'medium') {
      return 'GratoGrotesk-Medium';
    } else if (props.family === 'light') {
      return 'GratoGrotesk-Light';
    } else {
      return 'GratoGrotesk-Regular';
    }
  };

  return {
    fontSize: props.size / (guidelineBaseRatio / ratio),
    fontFamily: fontfamily(),
    lineHeight: (props.size + 8) / (guidelineBaseRatio / ratio),
    fontWeight: props.weight ? props.weight : '400',
    color: props.color ? props.color : activeColors.background,
  };
}
