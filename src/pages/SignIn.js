import axios from 'axios';
import React, { useState } from 'react';
const authURL = "http://localhost:8080/auth"

const SignIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [signInStatus, setSignInStatus] = useState("")

    function signIn(e) {
        e.preventDefault()

        let user = {
            username: username,
            password: password
        }
        
        axios({
            method: "post",
            url: authURL,
            auth: user
        }).then((response) => {
            localStorage.setItem("session-token", response.data)
            setSignInStatus("Access has been granted.")
        }).catch((response) => {
            localStorage.setItem("session-token", "")
            setSignInStatus("Access has not been granted.")
        })
    }

    return <>
        <h2>Welcome!</h2>
        <form onSubmit={signIn}>
            <label>Username:</label> <br/>
            <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>

            <br/><br/>

            <label>Password:</label> <br/>
            <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}}/>

            <br/><br/>

            <input type="submit" value={"Sign In!"}/>

            <br/><br/>

            <label>{signInStatus}</label>
        </form>
    </>
}

export default SignIn