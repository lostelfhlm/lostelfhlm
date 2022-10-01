import React, { useEffect } from 'react'
import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { updateDoc, doc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import OtherAuth from './OtherAuth'
export const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
    error: null,
    loading: false
  })
  const { email, password, error, loading } = data

  const navigate = useNavigate()

  const { authinfo } = useSelector(state => state)

  useEffect(() => {

    if (auth.currentUser) {
      navigate('/public', { replace: true })

    }

  }, [authinfo])





  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({
      ...data,
      error: null,
      loading: true
    })
    if (!email || !password) {
      setData({
        ...data,
        error: 'ALL fields are required'
      })
    }
    try {
      const result = await signInWithEmailAndPassword(
        auth, email, password
      )
      await updateDoc(doc(db, 'users', result.user.uid), {
        isOnline: true
      })
      setData({
        email: '',
        password: '',
        error: null,
        loading: false
      })
      navigate('/public', { replace: true })
    } catch (err) {
      setData({
        ...data,
        error: err.message,
        loading: false
      })
    }
  }

  return (
    <section className='register_login'>
      <h2>Login into your Account</h2>
      <form className='form' onSubmit={handleSubmit}>

        <div className='input_container'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' value={email} onChange={handleChange}></input>
        </div>
        <div className='input_container'>
          <label htmlFor='password' >Password</label>
          <input type='password' name='password' value={password} onChange={handleChange}></input>
        </div>
        <div>
          <Link to='/ResetPassword'>Forget your password ? </Link>
        </div>

        {error ? <p className='error'>{error}</p> : null}
        <div className='btn_container'>
          <button className='btn' disabled={loading}>{loading ? 'is Logging in...' : 'Login'}</button>
        </div>
        <Link to='/register'>Don't have a count? Click  here to sign up</Link>
      </form>

      <OtherAuth />

    </section>
  )
}