import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { addDoc, collection, Timestamp, getDoc, doc, orderBy, query, onSnapshot } from 'firebase/firestore'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'
// import { setname } from '../Store/Authslice'
import { PublicMessageForm } from './PublicMessageForm'
import { PublicMessage } from './PublicMessage'
import { Otherprofile } from './Otherprofile'
export const Public = () => {



  const [user, setUser] = useState([])
  const [message, setMessage] = useState('')
  const [chatmessage, setChatmessage] = useState('')
  const { authinfo } = useSelector((state) => state)
  const [text, setText] = useState('')
  const [pubmsg, setPubmsg] = useState('')
  const [otherUser, setOtherUser] = useState('')


  useEffect(() => {
    handlepublic()

  }, [])




  const handlepublic = () => {


    if (authinfo.userinfo.uid) {
      getDoc(doc(db, 'users', authinfo.userinfo.uid)).then((docsnap) => {
        if (docsnap.exists) {
          setUser(docsnap.data())
        }
      })
    }


    const q = query(collection(db, 'publicmessages'), orderBy('createAt', 'desc'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let messages = []
      querySnapshot.forEach((doc) => {
        messages.push(doc.data())
      })
      setPubmsg(messages)
    })

  }













  const selected = (uid) => {
    if (uid) {
      getDoc(doc(db, 'users', uid)).then((docsnap) => {
        if (docsnap.exists) {
          setOtherUser(docsnap.data())
        }
      })

      console.log(otherUser)
    }
    if (otherUser) {
      setOtherUser('')
    }





  }

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
        createAt: Timestamp.fromDate(new Date())
      })
      setText('')

    }


  }



  return (
    <div className='home_container'>


      <div className='users_container'>
        123123123213
      </div>
      <div className='messages_container'>
        <Otherprofile otherUser={otherUser} />
        <div className='public_head'>
          <button onClick={handlepublic} className='public_btn' >New public message</button>
        </div>

        <div className='messages_box'>

          <div className='messages'>

            {pubmsg && pubmsg.map((item, index) => (<PublicMessage name={item.name} uid={item.uid} text={item.text} avatar={item.avatar} time={item.createAt} selected={selected} key={index} />))}

          </div>
          <PublicMessageForm sendMessage={sendMessage} text={text} setText={setText} />
        </div>



      </div>




    </div >
  )
}
