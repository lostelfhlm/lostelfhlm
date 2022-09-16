import React, { useEffect } from 'react'
import { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../firebase'
import { setDoc, doc, Timestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
export const Register = () => {

  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false
  })
  const { name, email, password, error, loading } = data

  const navigate = useNavigate()
  const { authinfo } = useSelector(state => state)
  useEffect(() => {

    if (authinfo.isLogin) {
      navigate('/', { replace: true })
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
    if (!name || !email || !password) {
      setData({
        ...data,
        error: 'ALL fields are required'
      })
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth, email, password
      )
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
      navigate('/', { replace: true })
    } catch (err) {
      setData({
        ...data,
        error: err.message,
        loading: false
      })
    }
  }

  return (
    <section>
      <h3>Create an Account</h3>
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
        {error ? <p className='error'>{error}</p> : null}
        <div className='btn_container'>
          <button className='btn' disabled={loading}>{loading ? 'is Creating...' : 'Register'}</button>
        </div>
      </form>
    </section>
  )
}