'use client'
// This file must run on the client because:
// - Redux state lives in the browser
// - localStorage is only available client-side

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// LocalStorage helpers for persisting user data across page reloads.
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '@/utils/localStorage'

interface UserState {
  isLoading: boolean;
  isSidebarOpen: boolean;
  clerkId: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  location: string | null; 
  user: any;
}

// Initial Redux state.
// `user` is loaded from localStorage so the user stays logged in after refresh.
const initialState: UserState = {
  isLoading: false,
  isSidebarOpen: false,
  clerkId: null,
  email: null,
  firstName: null,
  lastName: null,
  location: null,
  user: getUserFromLocalStorage(),
};

export const updateUser = createAsyncThunk(
  // thunkAPI 
  'user/updateUser',
  async (userData: { firstName: string; email: string; lastName: string; location: string }, thunkAPI) => {
    try {
      const res = await fetch('/api/user', {
        // patch method, itr will allow us to set up the HTTP method
        // The endpoint is auth & updateUser. We already have the root one, & we are just
        // adding the specific one at the end.
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!res.ok) {
        const error = await res.json();
        return thunkAPI.rejectWithValue(error.message || 'Failed to update user');
      }

      const updatedUser = await res.json();
      return updatedUser;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Create a Redux slice for user state.
// This slice ONLY manages UI-level user info (NOT authentication — Clerk handles auth).
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Sets the user object in Redux and persists it to localStorage.
    toggleSidebar:(state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
    setUser: (state, action) => {
      state.user = action.payload
      addUserToLocalStorage(action.payload)

      state.clerkId = action.payload.clerkId;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.location = action.payload.location;
    },
    logoutUser:(state) => {
      state.user = null
      state.isSidebarOpen = false
      removeUserFromLocalStorage()
    },

    // Clears the user from Redux and removes it from localStorage.
    clearUser: (state) => {
      state.user = null
      state.clerkId = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
      removeUserFromLocalStorage()
    },
  },

  /* -------------------------------------------------------
     ⭐ EXTRA REDUCERS — handles async thunk states
  ------------------------------------------------------- */

    extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;

        // persist updated user
        addUserToLocalStorage(action.payload);

        // update individual fields
        state.clerkId = action.payload.clerkId;
        state.email = action.payload.email;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
        state.location = action.payload.location;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
})


// Export the action creators for use in components.
export const { toggleSidebar, setUser, clearUser, logoutUser } = userSlice.actions

// Export the reducer so it can be added to the Redux store.
export default userSlice.reducer
