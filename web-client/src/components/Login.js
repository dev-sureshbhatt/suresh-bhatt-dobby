import React, { useState } from 'react'

function Login() {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

function handleSubmit(ev){
    ev.preventDefault()
    console.log(email, password)
}

console.log(email, password)
  return (

    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='email' value={email} onChange={(ev)=>setEmail(ev.target.value)} />
            <input type='text' placeholder='password' value={password} onChange={(ev)=>setPassword(ev.target.value)} />
            <button>Login</button>
        </form>
    </div>
  )
}

export default Login