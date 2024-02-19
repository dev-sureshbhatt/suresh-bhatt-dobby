import React, { useEffect } from 'react'

function Header() {

  // to send token cookie to the /profile endpoint and get details if the user  is authenticated (if available). 
  useEffect(()=>{
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    })

  }, [])


  


  return (
    <>
    <div>Header</div>
    </>
  )
}

export default Header