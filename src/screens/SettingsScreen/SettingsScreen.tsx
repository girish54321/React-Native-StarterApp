import React from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';
import { List, Switch } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { DARK_THEME_TYPE, themSlice } from '../../redux/themeStore/reducers';
import { authSlice } from '../../redux/authStore/authReducers';
import { AppView } from '../../components/Flex/Flex';
import LanguageSelector from '../../components/LanguageSelector';

const SettingsScreen = () => {
  const appDispatch = useDispatch();
  const data: DARK_THEME_TYPE = useSelector((state: any) => state.themeReducer);
  const { t } = useTranslation();
  const authDispatch = useDispatch();
  const toggleSwitch = (value: boolean) => {
    appDispatch(themSlice.actions.changeThemAction(value));
  };

  const removeUser = () => {
    Alert.alert(
      'Sing Out?',
      'Are your sure.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'yes',
          onPress: () => authDispatch(authSlice.actions.userLoginLogOutAction()),
        },
      ],
      { cancelable: false },
    );
  };

  const themIcon = (props: any) => <List.Icon {...props} icon="theme-light-dark" />;

  const switchIcon = () => <Switch value={data.isDarkTheme} onValueChange={toggleSwitch} />;

  const logOutIcon = (props: any) => <List.Icon {...props} icon="exit-to-app" />;

  return (
    <AppView>
      <View
        style={styles.container}>
        <LanguageSelector />
        <List.Item
          onPress={() => {
            appDispatch(themSlice.actions.changeThemAction(!data.isDarkTheme));
          }}
          title={t('darkLightMode')}
          description={t('changeAppTheme')}
          left={themIcon}
          right={switchIcon}
        />
        <List.Item
          onPress={removeUser}
          title={t('logOut')}
          description={t('singOut')}
          left={logOutIcon}
        />
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SettingsScreen;
