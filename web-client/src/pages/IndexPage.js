import React, { useContext } from 'react'
import Login from '../components/Login'
import Register from '../components/Register'
import UploadImage from '../components/UploadImage'
import Images from './Images'
import UserContext from '../context/UserContext'




function IndexPage() {
  const {validEmail} = useContext(UserContext)

  console.log("valid email is", validEmail)
  return (
    <div>
      {validEmail ? (<Images />) : (<Login />)  }
        
    </div>
  )
}

export default IndexPage