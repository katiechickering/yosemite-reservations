import { login } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { useLogin } from '../context/UserContext'
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { pingServer } from "../services/ping.service"

export const LoginForm = () => {
    const navigate = useNavigate()
    const { login:loginUser } = useLogin()
    const [ apiErrors, setApiErrors ] = useState({})
    const [serverIsLoaded, setServerIsLoaded] = useState(false)

    // Wake the backend free server
    useEffect(() => {
        pingServer()
            .then(res => {setServerIsLoaded(true)})
            .catch(error => {
                console.log("pingServer error", error)
                toast.error("Unable to load server")
                setApiErrors(prev => ({...prev, pingServer: "Unable to load server."}))
            })
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const { userName, password } = e.target
        login( { userName: userName.value, password: password.value } )
            .then( () => {
                loginUser()
                toast.success("Login successful!")
                navigate('/')  
            })
            .catch( error => {
                console.log("login error:", error)
                setApiErrors(prev => ({...prev, login: "Unable to login."}))
                toast.error("Unable to login.")
            })
    }

    return(
        <div className="backgroundLayout items-center flex flex-col">

            <div className="w-1/2 mb-8">
                <p className="text-center text-xl font-bold">
                    Welcome to the Yosemite Reservations app! Don't have an account yet?
                    Click the Register button above to sign up.
                </p>

                {serverIsLoaded
                    ?
                        <p className="text-center text-green-500 mt-2">
                            Server is ready to go!
                        </p>
                    :
                        <p className="text-center text-red-500 mt-2">
                            Please wait 20-40 seconds for the server to wake up... server loading...
                        </p>
                }

                {apiErrors.pingServer && <p className="text-red-500 text-center mt-2">{apiErrors.pingServer}</p>}
            </div>

            <form onSubmit={handleSubmit} className="border-2 border-brandBrown bg-brandLightestGreen p-10 rounded">
                <p className="text-center text-4xl mb-8">Login</p>

                <div className="mb-5">
                    <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            name="userName"
                            id="userName"
                            required
                            autoComplete="username"
                        />
                </div>

                <div className="mb-8">
                    <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            autoComplete="current-password"
                        />
                </div>

                {apiErrors.login && <p className="text-red-500 text-center mb-5">{apiErrors.login}</p>}
                <div className="flex justify-center w-full">
                    <button type="submit" className="bg-brandGreen hover:bg-brandBrown">Login</button>
                </div>

            </form>

        </div>
    )
}