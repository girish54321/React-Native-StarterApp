import '@testing-library/react-native';
import { jest } from '@jest/globals';

const useQuery = jest.fn();
module.exports = {
    useQuery,
    useInfiniteQuery: jest.fn(),
};
