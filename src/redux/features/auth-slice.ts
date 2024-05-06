import { createSlice } from '@reduxjs/toolkit'
import { getCookie, setCookie } from 'react-use-cookie';

export enum AuthStatus {
  LOADING = 'LOADING',
  LOGGED_IN = 'LOGGED_IN',
  LOGGED_OUT = 'LOGGED_OUT',
}

export interface User {
  id: string,
  name: string,
  email: string,
  token: {
    accessToken: string,
    refreshToken: string
  }
}

interface AuthState {
  AUTH_STATUS: AuthStatus,
  USER: User | null,
  USER_COOKIE: string | null
}

const initialState = {
  AUTH_STATUS: AuthStatus.LOADING,
  USER: null,
  USER_COOKIE: getCookie('user')
} satisfies AuthState as AuthState

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    LOGGED_IN: (state, action) => {
      state.AUTH_STATUS = AuthStatus.LOGGED_IN;
      state.USER = action.payload;
      setCookie('user', JSON.stringify(action.payload));
    },
    LOGGED_OUT: (state) => {
      state.AUTH_STATUS = AuthStatus.LOGGED_OUT;
      state.USER = null;
      setCookie('user', '');
    },
    SET_USER_COOKIE: (state, action) => {
      state.USER_COOKIE = JSON.stringify(action.payload);
    }
  }
})

export const { LOGGED_IN, LOGGED_OUT, SET_USER_COOKIE } = authSlice.actions
export default authSlice.reducer