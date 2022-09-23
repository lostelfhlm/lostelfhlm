import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { getAuth } from "firebase/auth";
export const NeedLogin = (props) => {

  const { authinfo } = useSelector(state => state)
//   const [emailVerified,setEmailVerified]=useState(false)
//       const auth = getAuth();


//   useEffect(()=>{
//  if(auth.currentUser){
//     setEmailVerified(auth.currentUser.emailVerified) 
// // // console.log(auth.currentUser.emailVerified);
// // // console.log(emailVerified);
// //   }
    
  
//    console.log(authinfo.userinfo.emailVerified);
  


//   },[])
 


  return  authinfo.isLogin  ? authinfo.userinfo.emailVerified ? props.children: <Navigate to='/verification' replace /> :<Navigate to='/login' replace />
}
