import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, useColorScheme, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../../redux/auth/actions';
import { colors, icons } from '../../assets/theme';
import SafeAreaBox from '../../components/SafeAreaBox';
import scaleSize from '../../assets/scale';
import mainStyles from '../../assets/mainStyles';
import Input from '../../components/Input';
import { KeyboardTypes } from '../../helpers/componentsTypes';
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';
import ButtonText from '../../components/ButtonText';
import { SignedOutProps } from '../../navigation/SignedOut';
import ButtonIcon from '../../components/ButtonIcon';

const { width } = Dimensions.get('screen');
const buttonWidth = (width - scaleSize(24 * 2) - scaleSize(16 * 2)) / 3;

function LoginScreen({ navigation }: SignedOutProps): JSX.Element {
    const dispatch = useAppDispatch();
    const { theme } = useAppSelector(state => state.theme);
    console.log(theme);
    
    const activeIcons = icons[theme];
    const activeColors = colors[theme];
    const { Logo, FingerPrint, FaceID, Google, Facebook, Twitter } = activeIcons;

    const [isLoading, setLoading] = useState(false);
    const [username, setUsername] = useState('99817934'); // 99817934 
    const [password, setPassword] = useState('Monnomadmin'); // Monnomadmin
    const [rememberMe, setRememberMe] = useState(false);
    const [formError, setFormError] = useState<boolean>(false);

    function onPressLogin() {
        setLoading(true);
        dispatch(loginRequest({ username: username, password: password }));
        setLoading(false);
    }
    const styles = StyleSheet.create({
        wrapper: {
            flex: 1,
        },
        container: {
            backgroundColor: activeColors.background,
        },
        body: {
            flex: 1,
            justifyContent: 'center',
        },
        logo: {
            margin: scaleSize(24),
            height: scaleSize(120),
            width: scaleSize(120),
            alignSelf: 'center',
        },
        font16: {
            ...mainStyles.font16_bold,
            marginLeft: scaleSize(8),
            marginVertical: scaleSize(8),
            fontWeight: '600',
            color: activeColors.text,
        },
        font14: {
            ...mainStyles.font14_500,
            marginLeft: scaleSize(8),
            marginVertical: scaleSize(8),
            fontWeight: '400',
            color: activeColors.text,
            alignSelf: 'center',
            marginTop: scaleSize(32),
            marginBottom: scaleSize(20),
        },
        font14_bottom: {
            ...mainStyles.font14_500,
            marginLeft: scaleSize(8),
            marginVertical: scaleSize(8),
            fontWeight: '400',
            color: activeColors.text,
            alignSelf: 'center',
        },
        bottomContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        footer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: scaleSize(12),
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: scaleSize(12),
        },
    });
    return (
        <SafeAreaBox >
            <View style={styles.body}>
                <Logo style={styles.logo} />
                <Text style={styles.font16}>{'Login to Your Account'}</Text>
                <Input
                    placeholder="Username"
                    value={username}
                    validation={{ isRequired: true }}
                    setFormError={setFormError}
                    onChangeText={value => {
                        setUsername(value);
                    }}
                />
                <Input
                    placeholder="Password"
                    keyboardType={KeyboardTypes.PASSWORD}
                    value={password}
                    validation={{ isRequired: true, minLength: 5 }}
                    setFormError={setFormError}
                    onChangeText={value => {
                        setPassword(value);
                    }}
                />
                <CheckBox
                    value={rememberMe}
                    text="Remember me"
                    onPress={() => {
                        setRememberMe(!rememberMe);
                    }}
                />
                <Button
                    title="Login"
                    disabled={formError}
                    onPress={() => {
                        onPressLogin();
                    }} />
                <ButtonText
                    position="end"
                    text="Forget Password ?"
                    onPress={() => {
                        // navigation.navigate('ForgetPasswordScreen');
                    }}
                />
                <Text style={styles.font14}> {'Or login with'}</Text>
                <View style={styles.bottomContainer}>
                    <ButtonIcon width={buttonWidth} Icon={Google} onPress={() => { }} />
                    <ButtonIcon width={buttonWidth} Icon={Facebook} onPress={() => { }} />
                    <ButtonIcon width={buttonWidth} Icon={Twitter} onPress={() => { }} />
                </View>
                <View style={styles.footer}>
                    <Text style={styles.font14_bottom}>
                        {'Don’t have an accoun’t ?'}
                    </Text>
                    <ButtonText
                        text="Register"
                        onPress={() => {
                            // navigation.navigate('RegisterScreen');
                        }}
                    />
                </View>
            </View>
        </SafeAreaBox>);
}

const styles = StyleSheet.create({

});

export default LoginScreen;
