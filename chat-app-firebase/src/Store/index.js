import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './Authslice'

const store = configureStore({
  reducer: {
    authinfo: AuthReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export default store