import React, { useState } from 'react';
import Logo from "../assets/i3.jpg";
import back from "../assets/back.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // let navigate=useNavigate()
  const toastOptions={
    position:"bottom-right",
    autoClose:8000,
    pauseOnHover:true,
    draggable:true,
    theme:"dark"
}
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:5000/auth/forgetpassword", { email,password });
    //   const token = response.data.token;
    toast.success(response.data,toastOptions)
    //   localStorage.setItem('token', token);
      
    //   navigate("/dashboard")

      
    } catch (error) {
    // console.log(error)
      toast.error(error.response.data,toastOptions)
      setEmail("");
      setPassword("");
    }
  };
  return (
    <div className="flex items-center justify-center pr-96 min-h-screen bg-background bg-black" style={{ backgroundImage: `url(${back})`, backgroundRepeat: "no-repeat", backgroundSize: "cover",backgroundPosition:"center"}}>
      <div className="bg-white dark:bg-card rounded-lg shadow-lg p-8 w-[50%] max-w-[50%] mx-4">
        <h1 className="text-2xl font-semibold text-primary text-center mb-4 flex justify-center">
          <img alt="TableSprint logo" src={Logo} className='w-56'/>
        </h1>
        <p className="text-muted-foreground text-center mb-6 text-slate-600 text-lg tracking-wider">Change your Password</p>
        <form>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-1" htmlFor="email" >Email-id</label>
            <input className="w-full p-2 border border-border rounded" type="email" id="email" placeholder="Enter your email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <label className="block text-muted-foreground mb-1" htmlFor="password" >New Password</label>
            <input className="w-full p-2 border border-border rounded" type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="flex justify-between mb-4">
            {/* <a href="#" className="text-accent hover:underline ml-auto">Forgot Password?</a> */}
          </div>
          <button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg bg-violet-800 text-white" onClick={handleSave}>Save</button>
          <h1 className='text-center font-bold'>Please <Link className='text-blue-900 font-bold underline decoration-solid' to="/">Login</Link>.</h1>
          {/* <Link to={"/register"} className="block text-center bg-secondary border border-border text-secondary-foreground hover:bg-secondary/80 p-2 rounded-lg mt-4 bg-transparent text-violet-800 hover:text-violet-900">Create Account</Link> */}
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default ForgetPassword;
