import React, { FC } from 'react';
import { ButtonProps } from './ButtonProps';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export const AppButton: FC<ButtonProps> = props => {
    const { mode, children, style, onPress, uppercase } = props;
    return (
        <Button uppercase={uppercase} onPress={onPress} mode={mode}
            style={[styles.buttonStyle, style]}>
            {children}
        </Button>
    );
};


const styles = StyleSheet.create({
    buttonStyle: { borderRadius: 4, padding: 4 },
});
