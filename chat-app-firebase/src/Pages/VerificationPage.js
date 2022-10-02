import React, { useEffect, useState } from "react"
import { auth } from "../firebase"
import { sendEmailVerification } from "firebase/auth"
import { useNavigate } from "react-router-dom"
const VerificationPage = () => {
  const [sendEmail, setSendEmail] = useState(false)
  const navigate = useNavigate()
  const handleVerification = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      // Email verification sent!
      // ...
    })
    setSendEmail(true)
  }

  useEffect(() => {
    if (auth.currentUser) {
      auth.currentUser.emailVerified && navigate("/", { replace: true })
    }
  }, [])

  return (
    <section>
      <div className="verify_container">
        Please Verify your email. if you didn't recieve a email,Click
        <button className="btn" onClick={handleVerification}>
          Verification
        </button>
        to send  Email again.
        {sendEmail && <h2>Verify Email has been sent successfully</h2>}
      </div>
    </section>

  )
}

export default VerificationPage
