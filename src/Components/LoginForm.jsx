import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import API_BASE_URL from "../api";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const handleNameChange = (e) => {
        setUsername(e.target.value);
    }

    const passwordRef = useRef(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
                email: username,
                password: passwordRef.current.value
            })
            if (username === "harsh@gmail.com" && passwordRef.current.value === "abc") {
                console.log("Login successful!");
                sessionStorage.setItem("role", 'admin')
                sessionStorage.setItem("isLoggedIn", "true")
                navigate('/admin')
            }
            else {
                sessionStorage.setItem("isLoggedIn", "true")
                sessionStorage.setItem("role", 'user')
                navigate('/products')
            }
            console.log("response=>", data)
            toast.success(data.message)
            sessionStorage.setItem('token', data.token)

        } catch {
            toast.error("Login failed")
            sessionStorage.setItem('isLoggedIn', false)
        }
    }

    return (
        <form className="w-[300px] mx-auto bg-rose-200 px-14 py-4  m-5 flex flex-col justify-center item-center gap-4 shadow-xl rounded-lg">
            <h1 className="font-semibold text-3xl text-center">Login</h1>
            <input
                type="text"
                placeholder="Username"
                className="border-2 m-2 p-2 hover:border-red-300 rounded-md"
                value={username}
                onChange={handleNameChange}
            ></input>
            <input
                type="password"
                placeholder="Password"
                className="border-2 m-2 p-2 hover:border-red-300 rounded-md"
                // value = {passwordRef}
                // onChange = {handlePasswordChange}
                ref={passwordRef}
            ></input >
            <button type="submit"
                className="bg-rose-300 rounded-md  py-1 hover:bg-red-400 "
                onClick={handleSubmit}
            >Login</button>
        </form>
    )
}
export default LoginForm;