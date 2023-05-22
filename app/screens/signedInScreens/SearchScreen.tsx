import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, Text } from 'react-native';
import SettingsItem from '../../components/SettingsItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { colors, icons } from '../../assets/theme';
import { toggleThemeRequest } from '../../redux/theme/action';

function SearchScreen(): JSX.Element {
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
        <SafeAreaView >
            <Text>{'SearchScreen'}</Text>
            <SettingsItem
                Icon={Appearance}
                value={themeValue}
                onValueChange={changeTheme}
                text={'Dark theme'}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});

export default SearchScreen;
