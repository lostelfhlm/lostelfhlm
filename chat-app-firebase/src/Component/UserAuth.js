import React, { useEffect } from 'react'
import { onAuthStateChanged,Unsubscribe } from 'firebase/auth'
import { setname, setisLogin, setuserinfo,setemailVerified } from '../Store/Authslice'
import { useDispatch } from 'react-redux'
import { auth } from '../firebase'


export const UserAuth = () => {

  const dispatch = useDispatch()



  useEffect(() => {
 


    const unsubscribe= onAuthStateChanged(auth, (user) => {
      // dispatch(setname(user.displayName || null))
      if (user) {
        

        dispatch(setuserinfo(user))
        dispatch(setisLogin(true))
        // dispatch(setemailVerified(true))
        // console.log(user);
      } else {
        dispatch(setisLogin(false))
      }



    })
    return ()=>  unsubscribe()
    


  }, [])


  return (
    <></>
  )
}
