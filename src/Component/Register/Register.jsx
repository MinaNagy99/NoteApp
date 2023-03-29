import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos';
import 'aos/dist/aos.css';
export default function Register() {
const navigate = useNavigate()
  const [user,setUser] =useState({first_name:'',last_name:'',email:'',password:'',age:''})
  const [isLoading,setIsLoading] =useState(false)
  const [error,setError] =useState()
  useEffect(()=>{
    AOS.init();

  },[])
  function getUserData({target}) {
    setUser({...user,[target.name]:target.value})
    
  }
  const register = async(e)=> {
  e.preventDefault()
  

 setIsLoading(true)
const {data} = await axios.post('https://route-movies-api.vercel.app/signup',user)
console.log(data);
 if (data.message=='success') {
     navigate('/login')
  }else{
  const err = data.message.split(':')

    setError(err[2])

     
  
  }

setIsLoading(false)

  }

    
  
  return <> 
  <div data-aos="zoom-in" data-aos-duration='2000' className="container bg-dark  shadoww border border-light  p-3 mb-1  rounded  p-5 borber-0 mt-5">
    <form onSubmit={register}>
      {error?<p className='alert alert-danger mb-4'>{error}</p>:''}
  <input data-aos="zoom-in" data-aos-duration='2000' onChange={getUserData} type="text" name='first_name' className='form-control mb-5' placeholder='Enter your first Name' />
  <input data-aos="zoom-in" data-aos-duration='2000' onChange={getUserData} type="text" name='last_name' className='form-control my-5' placeholder='Enter your last Name' />

  <input data-aos="zoom-in" data-aos-duration='2000' onChange={getUserData} type="email" name='email' className='form-control my-5' placeholder='Enter your Email' />

  <input data-aos="zoom-in" data-aos-duration='2000' onChange={getUserData} type="password" name='password' className='form-control my-5' placeholder='Enter your Password' />

  <input data-aos="zoom-in" data-aos-duration='2000' onChange={getUserData} type="number" name='age' className='form-control my-5' placeholder='Enter your age' />


  <div className=" d-flex justify-content-center   m-auto">
  <button  type='submit' className={` btn  btn-info px-6  text-white fs-4`+(isLoading?'disabled':'') }>{isLoading?<i className="fa-spin fa-solid fa-spinner"></i>:'Register'}     </button>

 
  </div>
 </form>
 

  </div>
  
  
  </>
}
