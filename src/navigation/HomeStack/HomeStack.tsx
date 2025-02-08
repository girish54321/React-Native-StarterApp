import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CustomNavigationBar } from '../../components/appAppBar/AppAppBar';
import { Route } from '../../constants/Route';
import { WelcomeScreen } from '../../screens/welcome/WelcomeScreen';

const HomeStack = createNativeStackNavigator();

export const HomeScreenStack = () => {
    const { t } = useTranslation();

    return (
        <HomeStack.Navigator
            screenOptions={{
                title: t('starterApp'),
                header: (props) => <CustomNavigationBar  {...props} />,
            }}
        >
            {/*
                //* react-native-reanimated Example in HomeScreen
            */}
            <HomeStack.Screen name={Route.WELCOME} component={WelcomeScreen} />
            {/*
                //* react-native-reanimated with in scrollable header
            */}
            {/* <Stack.Screen name={Route.WELCOME} component={HomeTabs} /> */}
        </HomeStack.Navigator>
    );
};
