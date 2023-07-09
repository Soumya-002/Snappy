import { Container } from "reactstrap";
import "../Pages/css/ChatContainer.css"
import Logout from "./logout"
import ChatInput from "./chatInput"
import axios from "axios"
import { sendMessageRoute,getMessageRoute } from "../Utils/APIroute";
import { useState,useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({currentChat,currentUser,socket}) => {

  const [messages,setmessages] = useState([]);
  const [arrivalMesaage,setarrivalMesaage] = useState(null);
  const scrollRef = useRef()

  useEffect( () => {
    const fetchdata = async() => {
      if(currentChat){
      const response = await axios.post(getMessageRoute,{
        from:currentUser._id,
        to:currentChat._id,
      })
      setmessages(response.data);
    }
    }
    fetchdata();
  },// eslint-disable-next-line
  [currentChat]);


  const handleSendMsg = async(msg) => {
    await axios.post(sendMessageRoute,{
      from:currentUser._id,
      to:currentChat._id,
      message:msg,
    })
    socket.current.emit("send-msg",{
      to:currentChat._id,
      from:currentUser._id,
      message:msg,
    })

    const msgs =[...messages];
    msgs.push({fromSelf:true,message:msg})
    setmessages(msgs);
  };

  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-receive",(msg) => {
        setarrivalMesaage({fromSelf:false,message:msg})
      })
    }
  })
 
  useEffect(() => {
    arrivalMesaage && setmessages((prev) => [...prev,arrivalMesaage])
  },[arrivalMesaage])

useEffect(() => {
scrollRef.current?.scrollIntoView({behavior:"smooth"});
},[messages])

    return ( 
        <>
        {currentChat && (
            <Container>
            <div className="chat-header">
                <div className="user-details">
                <div className="avatars chat-image">
                    <img
                      src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                      alt="avatar"
                    />
                  </div>
                  <div className="username">
                    <h3>{currentChat.username}</h3>
                  </div>
                </div>
                  <Logout />
            </div>
            <div className="chat-messages">
              {
                messages.map((message) => {
                  return (
                    <div ref={scrollRef} key={uuidv4()}>
                      <div className={`message ${message.fromSelf ? "sended" : "received"}`}>
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
        )}
        </>
     );
}
 
export default ChatContainer;