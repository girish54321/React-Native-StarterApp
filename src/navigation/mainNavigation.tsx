import React, { FC, useEffect } from 'react';
import {
    NavigationContainer,
    DefaultTheme as NavigationDefaultTheme,
    DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import {
    Provider as PaperProvider,
    MD3LightTheme as PaperDefaultTheme,
    MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTopLevelNavigator } from './NavigationService';
import { AppBottomTab } from './appNavigation/AppNavigation';
import AuthStackScreens from './authStack/AuthStackScreens';
import { DARK_THEME_TYPE } from '../redux/themeStore/reducers';
import { checkTheme } from '../redux/themeStore/action';
import { authSlice } from '../redux/authStore/authReducers';
import LoadingView from '../components/loadingView';
import AppStatusBar from '../components/appStatusBar/appStatusBar';
import { APP_CONST, Colors } from '../Config/Colors';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';

export const Navigation: FC = () => {
    const data: DARK_THEME_TYPE = useAppSelector((state: any) => state.themeReducer);

    const authDispatch = useAppDispatch();
    const authState = useAppSelector((state: any) => state.authReducer);

    useEffect(() => {
        //@ts-ignore
        authDispatch(checkTheme());
        checkIfLoggedIn();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const checkIfLoggedIn = () => {
        AsyncStorage.getItem(APP_CONST.USER_LOGIN)
            .then((value) => {
                if (value) {
                    let data = JSON.parse(value);
                    authDispatch(authSlice.actions.checkUserLoginAction(data));
                } else {
                    authDispatch(authSlice.actions.checkUserLoginAction(null));
                }
            })
            .catch(() => {
                authDispatch(authSlice.actions.checkUserLoginAction(null));
            });
    };

    let CustomDefaultTheme = {
        ...PaperDefaultTheme,
        ...NavigationDefaultTheme,
        colors: {
            ...PaperDefaultTheme.colors,
            ...NavigationDefaultTheme.colors,
            accent: Colors.primary,
            primary: Colors.primary,
            card: 'rgb(255, 255, 255)',
            // background: '#ffffff',
            text: '#000000',
        },
    };

    let CustomDarkTheme = {
        ...PaperDarkTheme,
        ...NavigationDarkTheme,
        colors: {
            ...PaperDarkTheme.colors,
            ...NavigationDarkTheme.colors,
            accent: Colors.primary,
            primary: Colors.primary,
            card: 'rgb(18, 18, 18)',
            background: '#000000',
            text: '#ffffff',
        },
    };

    if (authState.isLoading) {
        return <LoadingView />;
    }

    return (
        <PaperProvider
            theme={{
                dark: data.isDarkTheme,
                colors: data.isDarkTheme ? CustomDarkTheme.colors : CustomDefaultTheme.colors,
            }}
        >
            <AppStatusBar isDarkTheme={data.isDarkTheme} />
            <NavigationContainer
                ref={(navigatorRef: any) => {
                    setTopLevelNavigator(navigatorRef);
                }}
                theme={data.isDarkTheme ? CustomDarkTheme : CustomDefaultTheme}
            >
                {authState.userLoggedIn ? (
                    <AppBottomTab />
                ) : (
                    <AuthStackScreens />
                )}
            </NavigationContainer>
        </PaperProvider>
    );
};
