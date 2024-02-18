import React, { useState } from 'react'

function Login() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

function handleSubmit(ev){
    ev.preventDefault()
    
    fetch('http://localhost:4000/login', {
        method: 'POST',
        body: JSON.stringify({email, password}),
        credentials: 'include',
        headers: {'Content-Type':'application/json'}
    }).then((response)=>{
        response.json().then((msg)=>alert(msg.msg)).catch(err => alert("something went wrong"))
        
    }).catch((error)=>{
        alert("something went wrong")
    })




}

  return (

    <div>
        <form onSubmit={handleSubmit}>
            <input type='email' placeholder='email' value={email} onChange={(ev)=>setEmail(ev.target.value)} />
            <input type='password' placeholder='password' value={password} onChange={(ev)=>setPassword(ev.target.value)} />
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login