import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { doc } from 'firebase/firestore'
import { db } from '../firebase'
import defaultimg from '../5152.jpg'

export const User = ({ user, selector, localUserUid }) => {
  const otherUserUid = user.uid
  const [lastmsg, setLastmsg] = useState('')

  useEffect(() => {
    const id = localUserUid > otherUserUid ? `${localUserUid + otherUserUid}` : `${otherUserUid + localUserUid}`
    let unsub = onSnapshot(doc(db, 'lastmessage', id), (doc) => {
      setLastmsg(doc.data())
    })

    return () => unsub()
  }, [])

  return (
    <div className={`user_wrapper ${user.name === user.name && 'selected_user'}`} onClick={() => selector(user.uid)}>

      <div className='user_info'>

        <div className='user_detail'>
          <img src={user.avatar || defaultimg} alt='avatar' className='avatar' />
          <h4>{user.name}</h4>
          {lastmsg?.from !== localUserUid && lastmsg?.unread && (
            <small className='unread'>New</small>
          )}

        </div>



        <div className={`user_status ${user.isOnline ? 'online' : 'offline'}`}></div>



      </div>
      <div>
        {lastmsg && (
          <p className='truncate'>
            <strong>{lastmsg.from === localUserUid ? 'Me:' : null}</strong>
            {lastmsg.text}
          </p>
        )}
      </div>

    </div>
  )
}
