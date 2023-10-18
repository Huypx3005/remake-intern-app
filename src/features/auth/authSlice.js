import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/firebase";

export const checkAuthState = createAsyncThunk(
  "auth/checkAuthState",
  async (_, { getState }) => {
    const { user } = getState().auth;
    if (!user) {
      const authUser = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          resolve(user);
          unsubscribe();
        });
      });
      return authUser;
    }
    return user;
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ email, password }) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  }
);

export const logOut = createAsyncThunk("auth/logOut", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
