import React, { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
const ResetPasswordPage = () => {
  const [email, setEmail] = useState('')
  const [isSend, setIsSend] = useState(false)
  const handleChange = (e) => {
    setEmail(e.target.value)
  }

  // use firebase auth to reset password
  const handleReset = (e) => {
    e.preventDefault()
    const auth = getAuth()
    auth.languageCode = 'JA'
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        // ..
      })
    setIsSend(true)
  }

  return (
    <section>
      {!isSend ? (
        <>
          <h3>Reset your password</h3>

          <form className="form" onSubmit={handleReset}>
            <p>Please enter your e-mail address to reset the password</p>
            <div className="input_container">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleChange}></input>
            </div>

            <div className="btn_container">
              <button className="btn">{'Confirm'}</button>
            </div>
          </form>
        </>
      ) : (
        <h3>Reset Email has been sent successfully</h3>
      )}
    </section>
  )
}

export default ResetPasswordPage
