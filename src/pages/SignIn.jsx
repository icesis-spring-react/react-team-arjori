import React, { useState } from 'react';
import springApi from '../api';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
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
            navigate("/home")
        } catch (error) {
            localStorage.setItem("token", "")
        }
    }

	return (
		<div className="bg-gray-500 space-y-4 shadow-xl p-4 rounded-md w-96 mx-auto items-center">
			<h1 className="font-medium text-3xl text-white">Login</h1>

			<form className="flex flex-col space-y-4" onSubmit={signIn}>
				<input
					type="text"
					placeholder="Username"
					className="p-1 ps-2 rounded focus:outline-none"
					onChange={(e) => setUsername(e.target.value)}
					name="username"
					value={username}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					className="p-1 ps-2 rounded focus:outline-none"
					onChange={(e) => setPassword(e.target.value)}
					name="password"
					value={password}
					required
				/>
				<button
					type="submit"
					className="bg-sky-700 p-1 hover:bg-sky-800 focus:outline-none text-white"
				>
					Sign In
				</button>
			</form>
		</div>
	);
}