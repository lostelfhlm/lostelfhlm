import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
const AuthSlice = createSlice({
  name: 'authinfo',
  initialState: {
    name: '',
    isLogin: true,
    userinfo: ''
  },
  reducers: {
    setname (state, action) {
      state.name = action.payload
    },
    setisLogin (state, action) {
      state.isLogin = action.payload
    },
    setuserinfo (state, action) {
      state.userinfo = action.payload
    }
  }

})

export const { setname, setisLogin, setuserinfo } = AuthSlice.actions

export const { reducer: AuthReducer } = AuthSlice