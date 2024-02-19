import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Header.css'

function Header() {

  // to send token cookie to the /profile endpoint and get details if the user  is authenticated (if available). 
  useEffect(()=>{
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    })

  }, [])


  


  return (
    <>
    <div className='header'>
      <div className='logo'><Link to={'/'}>Dobby</Link></div>
      <div className='links'>
        <Link to='/login'>
        <a>Login</a>
        </Link>
        <Link to='/register'>
        <a>Register</a>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Header