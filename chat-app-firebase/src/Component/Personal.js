import React, { useEffect, useState } from "react";
import defaultimg from "../5152.jpg";
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  getDoc,
  updateDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { User } from "./User";
import { useSelector } from "react-redux";
import { MessageForm } from "./MessageForm";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { Message } from "./Message";
import {  useLocation } from "react-router-dom";
import { Close } from "./svg/Close";
import { Otherprofile } from "./Otherprofile";
import Chevronleft from "./svg/Chevronleft";
export const Personal = () => {
  const [users, setUsers] = useState([]);
  const { authinfo } = useSelector((state) => state);
  const [chatuser, setChatUser] = useState("");
  const [text, setText] = useState("");
  const [chatimg, setChatimg] = useState("");
  const [chatmessage, setChatmessage] = useState("");
  const localUserUid = authinfo?.userinfo.uid;

  const location = useLocation();
  const [newfriend, setNewfriend] = useState("");
  const [openProfile, setOpenProfile] = useState(false);
  const [tempMsg, setTempMsg] = useState({
    uid: "",
    text: "",
    time: "",
  });

  useEffect(() => {
    if (authinfo.userinfo) {
      const userRef = collection(db, "users");
      const q = query(
        userRef,
        where("friends", "array-contains", authinfo.userinfo.uid)
      );
        
      const unsub = onSnapshot(q, (querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setUsers(users);

        const resMsgRef = collection(db, "lastmessage");
        const q = query(resMsgRef, where("to", "==", authinfo.userinfo.uid));
        onSnapshot(q, (querySnapshot) => {
          let mes;
          querySnapshot.forEach((doc) => {
            mes = doc.data();
          });
          if (mes && mes.unread) {
            addfriend(mes.from);
          }
        });
      });
      return () => unsub();
    }
  }, [authinfo]);

  const selector = (user) => {
    users.forEach((item) => {
      if (item.uid === user) {
        setChatUser(item);
      }
    });
  };

  useEffect(() => {
    const getmsg = async () => {
      const otherUserUid = chatuser.uid;
      const id =
        localUserUid > otherUserUid
          ? `${localUserUid + otherUserUid}`
          : `${otherUserUid + localUserUid}`;
      const msgsRef = collection(db, "messages", id, "chat");
      const q = query(msgsRef, orderBy("createAt", "asc"));
      onSnapshot(q, (querySnapshot) => {
        let mes = [];
        querySnapshot.forEach((doc) => {
          mes.push(doc.data());
        });
        setChatmessage(mes);
      });
      const docsnap = await getDoc(doc(db, "lastmessage", id));
      if (docsnap.data() && docsnap.data()?.from !== localUserUid) {
        await updateDoc(doc(db, "lastmessage", id), {
          unread: false,
        });
      }
    };

    if (chatuser) {
      getmsg();
    }
  }, [chatuser]);

  useEffect(() => {
    if (!newfriend && location.state) {
      setNewfriend(location.state.chosed);
      setTempMsg({
        uid: location.state.chosed,
        text: location.state.text,
        time: location.state.time,
      });
    }
  }, [location.state]);

  useEffect(() => {
    if (newfriend) {
      addfriend(newfriend);
    }
  }, [newfriend]);

  const handleDelete = async (user) => {
    setChatUser("");
    if (user && localUserUid) {
      await updateDoc(doc(db, "users", user), {
        friends: arrayRemove(localUserUid),
      });
      await updateDoc(doc(db, "users", localUserUid), {
        friends: arrayRemove(user),
      });
    }
  };

  const addfriend = async (user) => {
    if (user && localUserUid) {
      await updateDoc(doc(db, "users", user), {
        friends: arrayUnion(localUserUid),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otherUserUid = chatuser.uid;
    const id =
      localUserUid > otherUserUid
        ? `${localUserUid + otherUserUid}`
        : `${otherUserUid + localUserUid}`;
    let url = [];
    if (chatimg) {
      for (let i = 0; i < chatimg.length; i++) {
        const imgRef = ref(
          storage,
          `images/${new Date().getTime()} - ${chatimg[i].name}`
        );
        const snap = await uploadBytes(imgRef, chatimg[i]);
        const downUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
        url.push(downUrl);
      }
    }

    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: localUserUid,
      to: otherUserUid,
      createAt: Timestamp.fromDate(new Date()),
      media: url || "",
    });
    await setDoc(doc(db, "lastmessage", id), {
      text,
      from: localUserUid,
      to: otherUserUid,
      createAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    });
    setText("");
    setChatimg("");
  };

  const OpenInfo = () => {

    setOpenProfile(!openProfile);
  };
  return (
    <div className="personal_container">
      <div className="users_container">
        {users
          ? users.map((user) => (
              <User
                key={user.uid}
                user={user}
                selector={selector}
                localUserUid={localUserUid}
                setNewfriend={setNewfriend}
                newfriend={newfriend}
                OpenInfo={OpenInfo}
              />
            ))
          : null}
      </div>
      <div className="messages_container">
        {chatuser && !openProfile ? (
          <>
            <div className="messages_user">
              <div className="messages_head">
                
                <label className="Chevronleft" onClick={()=>setChatUser("")}>
                   <Chevronleft />
                </label>
           

                <div className="messages_name">
  <img
            src={chatuser.avatar||defaultimg}
            alt="avatar"
            className="avatar"
            onClick={()=>OpenInfo(chatuser)}
          />

                  <h3 onClick={() => OpenInfo(chatuser)}>{chatuser.name}</h3>
                </div>
                
                

                

                <div className="user_delete">
                  <label
                    onClick={() => {
                      window.confirm(
                        "Are you sure you want to delete this user?"
                      ) && handleDelete(chatuser.uid);
                    }}
                  >
                    <Close />
                  </label>
                </div>
              </div>
            </div>
            <div className="messages">
              {tempMsg.text && chatuser.uid === tempMsg.uid && (
                <Message localUserUid={localUserUid} tempMsg={tempMsg} />
              )}
              {chatmessage
                ? chatmessage.map((item, index) => (
                    <Message
                      localUserUid={localUserUid}
                      key={index}
                      msg={item}
                      
                    />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
              chatimg={chatimg}
              setChatimg={setChatimg}
            />
          </>
        ) : (
          <>
            <h3 className="no_conv">Select a user to talk</h3>
            <Otherprofile
              otherUser={chatuser}
              messageButton={openProfile}
              setOpenProfile={setOpenProfile}
            />
          </>
        )}
      </div>
    </div>
  );
};
