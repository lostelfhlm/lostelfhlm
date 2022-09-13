import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export const NeedLogin = (props) => {

  const { authinfo } = useSelector(state => state)



  return authinfo.isLogin ? props.children : <Navigate to='/login' replace />
}
