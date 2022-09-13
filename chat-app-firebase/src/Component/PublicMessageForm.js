import React from 'react'

export const PublicMessageForm = ({ sendMessage, text, setText }) => {
  return (

    <form className='message_form' onSubmit={sendMessage}>

      <div>
        <input type='text' placeholder='Enter message' value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div>
        <button className='btn'>Send</button>
      </div>
    </form>
  )
}



