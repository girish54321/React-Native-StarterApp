import React, { useState } from 'react';
import {
    NativeModules
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme, } from 'react-native-paper';
import { userLoginAction } from '../../redux/authStore/action';

export const defaultLoginScreenState = {
    email: '',
    password: '',
    secureTextEntry: true,
    isValidEmail: false,
    isValidPassword: false,
};

const useLoginScreenModal = () => {
    const paperTheme = useTheme();
    const [userData, setuserData] = useState(defaultLoginScreenState)

    const nativeData = NativeModules.RNConfigModule;

    const authDispatch = useDispatch();

    const saveUserLogin = () => {
        if (userData.isValidEmail && userData.isValidPassword) {
            let data = {
                email: "eve.holt@reqres.in",
                password: "cityslicka"
            };
            authDispatch(userLoginAction(data))
        } else {

        }
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
        nativeData
    }

}

export default useLoginScreenModal;