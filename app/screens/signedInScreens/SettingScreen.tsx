import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, Text, View } from 'react-native';
import SettingsItem from '../../components/SettingsItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { colors, icons } from '../../assets/theme';
import { toggleThemeRequest } from '../../redux/theme/action';
import Header from '../../components/Header';
import scaleSize from '../../assets/scale';

function SettingsScreen(): JSX.Element {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { Appearance } = activeIcons;
    const [themeValue, setThemeValue] = useState<boolean>(theme === 'dark');

    const changeTheme = () => {
        setThemeValue(theme !== 'dark');
        dispatch(toggleThemeRequest(theme === 'light' ? 'dark' : 'light'));
    };
    return (
        <View style={{ backgroundColor: activeColors.background, flex: 1, }}>
            <Header type='subheader' title='Settings' />
            <View style={{ padding: scaleSize(28) }}>
                <SettingsItem
                    Icon={Appearance}
                    value={themeValue}
                    onValueChange={changeTheme}
                    text={'Dark theme'}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({

});

export default SettingsScreen;
