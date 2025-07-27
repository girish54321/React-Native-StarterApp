require('react-native-reanimated').setUpTests();

// // Include this line for mocking react-native-gesture-handler
// import 'react-native-gesture-handler/jestSetup';

// // Include this section for mocking react-native-reanimated
// import { setUpTests } from 'react-native-reanimated';

// setUpTests();

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
import { jest } from '@jest/globals';

jest.mock('react-native-gesture-handler');
jest.mock('@react-native-async-storage/async-storage', () =>
    require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
