import React, { useState } from 'react';
import springApi from '../api';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signInStatus, setSignInStatus] = useState("")
    const navigate = useNavigate()

    const signIn = async (e) => {
        e.preventDefault()

        let user = {
            username: username,
            password: password
        }

        try {
            const { data } = await springApi.post("/auth", {}, { auth: user})
            localStorage.setItem("token", data)
            setSignInStatus("Access has been granted.")
            navigate("/directors")
        } catch (error) {
            localStorage.setItem("token", "")
            setSignInStatus("Access has not been granted.")
        }
    }

    return <div className='sign-in-container'>
        <h2>Welcome!</h2>
        <form onSubmit={signIn}>
            <div className='form-group'>
                <label>Enter your username:</label>
                <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
            </div>

            <div className='form-group'>
                <label>Enter your password:</label>
                <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
            </div>

            <button>Sign In!</button>
            <label className='form-result'>{signInStatus}</label>
        </form>
    </div>
}