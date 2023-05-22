import React, { FC, useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import scale from '../assets/scale';
import { SvgProps } from 'react-native-svg';
import { useAppSelector } from '../redux/hooks';
import { colors, icons } from '../assets/theme';
import scaleSize from '../assets/scale';

interface HeaderProps {
  title?: string;
  type?: 'subheader';
  customeFunction?: () => void;
  onPress?: () => void;
  Icon?: FC<SvgProps>;
}

const Header: FC<HeaderProps> = ({ title, type, onPress, customeFunction, Icon }) => {
  const navigation = useNavigation();
  const { theme } = useAppSelector(state => state.theme);
  const activeIcons = icons[theme];
  const activeColors = colors[theme];
  const { Settings, HeaderLogo, ArrowLeft, MoreSquare } = activeIcons;
  const styles = StyleSheet.create({
    footerBtn: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: scale(28)
    },
    font16: {
      fontSize: scaleSize(16),
      lineHeight: scaleSize(24),
      fontWeight: '500',
      fontFamily: 'GratoGrotesk-Medium',
      color: activeColors.text,
    },
    buttonContainer: {
      height: scaleSize(40),
      width: scaleSize(40),
      alignItems: 'center',
      justifyContent: 'center'
    },
    backButtonStyle: {
      height: scaleSize(24),
      width: scaleSize(24),
    }
  });

  const RightButton = () => {
    return (
      // @ts-ignore
      <TouchableOpacity style={styles.buttonContainer} onPress={() => { onPress() }}>
        <Settings />
      </TouchableOpacity>
    );
  }
  const CustomerButton = () => {
    if (customeFunction) {
      return (
        <TouchableOpacity style={styles.buttonContainer} onPress={() => { }}>
          <MoreSquare style={styles.backButtonStyle} />
        </TouchableOpacity>
      );
    }
    else {
      return (
        <View style={styles.buttonContainer} />
      );
    }

  }
  if (type === "subheader") {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => {
            navigation.goBack()
          }}>
            <ArrowLeft style={styles.backButtonStyle} />
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.font16}>{title}</Text>
          <CustomerButton />
        </View>
      </SafeAreaView>
    );
  }
  else {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <HeaderLogo />
          <Text style={styles.font16}>{title}</Text>
          <RightButton />
        </View>
      </SafeAreaView>
    );
  }

};

export default Header;
