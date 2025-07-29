import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import SettingsScreen from './SettingsScreen';
import { useTranslation } from 'react-i18next';
import * as reactRedux from 'react-redux';
import getTestId from '../../Config/helper';
import { Alert } from 'react-native';

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

jest.mock('react-redux');

describe('SettingsScreen', () => {
    beforeEach(() => {
        const useTranslationSpy = useTranslation;
        const tSpy = jest.fn((str) => str);

        //@ts-ignore
        useTranslationSpy.mockReturnValue({
            t: tSpy,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load some items in the component', () => {
        //@ts-ignore
        reactRedux.useSelector.mockImplementation((cb: any) => cb({ themeReducer: { 'isDarkTheme': true } }));
        const { getByText } = render(<SettingsScreen />);

        expect(getByText('Dark')).toBeTruthy();
    });

    it('logs out the user when confirmed', async () => {
        const dispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);
        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
            const yesButton = buttons?.find((btn) => btn.text === 'yes');
            yesButton?.onPress?.();
        });

        const { getByText } = render(<SettingsScreen />);

        const logOutButton = getByText('logOut');
        expect(logOutButton).toBeTruthy();
        fireEvent.press(logOutButton);

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalledWith(
                'Sing Out?',
                'Are your sure.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                        isPreferred: true,
                        onPress: expect.any(Function),
                    },
                    {
                        text: 'yes',
                        onPress: expect.any(Function),
                    },
                ],
                { cancelable: false }
            );

            expect(dispatch).toHaveBeenCalledWith({
                type: 'authSlice/userLoginLogOutAction',
            });
        });
    });

    it('does NOT log out the user when "Cancel" is pressed', async () => {
        const dispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatch);

        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
            const cancelButton = buttons?.find((btn) => btn.text === 'Cancel');
            cancelButton?.onPress?.();
        });

        const { getByText } = render(<SettingsScreen />);

        fireEvent.press(getByText('logOut'));

        await waitFor(() => {
            expect(alertSpy).toHaveBeenCalled();
            expect(dispatch).not.toHaveBeenCalled();
        });
    });

    it('should be able chnage them', () => {
        const dispatch = jest.fn();
        //@ts-ignore
        reactRedux.useDispatch.mockReturnValue(dispatch);

        const { getByTestId } = render(<SettingsScreen />);
        fireEvent.press(getByTestId(getTestId('switch-theme')));
        expect(dispatch).toBeCalledWith({ type: 'themSlice/changeThemAction', payload: false });
    });
});
