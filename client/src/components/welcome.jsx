import robot from "../assets/robot.gif"
import { Container } from "reactstrap";
import "../Pages/css/welcome.css"
import  React,{ useEffect, useState } from "react";

const Welcome = () => {

    const [userName, setUserName] = useState("");
    useEffect( () =>{
        const data = async () => {
            setUserName(
              await JSON.parse(
                localStorage.getItem("chat-app-user")
              ).username
            );
          }
          data();
        }, []);

    return ( 
        <Container className="Welcome">
            <img src={robot} alt="robot" />
            <h1>Welcome, <span>{userName}!</span></h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
     );
}
 
export default Welcome;
