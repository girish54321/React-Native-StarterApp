// import React from 'react';
// import { render, fireEvent } from '@testing-library/react-native';

// import 'react-native';
import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { UsersScreen } from './UsersScreen';
import { render } from '@testing-library/react-native';
import { useInfiniteQuery } from '@tanstack/react-query';


describe('UsersScreen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('renders correctly', () => {
        //@ts-ignore
        useInfiniteQuery.mockReturnValue({
            data: {
                pages: [
                    {
                        data: {
                            data: [
                                { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com' },
                                { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com' },
                            ],
                        },
                    },
                ],
            },
        });
        const { getByText } = render(<UsersScreen />);
        expect(getByText('john.doe@example.com')).toBeTruthy();
    });



    // it('handles user selection', () => {
    //     const { getByTestId } = render(<UsersScreen />);
    //     const userItem = getByTestId('user-item-1'); // Assuming user items have testID like 'user-item-1'
    //     fireEvent.press(userItem);
    //     expect(getByTestId('user-details')).toBeTruthy(); // Assuming user details are displayed on selection
    // });
});
