import { useNavigate } from 'react-router-dom'
import { checkUserName, register } from '../services/user.service'
import { useState } from 'react'
import { useLogin } from '../context/UserContext'
import { toast } from "react-toastify"

const DEFAULT_FORM_VALUES = {
    userName: "",
    password: "",
    confirmPassword: ""
}

export const RegistrationForm = () => {

    const [ apiErrors, setApiErrors ] = useState({})
    const [formData, setFormData] = useState(DEFAULT_FORM_VALUES)
    const [formErrors, setFormErrors] = useState({})

    const navigate = useNavigate()
    const { login } = useLogin()

    // Dynamically set form data
    const handleChange = e => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
        validateData(name, value)
    }

    // Validate form inputs dynamically
    const validateData = (name, value) => {
        const validations = {
            userName: () => false,
            password: value => {
                if (value.length < 8) return "Passwords must be at least eight characters long."
                else if (value != formData.confirmPassword) return "Passwords must match."
                else {
                    setFormErrors(prev => ({...prev, confirmPassword: false}))
                    return false
                }
            },
            confirmPassword: value => {
                if (value.length < 8) return "Passwords must be at least eight characters long."
                else if (value != formData.password) return "Passwords must match."
                else {
                    setFormErrors(prev => ({...prev, password: false}))
                    return false
                }
            }
        }
        setFormErrors(prev => ({...prev, [name]: validations[name](value)}))
    }

    // Check for errors before submitting form
    const isReadyToSubmit = () => {
        for (let key in formErrors){
            if (formErrors[key] != false) {
                return false
            }
        }
        return true
    }

    // Check if userName already exists
    const userNameExists = async (userName) => {
        try {
            return await checkUserName(userName)
        } catch (error) {
            console.log("checkUserName error:", error)
            setApiErrors(prev => ({...prev, checkUserName: "Unable to validate user name."}))
            toast.error("Unable to validate user name.")
            return true
        }
    }

    // Submit form
    const handleSubmit = async e => {
        e.preventDefault()
        if (!isReadyToSubmit()){
            return toast.error("Please make corrections to the form.")
        }
        let { userName, password, confirmPassword } = e.target
        userName = userName.value 
        confirmPassword = confirmPassword.value 
        password = password.value
        const exists = await userNameExists(userName)
        if (exists) {
            return toast.error("User name already exists or could not be validated.")
        }
        else {
            register({userName, password, confirmPassword})
                .then( ()=>{ 
                    login()
                    toast.success("Account created successfully!")
                    navigate('/') 
                })
                .catch( error => {
                    console.log("register error:", error)
                    setApiErrors(prev => ({...prev, register: "Unable to create account."}))
                    toast.error("Unable to create account.")
                }
            )
        }
    }

    return(
        <div className="backgroundLayout items-center flex flex-col">

            <form onSubmit={handleSubmit} className="border-2 border-brandBrown bg-brandLightestGreen p-10 rounded">
                <p className="text-center text-4xl mb-8">Register</p>

                <div className="mb-5">
                    <label htmlFor="userName">User Name:</label>
                        <input
                            type="text"
                            value={formData.userName}
                            onChange={handleChange}
                            name="userName"
                            id="userName"
                            required
                            autoComplete="username"
                        />
                </div>

                <div className="mb-5">
                    {formErrors.password && <p className="text-red-500 text-center">{formErrors.password}</p>}
                    <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            name="password"
                            id="password"
                            required
                            autoComplete="new-password"
                            className={formErrors.confirmPassword ? "error" : ""}
                        />
                </div>

                <div className="mb-8">
                    {formErrors.confirmPassword && <p className="text-red-500 text-center">{formErrors.confirmPassword}</p>}
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        className={formErrors.confirmPassword ? "error" : ""}
                    />
                </div>

                {apiErrors.register &&
                    <p className="text-red-500 text-center">
                        {apiErrors.register}
                    </p>
                }
                {apiErrors.checkUserName &&
                    <p className="text-red-500 text-center">
                        {apiErrors.checkUserName}
                    </p>
                }

                <div className="flex justify-center w-full">
                    <button type="submit" className="bg-brandGreen hover:bg-brandBrown">Register</button>
                </div>

            </form>
        </div>
    )
}