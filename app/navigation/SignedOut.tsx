import { StackNavigationProp } from "@react-navigation/stack";
import LoginScreen from "../screens/signedOutScreens/LoginScreen";

import { createNativeStackNavigator } from '@react-navigation/native-stack';

type RootStackParamList = {
    LoginScreen: undefined;
};
type LoginScreenNavigationProps = StackNavigationProp<
    RootStackParamList,
    //@ts-ignore
    'RegisterScreen'
>;
export type SignedOutProps = {
    navigation:
    | LoginScreenNavigationProps
};

export default function SignedOut() {
    const SignedOut = createNativeStackNavigator();

    return (
        <SignedOut.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
            })}
        >
            <SignedOut.Screen name="Login" component={LoginScreen} />
        </SignedOut.Navigator>
    );
}