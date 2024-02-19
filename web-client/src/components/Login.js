import React, { useContext, useState } from 'react'
import './Login.css'
import UserContext from '../context/UserContext'
import { Navigate } from 'react-router-dom'

function Login() {

    const [redirect, setRedirect] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { validUserInfo, setValidUserInfo, validEmail, setValidEmail } = useContext(UserContext)

    function handleSubmit(ev) {
        ev.preventDefault()

        fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' }
        }).then((response) => {
            response.json().then((userInfoDoc) => { alert(userInfoDoc.msg); setValidUserInfo(userInfoDoc.userInfo); setValidEmail(userInfoDoc.userInfo.email); setRedirect(true) }).catch(err => alert("something went wrong"))

        }).catch((error) => {
            alert("something went wrong")
        })




    }


    if (redirect){
        return <Navigate to={'/images'} />
    }

    return (

        <div className='container'>
            <form className='form' onSubmit={handleSubmit}>
                <input type='email' placeholder='email' value={email} onChange={(ev) => setEmail(ev.target.value)} />
                <input type='password' placeholder='password' value={password} onChange={(ev) => setPassword(ev.target.value)} />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login