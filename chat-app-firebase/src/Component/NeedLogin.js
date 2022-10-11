import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
export const NeedLogin = (props) => {
  const { authinfo } = useSelector((state) => state)
  const auth = getAuth()
  const naviagate = useNavigate()

  // if user's email is not verified, redirect to /verification
  // if user is not login,redirect to /login
  useEffect(() => {
    if (auth.currentUser) {
      if (!auth.currentUser.emailVerified) {
        naviagate('/verification', { replace: true })
      }
    }
  }, [auth.currentUser])

  return authinfo.isLogin ? props.children : <Navigate to="/login" replace />
}
