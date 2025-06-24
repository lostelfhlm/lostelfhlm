import { db } from '../firebase';
import {
  addDoc,
  collection,
  Timestamp,
  getDoc,
  doc,
  orderBy,
  query,
  onSnapshot,
  limit
} from 'firebase/firestore';

export const fetchUserData = async (uid) => {
  const docsnap = await getDoc(doc(db, 'users', uid));
  return docsnap.exists() ? docsnap.data() : null;
};

export const fetchPublicMessages = (limitCount, currentUid, setPubmsg) => {
  const q = query(
    collection(db, 'publicmessages'),
    orderBy('createAt', 'desc'),
    limit(limitCount)
  );
  return onSnapshot(q, (querySnapshot) => {
    let messages = [];
    querySnapshot.forEach((d) => {
      if (d.data().uid !== currentUid) {
        messages.push(d.data());
      }
    });
    setPubmsg(messages);
  });
};

export const addPublicMessage = async ({ text, user }) => {
  const { uid, name, avatar } = user;
  await addDoc(collection(db, 'publicmessages'), {
    text,
    name,
    uid,
    avatar: avatar || null,
    createAt: Timestamp.fromDate(new Date()),
  });
};

export const fetchOtherUserData = async (uid) => {
  const docsnap = await getDoc(doc(db, 'users', uid));
  return docsnap.exists() ? docsnap.data() : null;
};
