import React, { useEffect, useState } from 'react'
import {  db } from '../firebase'
import {
  addDoc,
  collection,
  Timestamp,
  getDoc,
  doc,
  orderBy,
  query,
  onSnapshot,

} from 'firebase/firestore'
import { useSelector } from 'react-redux'

import { PublicMessageForm } from './PublicMessageForm'
import { PublicMessage } from './PublicMessage'
import { Otherprofile } from './Otherprofile'
import { useNavigate } from 'react-router-dom'


export const Public = () => {
  const [user, setUser] = useState([])

  const { authinfo } = useSelector((state) => state)
  const [text, setText] = useState('')
  const [pubmsg, setPubmsg] = useState('')
  const [otherUser, setOtherUser] = useState('')
  const [isSend,setIsSend]=useState(false)
  const naviagate = useNavigate()
  useEffect(() => {
    if (authinfo.userinfo.uid) {
      handlepublic()
    }

  }, [authinfo.userinfo])

  const handlepublic = () => {
    if (authinfo.userinfo.uid) {
      getDoc(doc(db, 'users', authinfo.userinfo.uid)).then((docsnap) => {
        if (docsnap.exists) {
          setUser(docsnap.data())
        }
      })
    }

    const q = query(
      collection(db, 'publicmessages'),
      orderBy('createAt', 'desc'),
    )



    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        if (doc.data().uid !== authinfo.userinfo.uid) {
          messages.push(doc.data())
        }

      })

      setPubmsg(messages)

    })
    return ()=>   unsubscribe()
  }

  const selected = (uid) => {
    if (uid) {
      getDoc(doc(db, 'users', uid)).then((docsnap) => {
        if (docsnap.exists) {
          setOtherUser(docsnap.data())
        }
      })


    }
    if (otherUser) {
      setOtherUser('')
    }
  }

  const choseUser = async (uid, text, time) => {

    naviagate('/personal', {
      state: {
        chosed: uid,
        text,
        time
      }
    })



  }
  // need add default avatar url 
  const sendMessage = async (e) => {
    e.preventDefault()
    if (text === '') {
      alert('please enter any message')
      return
    }
    if (user) {
      const { uid, name, avatar } = user

      await addDoc(collection(db, 'publicmessages'), {
        text,
        name,
        uid,
        avatar,
        createAt: Timestamp.fromDate(new Date()),
      })
      setText('')
      messageSuccess()
    }
  }

  const messageSuccess=()=>{
    setIsSend(true)
    setTimeout(()=>{
      setIsSend(false)
    },2000)
 
  }


  return (
    <div className="public_container">
      <div className="public_sider">Send message to everbody, and then click others to start a chat!</div>
      <div className="messages_container">
        <Otherprofile otherUser={otherUser} choseUser={choseUser} />
        <div className="public_head">
          <button onClick={handlepublic} className="public_btn">
            New public message
          </button>
        </div>

        <div className="messages_box">
          <div className={isSend? 'messages_success':'messages_notsend'}>メッセージは成功に送りました！</div>
          <div className="messages">
            {pubmsg &&
              pubmsg.map((item, index) =>
              (<PublicMessage
                name={item.name}
                uid={item.uid}
                text={item.text}
                avatar={item.avatar}
                time={item.createAt}
                choseUser={choseUser}
                selected={selected}
                key={index}
              />
              )
              )}
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
