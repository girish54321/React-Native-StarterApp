import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/loginScreen/loginScreen';
import { Route } from '../../constants/Route';
import { CustomNavigationBar } from '../../components/appAppBar/AppAppBar';
const AuthStack = createNativeStackNavigator();

const AuthStackScreens = () => (
  <AuthStack.Navigator
    screenOptions={{
      title: 'Login',
      header: (props) => <CustomNavigationBar  {...props} />,
    }}
  >
    <AuthStack.Screen name={Route.LOGIN_SCREEN} component={LoginScreen} />
  </AuthStack.Navigator>
);

export default AuthStackScreens;
