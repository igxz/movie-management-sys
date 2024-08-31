import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer } from './reducers/RootReducer';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(process.env.NODE_ENV === 'development' ? [logger] : []),
});

if (process.env.NODE_ENV === 'development') {
  console.log('当前是开发环境');
} else if (process.env.NODE_ENV === 'production') {
  console.log('当前是生产环境');
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useDispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;