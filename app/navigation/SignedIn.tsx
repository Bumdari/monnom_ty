import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';

import scaleSize from '../assets/scale';
import { useAppSelector } from '../redux/hooks';
import { colors, icons } from '../assets/theme';

import LibraryScreen from '../screens/signedInScreens/LibraryScreen';
import HomeScreen from '../screens/signedInScreens/HomeScreen';
import SettingsScreen from '../screens/signedInScreens/SettingScreen';
import SearchScreen from '../screens/signedInScreens/SearchScreen';
import BookDetailScreen from '../screens/signedInScreens/BookDetailScreen';
import BookReadScreen from '../screens/signedInScreens/BookReadPdfScreen';
import BookReadEpubScreen from '../screens/signedInScreens/BookReadEpubScreen';

const Tab = createBottomTabNavigator();
const SignedInStack = createNativeStackNavigator();

type RootStackParamList = {
    HomeScreen: undefined;
    LibraryScreen: undefined;
    SettingsScreen: undefined;
    SearchScreen: undefined;
    BookDetailScreen: undefined;
    BookReadScreen: undefined;
};

type HomeScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    'HomeScreen'
>;
type LibraryScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    'LibraryScreen'
>;
type SettingsScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    'SettingsScreen'
>;
type SearchScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    'SearchScreen'
>;
type BookDetailScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    'BookDetailScreen'
>;
type BookReadScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    'BookReadScreen'
>;
export type SignedInProps = {
    navigation:
    | HomeScreenNavigationProps
    | LibraryScreenNavigationProps
    | SettingsScreenNavigationProps
    | SearchScreenNavigationProps
    | BookDetailScreenNavigationProps
    | BookReadScreenNavigationProps;
};
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={({ route }) => ({
            headerShown: false,
        })}>
            <Stack.Screen name="Home" component={HomeScreen} />
            {/* @ts-ignore */}
            <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        </Stack.Navigator>
    );
}

function BottomTabbar() {
    const { theme } = useAppSelector(state => state.theme);
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { Home, HomeActive, SearchActive, Search, Document, DocumentActive } = activeIcons;
    const styles = StyleSheet.create({
        iconBox: {
            marginTop: scaleSize(6),
            alignItems: 'center',
            justifyContent: 'space-between',
            height: scaleSize(41)
        },
        font_10: {
            fontSize: scaleSize(10),
            lineHeight: scaleSize(15),
            fontFamily: 'GratoGrotesk-Medium',
            fontWeight: '500'
        },
    });
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: activeColors.background
                }
            })}>
            <Tab.Screen
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        const text = {
                            ...styles.font_10,
                            color: focused ? activeColors.activeColor : activeColors.disActiveColor
                        }
                        return (
                            <View style={styles.iconBox}>
                                {focused ?
                                    <HomeActive />
                                    :
                                    <Home />}

                                <Text style={text}>{'Home'}</Text>
                            </View >
                        );
                    },

                }}
                name="HomeMain"
                component={HomeStack}
            />
            <Tab.Screen
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        const text = {
                            ...styles.font_10,
                            color: focused ? activeColors.activeColor : activeColors.disActiveColor
                        }
                        return (
                            <View style={styles.iconBox}>
                                {focused ?
                                    <SearchActive />
                                    :
                                    <Search />
                                }
                                <Text style={text}>{'Search'}</Text>
                            </View >
                        );
                    },

                }}
                name="Search"
                component={SearchScreen}
            />
            <Tab.Screen
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) => {
                        const text = {
                            ...styles.font_10,
                            color: focused ? activeColors.activeColor : activeColors.disActiveColor
                        }
                        return (
                            <View style={styles.iconBox}>
                                {focused ?
                                    <DocumentActive />
                                    :
                                    <Document />}
                                <Text style={text}>{'Library'}</Text>
                            </View >
                        );
                    },

                }}
                name="Library"
                component={LibraryScreen}
            />
        </Tab.Navigator>
    );
}

export default function SignedIn() {
    return (
        <SignedInStack.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
        >
            <SignedInStack.Screen name="Tabbar" component={BottomTabbar} />
            <SignedInStack.Screen name="Settings" component={SettingsScreen} />
            <SignedInStack.Screen name="BookReadEpub" component={BookReadEpubScreen} />
            <SignedInStack.Screen name="BookReadPdf" component={BookReadScreen} />

            {/* @ts-ignore */}
            {/* <SignedInStack.Screen name="BookDetail" component={BookDetailScreen} /> */}
        </SignedInStack.Navigator>
    );
}