import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom"
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Chat from "./Pages/chat"
import SetAvatar from "./Pages/setAvatar"
import Check from "./Pages/Check"

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path = "/" element ={<Chat/>}/>
      <Route path = "/register" element ={<Register/>}/>
      <Route path = "/login" element ={<Login/>}/>
      <Route path = "/setAvatar" element ={<SetAvatar/>}/>
      <Route path = "/check" element ={<Check/>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
