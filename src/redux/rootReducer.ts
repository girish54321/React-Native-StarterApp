import themeReducer from './themeStore/reducers';
import authReducer from './authStore/authReducers';
import appReducers from './appStore/AppReducers';
//@ts-ignore
import logger from 'redux-logger';

const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  appReducers,
});

import { combineReducers, configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});


export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
