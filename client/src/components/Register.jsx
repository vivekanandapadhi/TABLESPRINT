import React, { useEffect, useState } from 'react';
import Image1 from "../assets/i1.jpg";
import Image2 from "../assets/i3.jpg";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer,toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate=useNavigate()

    const toastOptions={
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        draggable:true,
        theme:"dark"
    }
    useEffect(()=>{
        const user=localStorage.getItem("token")
        if(user){
            navigate("/dashboard")
        }
    },[navigate])
    const formHandle = (e) => {
        e.preventDefault(); // Prevent the default form submission

        const userData = {
            email: email,
            password: password,
        };

        if (email === "" || password === "") {
            alert("Please fill in all fields");
        } else {
            axios.post("http://localhost:5000/auth/register", userData)
            .then((res) => {
               
                toast.success(res.data,toastOptions)
               
                setEmail("");
                setPassword("");
            })
            .catch((error) => { 
                    
                    
                    toast.error(error.response.data,toastOptions)
                    setEmail("");
                setPassword("");
                    
            });
            
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-screen bg-background">
            <div className="w-full md:w-1/2 p-8 m-10 bg-white rounded-lg shadow-md flex flex-col items-center">
                <img src={Image2} alt="Logo" className="mb-4 max-w-56 max-h-56" />
                <h2 className="text-lg text-center text-muted mb-6">Welcome</h2>
                <form className="w-full" onSubmit={formHandle}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-muted" htmlFor="email">
                            Email ID
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email ID"
                            className="mt-1 block w-full p-2 shadow-md rounded-md focus:outline-none focus:ring focus:ring-ring border-0"
                           
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-muted" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your Password"
                            className="mt-1 block w-full p-2 shadow-md border-0 rounded-md focus:outline-none focus:ring focus:ring-ring"
                            
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 mt-4 bg-pink-700 text-white rounded-md hover:bg-primary/80"
                    >
                        Sign Up
                    </button>
                    <h1 className='text-center p-5 font-bold'>If user is already exist please <Link to="/" className='text-blue-900 underline underline-offset-4'>Login</Link></h1>
                </form>
            </div>
            <div className="hidden md:block w-1/2 h-full bg-cover bg-center">
                <img src={Image1} alt="Background" className="h-full w-full object-cover" />
            </div>
            <ToastContainer/>
        </div>
    );
}

export default Register;
