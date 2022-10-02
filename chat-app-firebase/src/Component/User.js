import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { doc } from 'firebase/firestore'
import { db } from '../firebase'
import defaultimg from '../assets/avatar-default.png'
import Moment from 'react-moment'
export const User = ({
  user,
  selector,
  localUserUid,
  newfriend,
  setNewfriend,
  OpenInfo,
}) => {
  const otherUserUid = user.uid
  const [lastmsg, setLastmsg] = useState('')

  // get lastmessage to render it
  useEffect(() => {
    const id =
      localUserUid > otherUserUid
        ? `${localUserUid + otherUserUid}`
        : `${otherUserUid + localUserUid}`
    let unsub = onSnapshot(doc(db, 'lastmessage', id), (doc) => {
      setLastmsg(doc.data())
    })

    return () => unsub()
  }, [])

  // if user click a public message , add it to user list and click it to show message container
  useEffect(() => {
    if (newfriend === otherUserUid) {
      selector(otherUserUid)
      setNewfriend('')
    }
  }, [])

  return (
    <div
      className={`user_wrapper ${user.name === user.name && 'selected_user'}`}
      onClick={() => selector(user.uid)}>
      <div className="user_info">
        <div className="user_detail">
          <img
            src={user.avatar || defaultimg}
            alt="avatar"
            className="avatar"
            onClick={() => OpenInfo(user)}
          />

          <h4>{user.name}</h4>
          {lastmsg?.from !== localUserUid && lastmsg?.unread && (
            <small className="unread">New</small>
          )}
        </div>

        <div
          className={`user_status ${user.isOnline ? 'online' : 'offline'
            }`}></div>
      </div>
      <div>
        {lastmsg && (
          <p className="truncate">
            <strong>{lastmsg.from === localUserUid ? 'Me:' : null}</strong>
            {lastmsg.text}
            <small>
              <Moment format="hh:mm:ss">{lastmsg.time}</Moment>
            </small>
          </p>
        )}
      </div>
    </div>
  )
}
