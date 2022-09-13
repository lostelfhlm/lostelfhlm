import React, { useState } from 'react'
import Moment from 'react-moment'
import { useEffect, useRef } from 'react'
export const Message = ({ msg, localUserUid }) => {

  const [clickImg, setClickImg] = useState(false)
  const scrollRef = useRef()
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msg])

  // click the picture to change the classsName to  make it bigger
  const handleImg = () => {
    setClickImg(!clickImg)
  }



  return (
    <div className={`message_wrapper ${msg.from === localUserUid ? 'own' : ''}`}
      ref={scrollRef}>
      <p className={msg.from === localUserUid ? 'me' : 'friend'}>
        {msg.media ? msg.media.map((url) => <img src={url} className={clickImg ? 'clicked' : ''} alt={url} key={url} onClick={handleImg} />) : null}
        {msg.text}
        <br />
        <small>
          <Moment format='YYYY/MM/DD hh:mm:ss'>{msg.createAt.toDate()}</Moment>
        </small>
      </p>
    </div>
  )
}
