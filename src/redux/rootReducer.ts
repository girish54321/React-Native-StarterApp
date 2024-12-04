import themeReducer from './themeStore/reducers'
import authReducer from './authStore/authReducers'
import appReducers from './appStore/AppReducers'
//@ts-ignore
import logger from 'redux-logger'

const rootReducer = combineReducers({
  themeReducer,
  authReducer,
  appReducers
})

import { combineReducers, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
