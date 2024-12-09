import { useState } from 'react';
import {
    NativeModules
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme, } from 'react-native-paper';
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
    const [userData, setuserData] = useState(defaultLoginScreenState)

    const nativeData = NativeModules.RNConfigModule;

    const authDispatch = useDispatch();
    const { mutateAsync, mutate, isError, error } = useUserLogin()
    console.log({ isError, error });

    const saveUserLogin = async () => {
        let postData = {
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        };
        console.log("Api call");
        mutate({ postData: postData }, {
            onSuccess: (data, variables, context) => {
                authDispatch(authSlice.actions.userLoginAction({
                    isLoading: false,
                    userLoggedIn: true,
                    userName: postData.email,
                    email: postData.email,
                    token: data.data.token,
                }));
            },
            onError: (error, variables, context) => {
                console.log("On Error");
            },
            onSettled: (data, error, variables, context) => {
                console.log("On Settled");
            },
        })

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