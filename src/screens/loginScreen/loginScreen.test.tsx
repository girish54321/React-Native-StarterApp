import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useMutation } from '@tanstack/react-query';
import LoginScreen from './loginScreen';
import { Alert } from 'react-native';
import getTestId from '../../Config/helper';
import * as reactRedux from 'react-redux';

describe('UsersScreen', () => {
    beforeEach(() => {
        (useMutation as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('render view with testIds', () => {
        const { getByTestId } = render(<LoginScreen />);

        expect(getByTestId(getTestId('login-email'))).toBeTruthy();
        expect(getByTestId(getTestId('login-password'))).toBeTruthy();
        expect(getByTestId(getTestId('login-button'))).toBeTruthy();
    });

    it('handles login success', async () => {
        const apiResponse = { data: { token: 'fake-token' } };

        const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
        const mockDispatchFn = jest.fn();
        useDispatchMock.mockReturnValue(mockDispatchFn);

        const mutate = jest.fn((vars, { onSuccess }) => {
            onSuccess(apiResponse, vars, undefined);
        });

        (useMutation as jest.Mock).mockReturnValue({
            mutate,
            onSuccess: jest.fn(),
            onError: jest.fn(),
            onSettled: jest.fn(),
        });

        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

        const { getByText } = render(
            <LoginScreen />
        );

        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(mutate).toHaveBeenCalled();

            expect(mockDispatchFn).toHaveBeenCalledTimes(1);
            expect(mockDispatchFn).toHaveBeenCalledWith(
                expect.objectContaining({
                    payload: {
                        userLoggedIn: true,
                        isLoading: false,
                        userName: '',
                        email: '',
                        token: 'fake-token',
                    },
                    type: 'authSlice/userLoginAction',
                })
            );

            expect(alertSpy).not.toHaveBeenCalled();
        });
    });


    it('handles login button press', async () => {
        const mutate = jest.fn();

        (useMutation as jest.Mock).mockReturnValue({
            mutate,
            onError: jest.fn(),
        });
        const { getByText } = render(<LoginScreen />);
        const loginButton = getByText('Login');
        fireEvent.press(loginButton);

        await waitFor(() => {
            const [vars] = mutate.mock.calls[0];
            expect(vars).toEqual({
                postData: { email: '', password: '' },
            });
        });
    });

    it('Login with invalid credentials error', async () => {
        const apiError = 'Invalid credentials';

        const mutate = jest.fn((_vars, { onError }) => {
            onError(apiError, _vars, undefined);
        });

        (useMutation as jest.Mock).mockReturnValue({
            mutate,
            onSuccess: jest.fn(),
            onError: jest.fn(),
            onSettled: jest.fn(),
        });

        const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(jest.fn());

        const { getByText } = render(<LoginScreen />);
        fireEvent.press(getByText('Login'));

        await waitFor(() => {
            expect(mutate).toHaveBeenCalled();
            const [vars] = mutate.mock.calls[0];
            expect(vars).toEqual({
                postData: { email: '', password: '' },
            });
            expect(alertSpy).toHaveBeenCalledWith('Login Failed', apiError);
        });
    });
});
