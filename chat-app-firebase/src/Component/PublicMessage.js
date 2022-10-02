
import React from 'react'
import defaultimg from '../assets/avatar-default.png'
import Moment from 'react-moment'

export const PublicMessage = ({
  name,
  text,
  time,
  avatar,
  selected,
  uid,
  choseUser,
}) => {
  // render public messages

  return (
    <div>
      <div className="public_detail">
        <img
          src={avatar ? avatar : defaultimg}
          alt="avatar"
          className="avatar"
          onClick={() => selected(uid)}
        />

        <h4 onClick={() => selected(uid)}>{name}</h4>

        <div className="public_time">
          <small>
            <Moment format="YYYY/MM/DD hh:mm:ss">{time.toDate()}</Moment>
          </small>
        </div>
      </div>

      <div
        className="public_message"
        onClick={() => choseUser(uid, text, { time: time.toDate() })}>
        <p>{text}</p>
      </div>
    </div>
  )
}
