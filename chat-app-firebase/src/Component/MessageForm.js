import React from 'react'
import { Picture } from './svg/Picture'
import Picker from 'emoji-picker-react'
import { BsEmojiSmile } from 'react-icons/bs'
import useDetectClickOut from './Hooks/useDetectClickOut'
export const MessageForm = ({
  handleSubmit,
  text,
  setText,
  chatimg,
  setChatimg,
}) => {
  // use Hooks to close the emoji box if user click outside the emoji box
  // still have bugs here,click emoji icon surrend is not effect
  const { show, nodeRef, triggerRef, setShow } = useDetectClickOut(false)

  const handleEmoji = (event, emoji) => {
    let message = text
    message += emoji.emoji
    setText(message)
  }

  return (
    <form className="message_form" onSubmit={handleSubmit}>
      <label htmlFor="img">
        {chatimg ? (
          <div className="picture_num">{chatimg.length}</div>
        ) : (
          <Picture />
        )}
      </label>
      <input
        type="file"
        multiple="multiple"
        onChange={(e) => setChatimg(e.target.files)}
        accept="image/*"
        id="img"
        style={{ display: 'none' }}
      />

      <div className="emoji_container" ref={triggerRef}>
        <BsEmojiSmile />
      </div>
      {show && (
        <div className="emoji" ref={nodeRef}>
          {/*  emoji package */}
          <Picker
            disableAutoFocus
            disableSearchBar
            onEmojiClick={handleEmoji}
          />
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div>
        <button className="btn">Send</button>
      </div>
    </form>
  )
}
