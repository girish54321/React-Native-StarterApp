import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { CommonActions } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import AppLoaderModal from '../../components/appLoaderModal/AppLoaderModal';
import { Route } from '../../constants/Route';
import { HomeScreenStack } from '../HomeStack/HomeStack';
import { UsersListStack } from '../UsersListStack/UsersListStack';
import { SettingScreenStack } from '../SettingScreenStack/SettingScreenStack';

const Tab = createBottomTabNavigator();

export const AppBottomTab = () => {
    const { t } = useTranslation();

    return (
        <>
            <AppLoaderModal />
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                }}
                tabBar={({ navigation, state, descriptors, insets }) => (
                    <BottomNavigation.Bar
                        navigationState={state}
                        safeAreaInsets={insets}
                        onTabPress={({ route, preventDefault }) => {
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });
                            if (event.defaultPrevented) {
                                preventDefault();
                            } else {
                                navigation.dispatch({
                                    ...CommonActions.navigate(route.name, route.params),
                                    target: state.key,
                                });
                            }
                        }}
                        renderIcon={({ route, focused, color }) => {
                            const { options } = descriptors[route.key];
                            if (options.tabBarIcon) {
                                return options.tabBarIcon({ focused, color, size: 24 });
                            }
                            return null;
                        }}
                        getLabelText={({ route }) => {
                            const { options } = descriptors[route.key];
                            const label =
                                options.tabBarLabel !== undefined
                                    ? options.tabBarLabel
                                    : options.title !== undefined
                                        ? options.title
                                        : route?.title;

                            return label;
                        }}
                    />
                )}
            >
                <Tab.Screen name={Route.APPSTACK} component={HomeScreenStack}
                    options={{
                        tabBarLabel: t('home'),
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name="home" size={size} color={color} />;
                        },
                    }}
                />
                <Tab.Screen name={Route.USERSCREEN_TAB} component={UsersListStack}
                    options={{
                        tabBarLabel: t('users'),
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name="person" size={size} color={color} />;
                        },
                    }}
                />
                <Tab.Screen name={Route.SETTINGS_TAB} component={SettingScreenStack}
                    options={{
                        tabBarLabel: t('settings'),
                        tabBarIcon: ({ color, size }) => {
                            return <Ionicons name="settings" size={size} color={color} />;
                        },
                    }}
                />
            </Tab.Navigator>
        </>
    );
};
