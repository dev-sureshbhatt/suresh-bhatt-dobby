import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import './Header.css'
import UserContext from '../context/UserContext'
import { Navigate } from 'react-router-dom'


function Header() {
  const {validUserInfo, setValidUserInfo, validEmail, setValidEmail} = useContext(UserContext)
  


  // to send token cookie to the /profile endpoint and get details if the user  is authenticated (if available). 
  useEffect(()=>{
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response => response.json().then((userInfo) => {
      console.log("user info  is", userInfo.userInfo.email)
      setValidUserInfo(userInfo.userInfo); setValidEmail(userInfo.userInfo.email)}).catch(err=>console.log(err)))
    .catch(err => console.log(err))

  }, [])


  // const email = validUserInfo?.userInfo?.email
  // console.log("email is ", email)


  function handleLogout(){
    fetch('http://localhost:4000/logout', {credentials: 'include'})
    setValidUserInfo(null)
    setValidEmail(null)
  }

  return (
    <>
    <div className='header'>
      <div className='logo'><Link to={'/'}><span>Dobby</span></Link></div>
      <div className='links'>

        {
          validEmail && (<><Link to='/upload'><span>Upload Images</span></Link>
          <Link to=''><span onClick={handleLogout}>Logout</span></Link></>)
        }
        {
          !validEmail && (<><Link to='/login'><span>Login</span></Link>
          <Link to='/register'><span>Register</span></Link></>)
        }
        
      </div>
    </div>
    </>
  )
}

export default Header