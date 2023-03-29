import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const [islogout, setislogout] = useState(false)
  const navigate = useNavigate()
  const logout = async()=>{
    const {data} =await axios.post('https://route-movies-api.vercel.app/signOut',{
      token:localStorage.getItem('token')

    })
    if (data.message=='success') {
        localStorage.clear()
        setislogout(true)
        navigate('/login')
    }
  }
  return <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
  <a className="navbar-brand" href="#"><span><i className="text-info fs-4 fa-regular fa-note-sticky"></i> </span> Note</a>
  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ms-auto ">
      {localStorage.getItem('token')? <li className="nav-item">
        <Link className="nav-link" onClick={logout} >Logout</Link>
      </li>:<>
      
       <li className="nav-item">
        <Link className="nav-link" to={'register'}>Register</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={'login'}>Login</Link>
      </li>
      
      </>}



   
     
   

    </ul>
   
  </div>
  </div>
</nav>

  
  </>
}
