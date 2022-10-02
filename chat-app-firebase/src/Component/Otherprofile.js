import React, { useEffect, useState } from 'react'
import defaultimg from '../assets/avatar-default.png'
import { Close } from './svg/Close'

export const Otherprofile = ({
  otherUser,
  choseUser,
  setOpenProfile,
  messageButton,
}) => {
  const [isactive, setIsactive] = useState(true)

  // if otheruser is exist,show the profile
  useEffect(() => {
    setIsactive(true)
  }, [otherUser])

  // click the close button to close profile
  const handleout = () => {
    setIsactive(false)
    if (setOpenProfile) {
      setOpenProfile(false)
    }
  }

  return otherUser ? (
    <section className={isactive ? 'otherUser_profile' : 'Roll_out'}>
      <div className="profile_close">
        <label onClick={handleout}>
          <Close />
        </label>
      </div>
      <div>
        <div className="otherUser_img">
          <img src={otherUser.avatar || defaultimg} alt="avatar" />
        </div>
      </div>
      <div className="otherUser_text">
        <h3>{otherUser.name}</h3>

        <hr />
        <small>Joined on: {otherUser.createAt.toDate().toDateString()}</small>
        <>
          <p className="introduction">
            {otherUser.introduction && otherUser.introduction}
          </p>
        </>
      </div>
      {!messageButton && (
        <div className="Send_otherUser">
          <button className="btn" onClick={() => choseUser(otherUser.uid)}>
            Send message
          </button>
        </div>
      )}
    </section>
  ) : null
}
