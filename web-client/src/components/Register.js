import React, { useState } from 'react'

function Register() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

function handleSubmit(ev){
    ev.preventDefault()
    fetch('http://localhost:4000/register', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        headers: {'Content-Type':'application/json'}
    }).then((response)=>{
        response.json().then((msg)=>alert(msg.msg)).catch(err => alert("something went wrong"))
        
    }).catch((error)=>{
        alert("something went wrong")
    })
    
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