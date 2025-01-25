import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import SizedBox from '../../components/SizedBox';
import useLoginScreenModal from './useLoginScreenModal';

const windowHeight = Dimensions.get('screen').height;

const AppIconList = [
  {
    key: 'DEV',
    image: require('../../assets/icons/dev.png'),
  },
  {
    key: 'QA',
    image: require('../../assets/icons/qa.png'),
  },
  {
    key: 'PROD',
    image: require('../../assets/icons/prod.png'),
  },
];

const LoginScreen = () => {
  const { paperTheme,
    userData,
    saveUserLogin,
    textEmailChange,
    textPasswordChange,
    nativeData } = useLoginScreenModal();

  const imageFile = AppIconList.filter((item) => item.key === nativeData.BUILD_ENV);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.keyboardView}>
        <Card>
          <Card.Content>
            <Image source={imageFile[0].image}
              style={styles.imageStyle} />
            <Text >Running {nativeData?.BUILD_ENV}</Text>
            <Text >Your Base URL is {nativeData?.BASE_URL}</Text>
          </Card.Content>
        </Card>
        <SizedBox size={16} />
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          label="Email"
          autoCapitalize="none"
          mode="outlined"
          value={userData.email}
          left={<TextInput.Icon icon="gmail" />}
          placeholder="Email"
          onChangeText={textEmailChange}
        />
        <SizedBox size={16} />
        <TextInput
          style={{ backgroundColor: paperTheme.colors.background }}
          secureTextEntry={userData.secureTextEntry}
          label="Password"
          mode="outlined"
          placeholder="Password"
          autoCapitalize="none"
          left={<TextInput.Icon icon="key" />}
          value={userData.password}
          onChangeText={textPasswordChange}
        />
        <SizedBox size={16} />
        <Button
          mode="contained"
          onPress={() => saveUserLogin()}>
          Login
        </Button>
        <View />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 34,
  },
  imageStyle: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    borderRadius: 8,
    alignSelf: 'center',
  },
  keyboardView: { justifyContent: 'center', paddingHorizontal: 34, height: windowHeight / 1.5 },
});

export default LoginScreen;
