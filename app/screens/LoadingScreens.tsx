import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { colors, icons } from "../assets/theme";
import React from "react";
//@ts-ignore
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import Svg, { Circle, Rect } from 'react-native-svg'
import scaleSize from "../assets/scale";

const { width, height } = Dimensions.get('screen');

const LoadingScreen = ({ isLoading, pageName }: { isLoading: boolean, pageName: String }) => {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { Appearance } = activeIcons;

    const styles = StyleSheet.create({
        body: {
            marginLeft: scaleSize(16),
            marginTop: scaleSize(100),
            position: 'absolute',
            backgroundColor: activeColors.background,
            zIndex: 999
        },
        bookDetailBody: {
            padding: scaleSize(16),
            position: 'absolute',
            backgroundColor: activeColors.background,
            zIndex: 999
        }
    });

    if (isLoading && pageName == 'HomePage') {
        return (
            <View style={styles.body}>
                <SvgAnimatedLinearGradient
                    primaryColor={activeColors.loadingColor}
                    secondaryColor={activeColors.loadinMainColor}
                    height={height}
                    width={width}
                >
                    <Rect x="0" y="0" rx="8" ry="8" width="90" height="24" />
                    <Rect x="0" y="40" rx="12" ry="12" width="55" height="40" />
                    <Rect x="65" y="40" rx="12" ry="12" width="102" height="40" />
                    <Rect x="182" y="40" rx="12" ry="12" width="102" height="40" />
                    <Rect x="300" y="40" rx="12" ry="12" width="102" height="40" />

                    <Rect x="0" y="110" rx="8" ry="8" width="90" height="24" />
                    <Rect x="0" y="152" rx="12" ry="12" width="200" height="300" />
                    <Rect x="220" y="152" rx="12" ry="12" width="200" height="300" />

                    <Rect x="0" y="480" rx="8" ry="8" width="90" height="24" />
                    <Rect x="0" y="525" rx="12" ry="12" width="315" height="144" />
                    <Rect x="335" y="525" rx="12" ry="12" width="315" height="144" />

                </SvgAnimatedLinearGradient>
            </View>
        );
    }
    if (isLoading && pageName == 'BookDetail') {
        return (
            <View style={styles.bookDetailBody}>
                <SvgAnimatedLinearGradient
                    primaryColor={activeColors.loadingColor}
                    secondaryColor={activeColors.loadinMainColor}
                    height={height}
                    width={width}
                >
                    <Rect x={(width - 260 - scaleSize(16 * 2)) / 2} y={scaleSize(20)} rx="5" ry="5" width={scaleSize(260)} height={scaleSize(260)} />
                    <Rect x={scaleSize(20)} y={scaleSize(320)} rx="5" ry="5" width={width - scaleSize(36 * 2) - 20} height={scaleSize(30)} />
                    <Rect x={scaleSize(20)} y={scaleSize(360)} rx="5" ry="5" width={scaleSize(92)} height={scaleSize(24)} />
                    <Rect x={scaleSize(20)} y={scaleSize(400)} rx="5" ry="5" width={scaleSize(170)} height={scaleSize(28)} />
                    <Rect x={scaleSize(20)} y={scaleSize(448)} rx="15" ry="15" width={scaleSize(80)} height={scaleSize(26)} />
                    <Rect x={scaleSize(110)} y={scaleSize(448)} rx="15" ry="15" width={scaleSize(80)} height={scaleSize(26)} />
                    <Rect x={scaleSize(200)} y={scaleSize(448)} rx="15" ry="15" width={scaleSize(80)} height={scaleSize(26)} />
                    <Rect x={scaleSize(20)} y={scaleSize(510)} rx="5" ry="5" width={(width - scaleSize(40 * 2)) / 2} height={scaleSize(53)} />
                    <Rect x={((width - scaleSize(40 * 2)) / 2) + scaleSize(35)} y={scaleSize(510)} rx="5" ry="5" width={(width - scaleSize(40 * 2)) / 2} height={scaleSize(53)} />
                    <Rect x={scaleSize(20)} y={scaleSize(600)} rx="5" ry="5" width={scaleSize(71)} height={scaleSize(21)} />
                    <Rect x={scaleSize(20)} y={scaleSize(640)} rx="5" ry="5" width={width - scaleSize(36 * 2)} height={scaleSize(13)} />
                    <Rect x={scaleSize(20)} y={scaleSize(660)} rx="5" ry="5" width={width - scaleSize(30 * 2)} height={scaleSize(13)} />
                </SvgAnimatedLinearGradient>
            </View>
        );
    }
    return null;
}

export default LoadingScreen;