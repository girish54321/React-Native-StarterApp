import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { useMutation } from '@tanstack/react-query';
import LoginScreen from './loginScreen';
import { Alert } from 'react-native';
import getTestId from '../../Config/helper';
import { useDispatch } from 'react-redux';
import * as reactRedux from 'react-redux';


describe('UsersScreen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('loginScreen renders correctly', () => {
        (useMutation as jest.Mock).mockReturnValue({
            mutate: jest.fn(),
        });
        const { getByText } = render(<LoginScreen />);
        expect(getByText('Login')).toBeTruthy();
    });

    it('login user with right password', async () => {
        const mutate = jest.fn();
        const successRes = {
            data: {
                data: {
                    token: 'token',
                },
            },
        };
        const mockDispatch = jest.fn();
        //@ts-ignore
        useDispatch.mockReturnValue(mockDispatch);

        const onSuccessMock = jest.fn((_vars, { onSuccess }) => {
            onSuccess(successRes, _vars, undefined);
        });
        (useMutation as jest.Mock).mockReturnValue({
            mutate,
            onSuccess: onSuccessMock,
        });

        const { getByTestId } = render(<LoginScreen />);

        const emailInput = getByTestId(getTestId('login-email'));
        const passwordInput = getByTestId(getTestId('login-password'));

        fireEvent.changeText(emailInput, 'eve.holt@reqres.in');
        fireEvent.changeText(passwordInput, 'cityslicka');

        const loginButton = getByTestId(getTestId('login-button'));
        fireEvent.press(loginButton);

        await waitFor(() => {
            const [vars] = mutate.mock.calls[0];
            expect(vars).toEqual({
                postData: { email: 'eve.holt@reqres.in', password: 'cityslicka' },
            });
            // expect(onSuccessMock).toHaveBeenCalledTimes(1);
        });

        // expect(mockDispatch).toHaveBeenCalledTimes(1);
    });



    it('handles login success', async () => {
        const apiResponse = { data: { token: 'fake-token' } };
        // const authDispatch = jest.fn(); // however you inject/mock it
        const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
        const mockDispatchFn = jest.fn();
        useDispatchMock.mockReturnValue(mockDispatchFn);
        // make mutate synchronously invoke onSuccess with your fake data
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
            // mutate was called with the expected variables
            expect(mutate).toHaveBeenCalled();
            expect(mockDispatchFn).toHaveBeenCalledTimes(1);
            // your success-side effects happened
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

            // no alert on success
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

    it('shows alert on error', async () => {
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
