import React, { useEffect } from "react";
import {
  getAuth,

  OAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth, db } from "../firebase";
import yahooBtn from './button/Rectangle Primary.png'
import { useSelector } from "react-redux";

import { setDoc, doc, Timestamp, getDoc, updateDoc } from "firebase/firestore";


const OtherAuth = () => {
  const { authinfo } = useSelector((state) => state);

  const auth = getAuth();
  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        getDoc(doc(db, "users", user.reloadUserInfo.localId)).then(
          (docsnap) => {
            if (docsnap.data()) {
              updateDoc(doc(db, "users", user.reloadUserInfo.localId), {
                isOnline: true,
              });
            } else {
              setDoc(doc(db, "users", user.reloadUserInfo.localId), {
                avatar: user.reloadUserInfo.photoUrl,
                uid: user.reloadUserInfo.localId,
                name: user.reloadUserInfo.displayName,
                email: user.reloadUserInfo.email,
                friends: [],
                createAt: Timestamp.fromDate(new Date()),
                isOnline: true,
              });
            }
          }
        );
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const handleYahoo = async () => {
    const provider = new OAuthProvider("yahoo.com");
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
        const user = result.user;

        getDoc(doc(db, "users", user.reloadUserInfo.localId)).then(
          (docsnap) => {
            if (docsnap.data()) {
              updateDoc(doc(db, "users", user.reloadUserInfo.localId), {
                isOnline: true,
              });
            } else {
              setDoc(doc(db, "users", user.reloadUserInfo.localId), {
                avatar: user.reloadUserInfo.photoUrl,
                uid: user.reloadUserInfo.localId,
                name: user.reloadUserInfo.displayName,
                email: user.reloadUserInfo.email,
                friends: [],
                createAt: Timestamp.fromDate(new Date()),
                isOnline: true,
              });
            }
          }
        );
      })
      .catch((error) => {
        // Handle error.
      });
  };

  return (
<>
 <hr />
    <h3>or</h3>
    <div className='other_container'>
      <div>
        <GoogleButton onClick={handleGoogle} />
      </div>
      <div>
          <img src={yahooBtn} className='btn_Yahoo' onClick={handleYahoo}></img>
      </div>
    </div>
    </>
  );
};

export default OtherAuth;
