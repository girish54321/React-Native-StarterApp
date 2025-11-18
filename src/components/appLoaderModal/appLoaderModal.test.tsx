import React from 'react';
import { describe, expect } from '@jest/globals';
import { it } from '@jest/globals';
import { render } from '@testing-library/react-native';
import getTestId from '../../Config/helper';
import * as reactRedux from 'react-redux';
import AppLoaderModal from './AppLoaderModal';
jest.mock('react-redux');

describe('Loading View', () => {

    it('render loading when it true', () => {
        //@ts-ignore
        reactRedux.useSelector.mockImplementation((cb: any) => cb({ appReducers: { isLoading: true } }));
        const item = render(<AppLoaderModal />);

        expect(item.getByTestId(getTestId('loader-modal'))).toBeTruthy();
    });

    // it('not render loading when it false', () => {
    //@ts-ignore
    //     reactRedux.useSelector.mockImplementation((cb: any) => cb({ appReducers: { isLoading: false } }));
    //     const item = render(<AppLoaderModal />);
    //     expect(item.getByTestId(getTestId('loader-modal'))).toBe();
    // });
});
