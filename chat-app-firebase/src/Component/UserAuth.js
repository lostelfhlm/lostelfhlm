import React, { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import {
  setname,
  setisLogin,
  setuserinfo,
} from '../Store/Authslice'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase'

export const UserAuth = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // watch auth from firebase, if there is a user,store the userinfo to the redux
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setuserinfo(user))
        dispatch(setisLogin(true))
      } else {
        dispatch(setisLogin(false))
      }
    })
    return () => unsubscribe()
  }, [])

  return <></>
}
