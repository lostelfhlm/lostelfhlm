import { configureStore } from '@reduxjs/toolkit'
import { AuthReducer } from './Authslice'

export const store = configureStore({
  reducer: {
    authinfo: AuthReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store