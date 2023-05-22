import { StyleSheet, View, Text, Dimensions, PanResponder, TouchableOpacity } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Reader, ReaderProvider, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from '@epubjs-react-native/file-system';

import { SignedInProps } from "../../navigation/SignedIn";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { colors, icons } from "../../assets/theme";
import SafeAreaBox from "../../components/SafeAreaBox";
import scaleSize from "../../assets/scale";

const BookReadEpubScreen = ({ navigation }: SignedInProps) => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { Appearance } = activeIcons;
    const styles = StyleSheet.create({
        body: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: activeColors.background
        },
        pdf: {
            flex: 1,
            backgroundColor: activeColors.background,
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        }
    });
    const { changeFontSize, changeFontFamily, changeTheme, } = useReader();

    useEffect(() => {
        // changeTheme(darkTheme);
        // changeFontSize('50px')
        changeFontSize('80px');
        changeFontFamily('GratoGrotesk-Regular');
    }, [])
    const body = {
        'body': {
            background: activeColors.background,
            fontFamily: 'GratoGrotesk-Regular',
            fontSize: '80px'
        },
        'p': {
            color: activeColors.text,
            fontFamily: 'GratoGrotesk-Regular',
            fontSize: '80px'
        },
        'h1': {
            color: activeColors.text,
            fontFamily: 'GratoGrotesk-Regular',
            fontSize: '80px'
        },
    };

    return (
        <SafeAreaBox ph={0}>
            <ReaderProvider>
                <Reader
                    src="https://altmshfkgudtjr.github.io/react-epub-viewer/files/Alices%20Adventures%20in%20Wonderland.epub"
                    width={Dimensions.get('window').width}
                    height={Dimensions.get('window').height - scaleSize(100)}
                    fileSystem={useFileSystem}
                    onDisplayError={(error) => {
                        console.log(error);
                    }}
                    onPress={() => {
                        console.log('Press enter to');
                    }}
                    // defaultTheme={body}
                />
            </ReaderProvider>
        </SafeAreaBox>
    );
}

export default BookReadEpubScreen;