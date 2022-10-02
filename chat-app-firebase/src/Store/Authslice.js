import React from 'react'
import { createSlice } from '@reduxjs/toolkit'


// use redux toolkit to store user's info 

const AuthSlice = createSlice({
  name: 'authinfo',
  initialState: {
    name: '',
    isLogin: true,
    emailVerified: false,
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
    },
    setemailVerified (state, action) {
      state.emailVerified = action.payload
    }
  }

})

export const { setname, setisLogin, setuserinfo, setemailVerified } = AuthSlice.actions

export const { reducer: AuthReducer } = AuthSlice