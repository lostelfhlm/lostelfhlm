import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../assets/logo/logo-no-background.png'
export const AboutPage = () => {
  const navigate = useNavigate()

  const handleContact = () => {
    navigate('/contact')
  }

  return (
    <section>
      <div className='About_container'>
        <h2>About</h2>
        <p>This is a freechat-app made by Html CSS Javascript React and firebase</p>
        <p>If you have any advice please contact me</p>
        <div >
          <img src={Logo} className="logo"></img>
        </div>
        <button className='btn' onClick={handleContact}>contact me</button>
      </div>
    </section>

  )
}
