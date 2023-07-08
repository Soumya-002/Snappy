import  React,{ useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Buffer } from "buffer";
import { Container } from "reactstrap";
import { setAvatarRoute } from "../Utils/APIroute";
import "./css/avatar.css";
import loader from "../assets/loader.gif"

const SetAvatar = () => {

  const api = `https://api.multiavatar.com/45678945`;

  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [Avatar,setAvatar] = useState([]);
  const [loading,setLoading] = useState(true);
  const [selectedAvatar,setSelectedAvatar] = useState(undefined);

  useEffect(() => {
    const check = async () => {
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login");
    }
  }
  check();
},[]);

const setProfilepic = async () => {
  if (selectedAvatar === undefined) {
    toast.error("Please Select an avatar", toastOptions);
  } else {
    try {
      const user = JSON.parse(localStorage.getItem("chat-app-user"));
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: Avatar[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageset = true;
        user.avatarImage = data.image;
        localStorage.setItem("chat-app-user", JSON.stringify(user));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again", toastOptions);
      }
    } catch (error) {
      console.log("Error:", error.message);
      if (error.response) {
        console.log("Error Response:", error.response.data);
      }
      toast.error("An error occurred. Please try again", toastOptions);
    }
  }
};

  useEffect(() => {
    const fetchData = async () => {
      const data = [];
      for (let i = 0; i <4; i++) {
        try {
          const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
          const buffer = Buffer.from(image.data);
          data.push(buffer.toString("base64"));
        } catch (error) {
          console.error(error.message);
        }
      }
      setAvatar(data);
      setLoading(false);
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      {loading ? (
        <Container>
          <img src={loader} alt="loader" className="loader"/>
        </Container>
      ) : (
        <Container className="title-container">
          <div>
            <h1>Pick an Avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {Avatar.map((avatar, index) => (
              <div
                className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
                key={index} // Use index as the key prop
              >
                <img
                  src={`data:image/svg+xml;base64,${avatar}`}
                  alt="avatar"
                  onClick={() => setSelectedAvatar(index)}
                />
              </div>
            ))}
          </div>
          <button onClick={setProfilepic}>Set as Profile Picture</button>
          <ToastContainer />
        </Container>
      )}
    </>
  );
  
};

export default SetAvatar;
