import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../Utils/APIroute";

const Login = () => {
    const navigate = useNavigate();

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
    //   console.log("in validation", loginRoute);
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });
      if(data.status === false){
        toast.error(data.message,toastOptions)
      }
      if(data.status === true){
        localStorage.setItem("chat-app-user",JSON.stringify(data.user))
        navigate("/");
      }
    }
  };

  const [values, setvalues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    const { username, password } = values;

    if (username === "") {
      toast.error("Userame or Password must not be empty", toastOptions);
      return false;
    }else if(password === ""){
      toast.error("Userame or Password must not be empty", toastOptions);
      return false;
    }
     else return true;
  };
  return (
    <>
      <div className="form">
        <form action="" onSubmit={(Event) => handleSubmit(Event)}>
          <div className="brand">
            {/* <img src="" alt="" /> */}
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
