import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import logo0 from "../assets/logo0.svg"
import { Link, useNavigate } from 'react-router-dom';

function Navbars() {
  const navigate=useNavigate()
  const handleClick=async ()=>{
    localStorage.clear();
    navigate("/login")
}
  return (
    <nav className="bg-primary text-primary-foreground flex items-center justify-between p-4 shadow bg-purple-800 fixed w-screen">
      <div className="flex items-center">
        <img undefinedhidden="true" alt="TableSprint logo" src={logo0} className="mr-2" />
        <span className="text-lg font-semibold text-white">TableSprint</span>
      </div>
      <div className="flex items-center">
        <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 p-2 rounded-full">
         <Link to="/" onClick={handleClick}><LogoutIcon className='text-white' /></Link>
        </button>
      </div>
    </nav>
  )
}

export default Navbars