import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'

function Register() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [redirect, setRedirect] = useState(false)

function handleSubmit(ev){
    ev.preventDefault()
    fetch('https://suresh-bhatt-dobby.onrender.com/register', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type':'application/json'}
    }).then((response)=>{
        response.json().then((msg)=>{alert(msg.msg); setRedirect(true)}).catch(err => alert("something went wrong"))
        
    }).catch((error)=>{
        alert("something went wrong")
    })
    
}

if (setRedirect) {
    return <Navigate to={'/login'} />
}

  return (

    <div className='container'>
        <form className='form' onSubmit={handleSubmit}>
            <input required type='email' placeholder='email' value={email} onChange={(ev)=>setEmail(ev.target.value)} />
            <input required type='password' placeholder='password' value={password} onChange={(ev)=>setPassword(ev.target.value)} />
            <button>Register</button>
        </form>
    </div>
  )
}

export default Register