module.exports = {
  preset: 'react-native',
  setupFiles: ['./__mocks__/@react-native-async-storage/async-storage.js',
    './__mocks__/react-native-localize.ts',
    './__mocks__/navigationMock/navigationMock.js'
  ],
};