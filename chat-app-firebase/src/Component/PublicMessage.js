import { onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { doc, orderBy, query, collection } from 'firebase/firestore'
import { db } from '../firebase'
import Moment from 'react-moment'



export const PublicMessage = ({ name, text, time, avatar, selected, uid }) => {




  return (

    <div  >

      <div className='public_detail'>
        <img src={avatar} alt='avatar' className='avatar' onClick={() => selected(uid)} />

        <h4 onClick={() => selected(uid)}>{name}</h4>

        <div className='public_time'>
          <small >
            <Moment format='YYYY/MM/DD hh:mm:ss'>{time.toDate()}</Moment>
          </small>
        </div>
      </div>

      <div className='public_message'>
        <p>
          {text}
        </p>


      </div>









    </div>



  )
}
