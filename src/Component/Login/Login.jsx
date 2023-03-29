import Aos from 'aos'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate= useNavigate()
  const [user,setUser] = useState({email:'',password:''})
  const [isLoading,setIsLoading] =useState(false)
  const [error,setError]=useState('')
  useEffect(()=>{
    Aos.init()
  },[])
  const login = async(e)=>{
    e.preventDefault()
    setIsLoading(true)
    console.log(user);
    const {data} = await axios.post('https://route-movies-api.vercel.app/signin',user)
    
    if (data.message=='success') {
     localStorage.setItem("token",data.token)
     navigate('/')
    }else{
     setError(data.message)

    }
   
   setIsLoading(false)
  }
  const getDataFromUser = ({target})=>{
   setUser({...user,[target.name]:target.value});
  
  }
  return <>
  <div data-aos="zoom-in" data-aos-duration='2000' className="container bg-dark  shadoww  border border-light  rounded-2 p-5 borber-0 mt-5">
    <form onSubmit={login}>
    {error?  <p className='alert alert-danger'>{error}</p>:''}
  <input data-aos="zoom-in" data-aos-duration='2000' onChange={getDataFromUser} type="text" name='email' className='form-control my-5' placeholder='Enter your Email' />
  <input data-aos="zoom-in" data-aos-duration='2000' onChange={getDataFromUser}  type="password" name='password' className='form-control my-5' placeholder='Enter your Password' />
  <div className="div   m-auto">
  <button  type='submit' className={` btn  btn-info px-6  text-white fs-4`+(isLoading?'disabled':'') }>{isLoading?<i className="fa-spin fa-solid fa-spinner"></i>:'Sign in'}     </button>
  

  </div>
</form>
  </div>
  
  
  </>
}
