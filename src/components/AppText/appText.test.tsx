import React from 'react';
import { describe, expect, it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import MyComponent from './AppText';

describe('AppText', () => {
    it('Check text on scree', () => {
        const item = render(<MyComponent />);

        const largeTitle = item.getByText('Title Large');
        expect(largeTitle).toBeTruthy();
    });
});



