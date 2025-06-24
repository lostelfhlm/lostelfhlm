import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  name: string
  isLogin: boolean
  emailVerified: boolean
  userinfo: any
}

// use redux toolkit to store user's info

const initialState: AuthState = {
  name: '',
  isLogin: true,
  emailVerified: false,
  userinfo: '',
}

const AuthSlice = createSlice({
  name: 'authinfo',
  initialState,
  reducers: {
    setname (state, action: PayloadAction<string>) {
      state.name = action.payload
    },
    setisLogin (state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload
    },
    setuserinfo (state, action: PayloadAction<any>) {
      state.userinfo = action.payload
    },
    setemailVerified (state, action: PayloadAction<boolean>) {
      state.emailVerified = action.payload
    },
  },
})

export const { setname, setisLogin, setuserinfo, setemailVerified } =
  AuthSlice.actions

export const { reducer: AuthReducer } = AuthSlice
