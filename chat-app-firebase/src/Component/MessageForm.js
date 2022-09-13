import React from 'react'
import { Picture } from './svg/Picture'

export const MessageForm = ({ handleSubmit, text, setText, chatimg, setChatimg }) => {



  return (
    <form className='message_form' onSubmit={handleSubmit}>
      <label htmlFor='img'>
        {chatimg ? <div className='picture_num'>{chatimg.length}</div> : <Picture />}

      </label>
      <input type='file' multiple='multiple' onChange={(e) => setChatimg(e.target.files)} accept='image/*' id='img' style={{ display: 'none' }} />
      <div>
        <input type='text' placeholder='Enter message' value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        <button className='btn'>Send</button>
      </div>
    </form>
  )
}
