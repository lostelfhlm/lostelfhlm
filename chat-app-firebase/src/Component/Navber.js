import React, { useEffect } from "react";
import { Link,NavLink } from "react-router-dom";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { setisLogin } from "../Store/Authslice";
import { useDispatch } from "react-redux";

export const Navber = () => {
  const dispatch = useDispatch();
  const handleSignout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    dispatch(setisLogin(false));
  };

  const { authinfo } = useSelector((state) => state);

  return (
    <nav>
   
        <h3>
          <NavLink to="/"  className={({ isActive }) =>
              isActive ? 'selected' : null
            }>Home</NavLink>
        </h3>
      

      
        <h3>
          <NavLink to="/personal" className={({ isActive }) =>
              isActive ? 'selected' : null
            }>Messenger</NavLink>
        </h3>
     

     
        <h3>
          <NavLink to="public" className={({ isActive }) =>
              isActive ? 'selected' : null
            }>Public</NavLink>
        </h3>
      

      <div >
        {authinfo.isLogin ? (
          <>
           
              <NavLink to="/profile" className={({ isActive }) =>
              isActive ? 'selected' : null
            }>Profile</NavLink>
           

            <button className="btn" onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
           
              <NavLink to="register" className={({ isActive }) =>
              isActive ? 'selected' : null
            }>Register</NavLink>
          

            
              <NavLink to="login" className={({ isActive }) =>
              isActive ? 'selected' : null
            }>Login</NavLink>
           
          </>
        )}
      </div>
    </nav>
  );
};
