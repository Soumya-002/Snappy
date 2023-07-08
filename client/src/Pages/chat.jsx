import  React,{ useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "reactstrap";
import { allUsersRoute,host } from "../Utils/APIroute";
import "./css/chat.css"
import Contact from "./contacts"
import Welcome from "../components/welcome";
import ChatContainer from "../components/chatcontainer";
import {io} from "socket.io-client"

const Chat = () => {

    const socket = useRef();
    const navigate = useNavigate();
    const [contacts,setcontacts] = useState([]);
    const [currentChat,setcurrentChat] = useState(undefined);
    const [currentUser,setcurrentUser] = useState(undefined);

   useEffect(() => {
    const fetchData = async() => {
        if(!localStorage.getItem("chat-app-user")){
            navigate("/login")
        }else{
            setcurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
        }
    }
    fetchData();
   })

   useEffect(() => {
    if(currentUser){
        socket.current = io(host)
        socket.current.emit("add-user",currentUser._id);
    }
   },[currentUser])

   useEffect( () => {
    const check = async() => {
        if(currentUser){
            if(currentUser.isAvatarImageset){
                const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                setcontacts(data.data);
            }else{
                navigate("/setAvatar");
            }
        }
    }
    check();
   });

   const handleChatChange = (chat) => {
    setcurrentChat(chat);
   }

    return (  
        <Container className="forms">
        <div className="Container">
            <Contact contacts={contacts} changeChat={handleChatChange}/>
            { currentChat === undefined ?
             (<Welcome />) : (<ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} /> )}
        </div>
        </Container>
    );
}
 
export default Chat;
