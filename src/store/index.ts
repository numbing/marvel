import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slices/searchSlice';
import issueReducer from './slices/issueSlice';
import characterReducer from './slices/characterSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    issue: issueReducer,
    characters: characterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
