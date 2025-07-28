require('react-native-reanimated').setUpTests();

import { jest } from '@jest/globals';

jest.mock('react-native-gesture-handler');
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
jest.mock('@tanstack/react-query', () => ({
    useQuery: jest.fn(),
    useInfiniteQuery: jest.fn(),
    useMutation: jest.fn(),
    QueryClient: jest.fn().mockImplementation(() => ({
        queryCache: {
            clear: jest.fn(),
        },
    })),
}));
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('./src/navigation/NavigationService', () => ({
    navigate: jest.fn(),
    navigateResetStack: jest.fn(),
    goBack: jest.fn(),
    openDrawer: jest.fn(),
    setTopLevelNavigator: jest.fn(),
}));

