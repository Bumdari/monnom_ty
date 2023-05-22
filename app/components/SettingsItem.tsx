import React, { Dispatch, FC, SetStateAction, useContext } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import scale from '../assets/scale';
import { SvgProps } from 'react-native-svg';
import { useAppSelector } from '../redux/hooks';
import { colors } from '../assets/theme';

interface SettingsItemI {
  Icon: FC<SvgProps>;
  value: boolean;
  onValueChange: Dispatch<SetStateAction<boolean>>;
  text: string;
}
const SettingsItem: FC<SettingsItemI> = ({
  Icon,
  value,
  onValueChange,
  text,
}) => {

  const { theme } = useAppSelector(state => state.theme);
  const activeColors = colors[theme];

  const styles = StyleSheet.create({
    item: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    itemLeft: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: scale(10),
    },
    itemText: {
      color: activeColors.text,
    },
  });

  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Icon />
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: activeColors.primary }}
      />
    </View>
  );
};

export default SettingsItem;
