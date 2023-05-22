import React, { useEffect } from 'react';
import { LogBox, SafeAreaView, StyleSheet, useColorScheme, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import SignedIn from './navigation/SignedIn';
import SignedOut from './navigation/SignedOut';
import { useAppSelector, useAppDispatch } from './redux/hooks';

import { RootState, store } from './redux/store';
import { Provider } from 'react-redux';
import SplashScreen from './screens/SplashScreen';

const Route = createStackNavigator();

function Body() {
    const token = useAppSelector((state) => state.auth.token);

    return (
        <NavigationContainer>
            <Route.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                {token ? (
                    <Route.Screen name={'SignedIn'} component={SignedIn} />
                ) : (
                    <Route.Screen name={'SignedOut'} component={SignedOut} />
                )}
            </Route.Navigator>
        </NavigationContainer>
    );

}
function App() {
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead. ']);
    }, [])
    return (
        <Provider store={store}>
            <Body />
        </Provider>
    );
}

export default App;
