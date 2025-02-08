import React from 'react';
import { StyleSheet } from 'react-native';
import { AppView, Column } from '../../components/Flex/Flex';
import { useTranslation } from 'react-i18next';
import { AppButton } from '../../components/Button/Button';
import { Text } from 'react-native-paper';
export const WelcomeScreen = () => {
    const { t } = useTranslation();
    return (
        <AppView>
            <Column alignItems='center' justifyContent='center' style={[style.container,]}>
                <Text testID='home-page-test'>homePage NS: {t('homePage:welcome')}</Text>
                <Text>Default NS: {t('ok')}</Text>
                <AppButton
                    onPress={() => {
                        console.log('React Native');
                    }}>
                    <Text>React Native Starter</Text>
                </AppButton>
            </Column>
            {/* </Animated.View> */}
        </AppView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
});
