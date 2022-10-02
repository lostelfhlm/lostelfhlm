import React from 'react'
import { useNavigate } from 'react-router-dom'
export const ContactPage = () => {
  const navigate = useNavigate()

  const handleAbout = () => {
    navigate('/about')
  }
  return (
    <section>
      <div className='Contact_container'>

        <h2>Contact me</h2>
        <p> Email Address:lostelfhlm@gmail.com</p>
        <p>Please feel free to contact me</p>
        <button className='btn' onClick={handleAbout}>About</button>

      </div>
    </section>

  )
}
