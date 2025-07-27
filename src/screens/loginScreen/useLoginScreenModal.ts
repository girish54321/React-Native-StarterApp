import { useState } from 'react';
import {
    Alert,
    NativeModules,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useUserLogin } from '../../Network/Querys/useLoginMutaion';
import { authSlice } from '../../redux/authStore/authReducers';

export const defaultLoginScreenState = {
    email: '',
    password: '',
    secureTextEntry: true,
    isValidEmail: false,
    isValidPassword: false,
};

const useLoginScreenModal = () => {
    const paperTheme = useTheme();
    const [userData, setuserData] = useState(defaultLoginScreenState);

    const nativeData = NativeModules.RNConfigModule;

    const authDispatch = useDispatch();
    const { mutate } = useUserLogin();

    const saveUserLogin = async () => {
        let postData = {
            email: userData.email,
            password: userData.password,
        };
        mutate({ postData: postData }, {
            onSuccess: (data, _variables, _context) => {
                authDispatch(authSlice.actions.userLoginAction({
                    isLoading: false,
                    userLoggedIn: true,
                    userName: postData.email,
                    email: postData.email,
                    token: data.data.token,
                }));
            },
            onError: (apiError, _variables, _context) => {
                Alert.alert(
                    'Login Failed', `${apiError}`);
            },
            onSettled: (_data, _error, _variables, _context) => {
                console.log('On Settled');
            },
        });

    };

    const textEmailChange = (val: any) => {
        setuserData({
            ...userData,
            email: val.trim(),
            isValidEmail: true,
        });
    };

    const textPasswordChange = (val: any) => {
        if (val.trim().length >= 8) {
            setuserData({
                ...userData,
                password: val,
                isValidPassword: true,
            });
        } else {
            setuserData({
                ...userData,
                password: val,
                isValidPassword: false,
            });
        }
    };

    return {
        paperTheme,
        userData,
        saveUserLogin,
        textEmailChange,
        textPasswordChange,
        nativeData,
    };
};

export default useLoginScreenModal;
