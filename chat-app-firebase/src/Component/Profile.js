import React, { useEffect } from 'react'
import defaultimg from '../5152.jpg'
import Camera from './svg/Cmaer'
import { useState } from 'react'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { auth, storage } from '../firebase'
import { db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from 'firebase/storage'
import { useSelector } from 'react-redux'
export const Profile = () => {
  const { authinfo } = useSelector((state) => state)
  const [userimg, setUserimg] = useState('')
  const [user, setUser] = useState()




  useEffect(() => {

    if (authinfo.userinfo.uid) {
      getDoc(doc(db, 'users', authinfo.userinfo.uid)).then((docsnap) => {
        if (docsnap.exists) {
          setUser(docsnap.data())
        }
      })
    }
    if (userimg) {
      const uploadImg = async () => {
        const imgRef = ref(
          storage,
          `avatar/${new Date().getTime()} - ${userimg.name}`
        )

        try {
          if (user.avatarPath) {
            await deleteObject(ref(storage, user.avatarPath))
          }
          const snap = await uploadBytes(imgRef, userimg)

          const url = await getDownloadURL(ref(storage, snap.ref.fullPath))

          await updateDoc(doc(db, 'users', auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath
          })

        } catch (err) {
          console.log(err.message)
        }
      }
      uploadImg()
    }
  }, [userimg, authinfo])


  return user ? (
    <section>
      <div className='profile_container'>
        <div className='img_container'>
          <img src={user.avatar || defaultimg} alt='avatar' />
          <div className='overlay'>
            <label htmlFor='photo'>
              <Camera />
            </label>
            <input
              type='file'
              accept='image/*'
              style={{ display: 'none' }}
              id='photo'
              onChange={(e) => setUserimg(e.target.files[0])}
            />
          </div>
        </div>
      </div>
      <div className='text_container'>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
        <hr />
        <small>Joined on: {user.createAt.toDate().toDateString()}</small>
      </div>
    </section>
  ) : null
}
