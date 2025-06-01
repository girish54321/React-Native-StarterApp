import React from 'react';
import {
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
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
      style={styles.container}>
      <View
        style={styles.container} />
      <View style={styles.inputView}>
        <TouchableOpacity
          style={styles.configView}>
          <Text >Running {nativeData?.BUILD_ENV}</Text>
          <View style={styles.baseUrlView} />
          <Text >Your Base URL is {nativeData?.BASE_URL}</Text>
        </TouchableOpacity>
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          label="Email"
          autoCapitalize="none"
          value={userData.email}
          placeholder="Email"
          onChangeText={textEmailChange}
        />
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          secureTextEntry={userData.secureTextEntry}
          label="Password"
          placeholder="Password"
          autoCapitalize="none"
          value={userData.password}
          onChangeText={textPasswordChange}

        />
        <SizedBox size={16} />
        <Button
          mode="contained"
          onPress={() => saveUserLogin()}>
          Login
        </Button>
      </View>
      <View style={styles.fOne} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  fOne: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 34,
    justifyContent: 'center',
  },
  inputView: { flex: 1, marginHorizontal: 22 },
  input: {
    width: '100%',
    marginBottom: 16,
  },
  baseUrlView: { marginTop: 8 },
  configView: { justifyContent: 'center', alignContent: 'center', alignItems: 'center', flex: 1 },
  button: {
    marginTop: 16,
  },
});

export default LoginScreen;
