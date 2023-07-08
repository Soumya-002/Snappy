import React, { useState } from 'react';
import { Container } from 'reactstrap';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { IoMdSend } from 'react-icons/io';
import Picker from 'emoji-picker-react';

const ChatInput = ({handleSendMsg}) => {
  const [msg, setMsg] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  const handleEmojiHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emojiObject,event ) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if(msg.length>0){
        handleSendMsg(msg);
        setMsg("");
    }
  }

  return (
    <Container className="parent-chat">
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="Enter your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

export default ChatInput;
