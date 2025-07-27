// import 'react-native';
import React from 'react';
import { describe, expect } from '@jest/globals';
import { WelcomeScreen } from './WelcomeScreen';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';

describe('test welcome Screen', () => {
    it('Render screen', () => {
        const item = render(<WelcomeScreen />);
        expect(item).toBeTruthy();
        const welcomeText = item.getByTestId('home-page-test');
        expect(welcomeText).toBeTruthy();
    });
});
