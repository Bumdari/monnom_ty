import React, { FC, useContext } from 'react';

import { StyleSheet, SafeAreaView, View, StatusBar, StyleProp, ViewStyle, TextStyle, Text, TouchableOpacity } from 'react-native';
import mainStyles from '../assets/mainStyles';
import scale from '../assets/scale';
import { useAppSelector } from '../redux/hooks';
import { colors, icons } from '../assets/theme';


interface CheckBoxProps {
    text: string;
    type?: string;
    value?: boolean;
    onPress: () => void;
    textStyle?: StyleProp<TextStyle>;
}

const CheckBox: FC<CheckBoxProps> = ({ text, onPress, textStyle, value, type }) => {
    const { theme } = useAppSelector(state => state.theme);
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { CheckBox, CheckedBox } = activeIcons;

    const styles = StyleSheet.create({
        font14: {
            ...mainStyles.font14_500,
            marginLeft: scale(12),
            fontWeight: '400',
            color: activeColors.text
        },
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: scale(8),
            marginLeft: scale(8),
        },
        checkbox: {
            height: scale(20),
            width: scale(20)
        }
    });
    if (type == 'radio') {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => { onPress() }}
            >
                {value ? <CheckedBox style={styles.checkbox} /> : <CheckBox style={styles.checkbox} />}
                <Text style={styles.font14}>{text ? text : ''}</Text>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                style={styles.container}
                onPress={() => { onPress() }}
            >
                {value ? <CheckedBox style={styles.checkbox} /> : <CheckBox style={styles.checkbox} />}
                <Text style={styles.font14}>{text ? text : ''}</Text>
            </TouchableOpacity>
        );
    }

};

export default CheckBox;

