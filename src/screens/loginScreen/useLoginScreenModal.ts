import { useState } from 'react';
import {
    Alert,
    NativeModules,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { useUserLogin } from '../../Network/Querys/useLoginMutaion';
import { authSlice } from '../../redux/authStore/authReducers';
import notifee, { AndroidImportance } from '@notifee/react-native';

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
    const { mutate, isError, error } = useUserLogin();
    console.log({ isError, error });

    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        await notifee.requestPermission();

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
        });

        notifee.displayNotification({
            title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
            subtitle: '&#129395;',
            body:
                'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
            android: {
                channelId,
                color: '#4caf50',
                actions: [
                    {
                        title: '<b>Dance</b> &#128111;',
                        pressAction: { id: 'dance' },
                    },
                    {
                        title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
                        pressAction: { id: 'cry' },
                    },
                ],
            },
        });
    }

    const saveUserLogin = async () => {
        let postData = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
        };
        console.log('Api call');
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
                console.log('On Error');
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
        onDisplayNotification,
    };

};

export default useLoginScreenModal;
