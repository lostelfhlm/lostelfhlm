import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { setisLogin } from '../Store/Authslice'
import { useDispatch } from 'react-redux'
export const Navber = () => {

  const dispatch = useDispatch()
  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false
    })
    await signOut(auth)
    dispatch(setisLogin(false))
  }


  const { authinfo } = useSelector(state => state)





  return (
    <nav>
      <h3>
        <Link to='/'>Messenger</Link>
      </h3>
      <h3>
        <Link to='public'>Public</Link>
      </h3>
      <div>
        {authinfo.isLogin ? (
          <>
            <Link to='/profile'>Profile</Link>
            <button className='btn' onClick={handleSignout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='register'>Register</Link>
            <Link to='login'>Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}
