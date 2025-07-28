import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import { SelectedUserScreen } from './SelectedUser';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'), // Import and retain default exports
    useRoute: jest.fn(),
    useNavigation: jest.fn(() => ({
        setOptions: jest.fn(),
    })),
}));

describe('UsersScreen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders with specific params', () => {
        //@ts-ignore
        useRoute.mockReturnValue({
            params: {
                data: {
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                },
            },
        });

        const { getByText } = render(<SelectedUserScreen />);
        expect(getByText('john.doe@example.com')).toBeTruthy();
    });

    it('should call setOptions when a certain action occurs', () => {
        const mockSetOptions = jest.fn();
        (useNavigation as jest.Mock).mockReturnValue({
            setOptions: mockSetOptions,
        });
        //@ts-ignore
        useRoute.mockReturnValue({
            params: {
                data: {
                    first_name: 'John',
                    last_name: 'Doe',
                    email: 'john.doe@example.com',
                },
            },
        });
        render(<SelectedUserScreen />);

        expect(mockSetOptions).toHaveBeenCalledTimes(1);
        expect(mockSetOptions).toHaveBeenCalledWith(
            { title: `John Doe` }
        );
    });
});
