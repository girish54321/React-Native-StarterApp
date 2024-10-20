import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../../screens/loginScreen/loginScreen';
import { Route } from '../../constants/Route';
const AuthStack = createNativeStackNavigator();

const AuthStackScreens = () => (
  <AuthStack.Navigator screenOptions={{
    headerShown: false
  }}>
    <AuthStack.Screen name={Route.LOGIN_SCREEN} component={LoginScreen} />
  </AuthStack.Navigator>
);

export default AuthStackScreens;
