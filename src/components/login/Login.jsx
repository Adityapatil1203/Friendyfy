import React, { useState } from 'react'
import classes from './login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/woman.jpg'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/authSlice'
import { useToast } from '@chakra-ui/react' 

const Login = () => {
  const [error,setError] = useState(false)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toast = useToast()

 const handleLogin = async(e)=>{
    e.preventDefault();
    if(email==='' || password==='')return 
    try {
      
    const res = await fetch('https://friendyfy.onrender.com/auth/login',{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
    })
   
    const data = await res.json()
    console.log(data)
    dispatch(login(data))
    navigate('/')
    toast({
      title: "Register successfully",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });

    } catch (error) {
       setError(true)
       setTimeout(()=>{
        setError(false)
       },3000)
    }
 }

  return (
    <div className={classes.loginContainer}>
       <div className={classes.loginWrapper}>
            {/* <div className={classes.loginLeftSide}>
               <img src={img} alt="" className={classes.leftImg}/>
            </div> */}
            <div className={classes.loginRightSide}>
              <h2 className={classes.title}>Login</h2>
              <form onSubmit={handleLogin} action="" className={classes.loginForm}>
                 <input type="email"  placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)} />
                 <input type="password"  placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} />
                 <button className={classes.submitBtn}>Login</button>
                 <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
              </form>
              {
                error && (
                  <div className={classes.errorMessage}>
                    Wrong credentail! Try different ones
                  </div>
                )
              }
            </div>
       </div>
    </div>
  )
}

export default Login