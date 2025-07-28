import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';
import SettingsScreen from './SettingsScreen';
import { useTranslation } from 'react-i18next';
import * as reactRedux from 'react-redux';
import getTestId from '../../Config/helper';

jest.mock('react-i18next', () => ({
    useTranslation: jest.fn(),
}));

jest.mock('react-redux');

describe('SettingsScreen', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should load some items in the component', () => {
        const useTranslationSpy = useTranslation;
        const tSpy = jest.fn((str) => str);

        //@ts-ignore
        useTranslationSpy.mockReturnValue({
            t: tSpy,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        });

        //@ts-ignore
        reactRedux.useSelector.mockImplementation((cb: any) => cb({ themeReducer: { 'isDarkTheme': true } }));
        const { getByText } = render(<SettingsScreen />);

        expect(getByText('Dark')).toBeTruthy();

    });

    it('should be able to add new item', () => {
        const useTranslationSpy = useTranslation;
        const tSpy = jest.fn((str) => str);

        //@ts-ignore
        useTranslationSpy.mockReturnValue({
            t: tSpy,
            i18n: {
                changeLanguage: () => new Promise(() => { }),
            },
        });

        const dispatch = jest.fn();
        //@ts-ignore
        reactRedux.useDispatch.mockReturnValue(dispatch);

        const { getByText, getByTestId } = render(<SettingsScreen />);
        expect(getByText('logOut')).toBeTruthy();
        fireEvent.press(getByTestId(getTestId('switch-theme'))); // Assuming you have a testID for your submit button
        expect(dispatch).toBeCalledWith({ type: 'themSlice/changeThemAction', payload: false });
    });
});
