import { login } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { useLogin } from '../context/UserContext'
import { useState, useEffect } from "react"
import { toast } from "react-toastify"

export const LoginForm = () => {
    const navigate = useNavigate()
    const { login:loginUser } = useLogin()
    const [ error, setError ] = useState('')

    useEffect(() => {
        if (error) toast.error(error)
    }, [error])

    const handleSubmit = e => {
        e.preventDefault()
        const { userName, password } = e.target
        login( { userName: userName.value, password: password.value } )
            .then( ()=> {
                loginUser()
                toast.success("Login sussessful!")
                navigate('/')  
            } )
            .catch( error => setError(error))
    }

    return(
        <div className="backgroundLayout items-center flex flex-col">

            <div className="w-1/2">
                <p className="text-center text-xl font-bold mb-8">
                    Welcome to the Yosemite Reservations app! Don't have an account yet?
                    Click the Register button above to sign up.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="border-2 border-brandBrown bg-brandLightestGreen p-10 rounded">
                <p className="text-center text-4xl mb-8">Login</p>

                <div className="mb-5">
                    <label htmlFor="usertName">User Name:</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            required
                        />
                </div>

                <div className="mb-8">
                    <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                        />
                </div>

                {error && <p className="text-red-500 text-center mb-5">{error}</p>}
                <div className="flex justify-center w-full">
                    <button type="submit" className="bg-brandGreen hover:bg-brandBrown">Login</button>
                </div>

            </form>

        </div>
    )
}