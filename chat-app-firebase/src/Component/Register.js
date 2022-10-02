import React, { useEffect } from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth, db } from '../firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import OtherAuth from './OtherAuth'
export const Register = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    repetpsw: '',
    error: null,
    loading: false
  })
  const { name, email, password, error, loading, repetpsw } = data

  const navigate = useNavigate()
  const { authinfo } = useSelector(state => state)

  // if user islogin , redirect to /public
  useEffect(() => {

    if (auth.currentUser) {
      navigate('/public', { replace: true })
    }

  }, [authinfo])


  // set input value to data
  const handleChange = (e) => {

    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }
  // use firebase auth  to signup 
  const handleSubmit = async (e) => {
    e.preventDefault()
    setData({
      ...data,
      error: null,
      loading: true
    })
    if (!name || !email || !password) {
      setData({
        ...data,
        error: 'ALL fields are required'
      })
    } else if (password !== repetpsw) {
      setData({
        ...data,
        error: 'Please check your password, two password must be same'
      })
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth, email, password
      )
      auth.languageCode = 'JA'
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent

        })
      // if is successful, set user's info 
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        friends: [],
        createAt: Timestamp.fromDate(new Date()),
        isOnline: true
      })
      setData({
        name: '',
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
      <h2>Create an Account</h2>
      <form className='form' onSubmit={handleSubmit}>
        <div className='input_container'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={handleChange}></input>
        </div>
        <div className='input_container'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' value={email} onChange={handleChange}></input>
        </div>
        <div className='input_container'>
          <label htmlFor='password' >Password</label>
          <input type='password' name='password' value={password} onChange={handleChange}></input>
        </div>
        <div className='input_container'>
          <label htmlFor='password' >Password</label>
          <input type='password' name='repetpsw' value={repetpsw} onChange={handleChange}></input>
        </div>
        <Link to='/login'>Already had a count? Click  here sign in</Link>

        {error ? <p className='error'>{error}</p> : null}
        <div className='btn_container'>
          <button className='btn' disabled={loading}>{loading ? 'is Creating...' : 'Register'}</button>
        </div>
      </form>

      <OtherAuth />



    </section>
  )
}
