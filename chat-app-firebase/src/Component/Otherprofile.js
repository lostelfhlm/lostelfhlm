import React, { useEffect, useState } from 'react'

import defaultimg from '../5152.jpg'
import { Close } from './svg/Close'


export const Otherprofile = ({ otherUser }) => {

  const [isactive, setIsactive] = useState(true)




  useEffect(() => {


    setIsactive(true)

  }, [otherUser])


  const handleout = () => {

    setIsactive(false)


  }


  return otherUser ? (
    <section className={isactive ? 'otherUser_profile' : 'Roll_out'} >
      <div className='profile_close' >
        <label onClick={handleout}>
          < Close />
        </label>

      </div>
      <div >
        <div className='otherUser_img'>
          < img src={otherUser.avatar || defaultimg} alt='avatar' />

        </div >
      </div >
      <div className='otherUser_text'>
        <h3>{otherUser.name}</h3>
        <p>{otherUser.email}</p>
        <hr />
        <small>Joined on: {otherUser.createAt.toDate().toDateString()}</small>

      </div>
      <div className='Send_otherUser'>
        <button className='btn'>Send message</button>
      </div>


    </section >
  ) : null
}
