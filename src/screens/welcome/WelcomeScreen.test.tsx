import React from 'react';
import { describe, expect } from '@jest/globals';
import { WelcomeScreen } from './WelcomeScreen';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';


describe('test welcome Screen', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Render screen', () => {
        const { getByText } = render(<WelcomeScreen />);
        const welcomeText = getByText('React Native Starter');
        const homePageTest = getByText('homePage NS: Welcome to i18Next!');
        const defaultTest = getByText('Default NS: OK');
        expect(welcomeText).toBeTruthy();
        expect(homePageTest).toBeTruthy();
        expect(defaultTest).toBeTruthy();
    });
});
