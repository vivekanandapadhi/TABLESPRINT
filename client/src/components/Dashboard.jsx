import React, { useEffect } from 'react'
import Navbars from './Navbar'
import Drawer from './Drawer'
import Welcompage from '../pages/Welcomepage'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate=useNavigate()
  useEffect(()=>{
    const user = localStorage.getItem("token");
  if(!user){
    navigate("/")
  }
  },[])
  const color ="#FCD34D"
  return (
   
    <div>
    <Navbars/>
    <div>
    <Drawer data={color}/>
    <Welcompage/>
    </div>
   
    </div>
  )
}

export default Dashboard