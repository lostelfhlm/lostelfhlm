import React from 'react'
import { NavLink } from 'react-router-dom'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { setisLogin } from '../Store/Authslice'
import type { RootState, AppDispatch } from '../Store'
import Logo from '../assets/logo/logo-no-background-nav.png'
import styles from '../styles/Navber.module.scss'
export const Navber = () => {
  const dispatch = useDispatch<AppDispatch>()
  // logout from firebase
  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    })
    await signOut(auth)
    dispatch(setisLogin(false))
  }

  const { authinfo } = useSelector((state: RootState) => state)

  return (
    <nav className={styles.nav}>
      <div>
        <img src={Logo} className={styles.logo_nav}></img>
      </div>

      <h3>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.selected : undefined)}>
          Home
        </NavLink>
      </h3>

      <h3>
        <NavLink
          to="/personal"
          className={({ isActive }) => (isActive ? styles.selected : undefined)}>
          Messenger
        </NavLink>
      </h3>

      <h3>
        <NavLink
          to="public"
          className={({ isActive }) => (isActive ? styles.selected : undefined)}>
          Public
        </NavLink>
      </h3>

      {/* if islogin show the profile and logout,if not show login and register */}
      <div>
        {authinfo.isLogin ? (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? styles.selected : undefined)}>
              Profile
            </NavLink>

            <button className={styles.btn_nav} onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="register"
              className={({ isActive }) => (isActive ? styles.selected : undefined)}>
              Register
            </NavLink>

            <NavLink
              to="login"
              className={({ isActive }) => (isActive ? styles.selected : undefined)}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </nav>
  )
}
