import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  fetchUserData,
  fetchPublicMessages,
  addPublicMessage,
  fetchOtherUserData,
} from '../utils/publicChat'
import {
  PUBLIC_MESSAGE_LIMIT,
  MESSAGE_SUCCESS_DURATION_MS,
} from '../utils/constants'

import { PublicMessageForm } from './PublicMessageForm'
import { PublicMessage } from './PublicMessage'
import { Otherprofile } from './Otherprofile'

export const Public = () => {
  const [user, setUser] = useState([])

  const { authinfo } = useSelector((state) => state)
  const [text, setText] = useState('')
  const [pubmsg, setPubmsg] = useState('')
  const [otherUser, setOtherUser] = useState('')
  const [isSend, setIsSend] = useState(false)
  const naviagate = useNavigate()
  // get last public messages when refresh
  useEffect(() => {
    if (authinfo.userinfo.uid) {
      handlepublic()
    }
  }, [authinfo.userinfo])

  const handlepublic = () => {
    if (authinfo.userinfo.uid) {
      fetchUserData(authinfo.userinfo.uid).then((data) => {
        if (data) {
          setUser(data)
        }
      })
    }
    const unsubscribe = fetchPublicMessages(
      PUBLIC_MESSAGE_LIMIT,
      authinfo.userinfo.uid,
      setPubmsg
    )
    return () => unsubscribe()
  }

  // click a user to get the info
  const selected = (uid) => {
    if (uid) {
      fetchOtherUserData(uid).then((data) => {
        if (data) {
          setOtherUser(data)
        }
      })
    }
    if (otherUser) {
      setOtherUser('')
    }
  }
  // send the chosen user's info to /personal to add friend list
  const choseUser = async (uid, text, time) => {
    naviagate('/personal', {
      state: {
        selectedUid: uid,
        text,
        time,
      },
    })
  }

  // store public messages to firebase store
  const sendMessage = async (e) => {
    e.preventDefault()
    if (text === '') {
      alert('please enter any message')
      return
    }
    if (user) {
      await addPublicMessage({ text, user })
      setText('')
      messageSuccess()
    }
  }

  // when user send a message, show the successful box for 2s
  const messageSuccess = () => {
    setIsSend(true)
    setTimeout(() => {
      setIsSend(false)
    }, MESSAGE_SUCCESS_DURATION_MS)
  }

  return (
    <div className="public_container">
      <div className="public_sider">
        Send message to everybody, and then click others to start a chat!
      </div>
      <div className="messages_container">
        <Otherprofile otherUser={otherUser} choseUser={choseUser} />
        <div className="public_head">
          <button onClick={handlepublic} className="public_btn">
            New public message
          </button>
        </div>

        <div className="messages_box">
          <div className={isSend ? 'messages_success' : 'messages_notsend'}>
            メッセージは成功に送りました！
          </div>
          <div className="messages">
            {pubmsg &&
              pubmsg.map((item, index) => (
                <PublicMessage
                  name={item.name}
                  uid={item.uid}
                  text={item.text}
                  avatar={item.avatar}
                  time={item.createAt}
                  choseUser={choseUser}
                  selected={selected}
                  key={index}
                />
              ))}
          </div>
          <PublicMessageForm
            sendMessage={sendMessage}
            text={text}
            setText={setText}
          />
        </div>
      </div>
    </div>
  )
}
