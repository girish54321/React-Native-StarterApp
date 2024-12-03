import React, { useState } from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  NativeModules,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { useDispatch } from 'react-redux';
import { TextInput, Button, useTheme, } from 'react-native-paper';
import { userLoginAction } from '../../redux/authStore/action';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import SizedBox from '../../components/SizedBox';
import useLoginScreenModal from './useLoginScreenModal';

const LoginScreen = () => {
  const { paperTheme,
    userData,
    saveUserLogin,
    textEmailChange,
    textPasswordChange,
    nativeData } = useLoginScreenModal();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        paddingHorizontal: 34,
        justifyContent: 'center',
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
      </View>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 }}>
          <Text >Running {nativeData?.BUILD_ENV}</Text>
          <View style={{ marginTop: 8 }} />
          <Text >Your Base URL is {nativeData?.BASE_URL}</Text>
        </TouchableOpacity>
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          label="Email"
          autoCapitalize="none"
          value={userData.email}
          placeholder="Email"
          onChangeText={textEmailChange}
          right={
            <TextInput.Icon
              name={'email'}
              color={userData.isValidEmail ? Colors.primary : 'gray'}
            />
          }
        />
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          secureTextEntry={userData.secureTextEntry}
          label="Password"
          placeholder="Password"
          autoCapitalize="none"
          value={userData.password}
          onChangeText={textPasswordChange}
          right={
            <TextInput.Icon
              name={'key'}
              color={userData.isValidPassword ? Colors.primary : 'gray'}
            />
          }
        />
        <SizedBox size={16} />
        <Button
          mode="contained"
          contentStyle={{ height: 50 }}
          onPress={() => saveUserLogin()}>
          Login
        </Button>
      </View>
      <View style={{ flex: 1 }}></View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
