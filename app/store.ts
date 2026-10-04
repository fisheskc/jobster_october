import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';

// mounted under `state.user`
export const store = configureStore({ reducer: { user: userReducer,  },});
// Export types for use in hooks
export type RootState = ReturnType<typeof store.getState>;
// This includes thunk support
export type AppDispatch = typeof store.dispatch; 