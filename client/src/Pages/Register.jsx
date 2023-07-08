import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./css/Register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../Utils/APIroute";

const Signup = () => {
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
      console.log("in validation", registerRoute);
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
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
    email: "",
    password: "",
    confirmpassword: "",
  });

  const handleChange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleValidation = (e) => {
    const { username, password, confirmpassword } = values;

    if (password !== confirmpassword) {
      toast.error("Password and Confirm Password must be same", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Userame must be greater than 3 characters ", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password must be grater than 8 characters ", toastOptions);
      return false;
    } else return true;
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
            type="email"
            placeholder="Enter your email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Enter confirm password"
            name="confirmpassword"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
