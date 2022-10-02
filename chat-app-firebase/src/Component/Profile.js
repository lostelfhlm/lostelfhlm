import React, { useEffect } from "react"
import defaultimg from "../assets/avatar-default.png"
import Camera from "./svg/Cmaer"
import { useState } from "react"
import { getDoc, doc, updateDoc } from "firebase/firestore"
import { auth, storage } from "../firebase"
import { db } from "../firebase"

import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage"
import { useSelector } from "react-redux"
import Pencil from "./svg/Pencil"
export const Profile = () => {
  const { authinfo } = useSelector((state) => state)
  const [userimg, setUserimg] = useState("")
  const [user, setUser] = useState()
  const [isEdit, setIsEdit] = useState({
    name: false,
    introduction: false,
  })

  const [userInfo, setUserInfo] = useState({
    name: "",
    introduction: "",
  })
  const [error, setError] = useState('')
  const { name, introduction } = userInfo

  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    })
  }


  // get current user's info , if user is upload a avatar, delete the pre avatar and set a new avatar url
  useEffect(() => {
    if (authinfo.userinfo.uid) {
      getDoc(doc(db, "users", authinfo.userinfo.uid)).then((docsnap) => {
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

          await updateDoc(doc(db, "users", auth.currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          })
        } catch (err) {
          console.log(err.message)
        }
      }
      uploadImg()
    }
  }, [userimg, authinfo])

  // if user click edit button , change the info box to input and value is equall to current value
  const handleUserName = (e) => {
    setIsEdit((pre) => {
      return { ...pre, name: true }
    })
    setUserInfo((pre) => {
      return { ...pre, name: user.name }
    })
  }
  const handleUserIntro = (e) => {
    setIsEdit((pre) => {
      return { ...pre, introduction: true }
    })
    setUserInfo((pre) => {
      return { ...pre, introduction: user.introduction }
    })
  }

  const handleNameCancel = () => {
    setError('')
    setIsEdit((pre) => {
      return { ...pre, name: false }
    })
  }
  const handleIntroCancel = () => {

    setIsEdit((pre) => {
      return { ...pre, introduction: false }
    })
  }


  // change current user's name
  const handleNameChange = () => {
    setError('')
    if (name !== '') {
      updateDoc(doc(db, "users", user.uid), {
        name,
      })
      setIsEdit((pre) => {
        return { ...pre, name: false }
      })
      setUser((pre) => {
        return { ...pre, name }
      })
    } else {
      setError('The name should not be empty')
    }

  }
  // change current user's introduction
  const handleIntroChange = () => {
    updateDoc(doc(db, "users", user.uid), {
      introduction,
    })
    setIsEdit((pre) => {
      return { ...pre, introduction: false }
    })
    setUser((pre) => {
      return { ...pre, introduction }
    })
  }

  return user ? (
    <section>
      <div className="profile_container">
        <div className="img_container">
          <img src={user.avatar || defaultimg} alt="avatar" />
          <div className="overlay">
            <label htmlFor="photo">
              <Camera />
            </label>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              id="photo"
              onChange={(e) => setUserimg(e.target.files[0])}
            />
          </div>
        </div>
      </div>
      <div className="text_container">
        <div className="Profile_container">
          {isEdit.name ? (
            <div className="info_input">
              <label htmlFor="name">Your Name :</label>
              <input
                autoFocus
                required
                maxLength='20'
                minLength='1'

                type="text"
                name="name"
                value={name}
                onChange={handleChange}
              ></input>

              <button className="btn" onClick={handleNameChange}>
                Change
              </button>
              <button className="btn" onClick={handleNameCancel}>
                Cancel
              </button>
              {error ? <p className='error'>{error}</p> : null}
            </div>
          ) : (
            <>
              <h3>{user.name}</h3>
              <div
                className="pencil_icon"
                onClick={() => handleUserName(user.name)}
              >
                <Pencil />
              </div>
            </>
          )}
        </div>

        <p>{user.email}</p>
        <hr />
        <small>Joined on: {user.createAt.toDate().toDateString()}</small>
        <div className="Profile_container">
          {isEdit.introduction ? (
            <div className="info_input">
              <label htmlFor="introduction">Your introduction :</label>
              <textarea
                autoFocus
                required
                rows="10" cols="50"
                maxLength='400'
                type="textarea"
                name="introduction"
                value={introduction}
                onChange={handleChange}
              ></textarea>
              <button className="btn" onClick={handleIntroChange}>
                Change
              </button>
              <button className="btn" onClick={handleIntroCancel}>
                Cancel
              </button>
            </div>
          ) : (
            <>
              <p className="introduction">
                {user.introduction ? user.introduction
                  :
                  'Please introduce Yourself'
                }
              </p>
              <div
                className="pencil_icon"
                onClick={() => handleUserIntro(user.introduction)}
              >
                <Pencil />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  ) : null
}
