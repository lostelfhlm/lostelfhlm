import React, { useEffect, useState } from 'react'
import { collection, query, where, onSnapshot, addDoc, getDoc, updateDoc, Timestamp, orderBy, setDoc, doc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'
import { User } from './User'
import { useSelector } from 'react-redux'
import { MessageForm } from './MessageForm'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { Message } from './Message'

export const Home = () => {
  const [users, setUsers] = useState([])
  const { authinfo } = useSelector((state) => state)
  const [chatuser, setChatUser] = useState('')
  const [text, setText] = useState('')
  const [chatimg, setChatimg] = useState('')
  const [chatmessage, setChatmessage] = useState('')
  const localUserUid = authinfo?.userinfo.uid


  useEffect(() => {
    const userRef = collection(db, 'users')
    if (authinfo.userinfo) {
      const q = query(userRef, where('uid', 'not-in', [authinfo.userinfo.uid]))

      const unsub = onSnapshot(q, (querySnapshot) => {
        let users = []
        querySnapshot.forEach((doc) => {
          users.push(doc.data())
        })
        setUsers(users)

      })
      return () => unsub()
    }

  }, [authinfo])

  const selector = async (user) => {
    setChatUser(user)

    const otherUserUid = user.uid
    const id = localUserUid > otherUserUid ? `${localUserUid + otherUserUid}` : `${otherUserUid + localUserUid}`
    const msgsRef = collection(db, 'messages', id, 'chat')
    const q = query(msgsRef, orderBy('createAt', 'asc'))
    onSnapshot(q, (querySnapshot) => {
      let mes = []
      querySnapshot.forEach((doc) => {
        mes.push(doc.data())

      })
      setChatmessage(mes)

    })
    const docsnap = await getDoc(doc(db, 'lastmessage', id))
    if (docsnap.data() && docsnap.data()?.from !== localUserUid) {
      await updateDoc(doc(db, 'lastmessage', id), {
        unread: false
      })

    }

  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const otherUserUid = chatuser.uid
    const id = localUserUid > otherUserUid ? `${localUserUid + otherUserUid}` : `${otherUserUid + localUserUid}`
    let url = []
    if (chatimg) {
      for (let i = 0; i < chatimg.length; i++) {
        const imgRef = ref(storage, `images/${new Date().getTime()} - ${chatimg[i].name}`)
        const snap = await uploadBytes(imgRef, chatimg[i])
        const downUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
        url.push(downUrl)
      }


    }

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: localUserUid,
      to: otherUserUid,
      createAt: Timestamp.fromDate(new Date()),
      media: url || ''
    })
    await setDoc(doc(db, 'lastmessage', id), {
      text,
      from: localUserUid,
      to: otherUserUid,
      createAt: Timestamp.fromDate(new Date()),
      media: url || '',
      unread: true
    })
    setText('')
    setChatimg('')
  }
  return (
    <div className='home_container'>
      <div className='users_container'>
        {users ? users.map((user) => <User key={user.uid} user={user} selector={selector} localUserUid={localUserUid} />) : null}
      </div>
      <div className='messages_container'>

        {chatuser ?
          <>
            <div className='messages_user'>
              <h3>{chatuser.name}</h3>
            </div>
            <div className='messages'>
              {chatmessage ? chatmessage.map((item, index) => <Message localUserUid={localUserUid} key={index} msg={item} />) : null}
            </div>
            <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} chatimg={chatimg} setChatimg={setChatimg} />
          </>
          : <h3 className='no_conv'>Select a user to talk</h3>
        }

      </div>




    </div>
  )
}
