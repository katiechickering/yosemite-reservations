'use client';

import { useState, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { checkUserName, register } from '@/services/user.service';
import { useLogin } from '@/context/UserContext';
import { toast } from "react-toastify";

const DEFAULT_FORM_VALUES = {
    userName: "",
    password: "",
    confirmPassword: ""
};

export default function RegistrationForm() {
    const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState(DEFAULT_FORM_VALUES);
    const [formErrors, setFormErrors] = useState<Record<string, string | boolean>>({});

    const router = useRouter();
    const { login } = useLogin();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateData(name, value);
    };

    const validateData = (name: string, value: string) => {
        const validations: Record<string, (val: string) => string | boolean> = {
            userName: () => false,
            password: (val) => {
                if (val.length < 8) return "Password must be at least 8 characters long.";
                if (val !== formData.confirmPassword) return "Passwords must match.";
                setFormErrors(prev => ({ ...prev, confirmPassword: false }));
                return false;
            },
            confirmPassword: (val) => {
                if (val.length < 8) return "Password must be at least 8 characters long.";
                if (val !== formData.password) return "Passwords must match.";
                setFormErrors(prev => ({ ...prev, password: false }));
                return false;
            }
        };
        
        if (validations[name]) {
            setFormErrors(prev => ({ ...prev, [name]: validations[name](value) }));
        }
    };

    const isReadyToSubmit = () => {
        const keys = Object.keys(DEFAULT_FORM_VALUES) as Array<keyof typeof DEFAULT_FORM_VALUES>;
        for (let key of keys) {
            if (formErrors[key] !== false || formData[key] === "") return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (!isReadyToSubmit()) {
            return toast.error("Please make corrections to the form.");
        }

        const { userName, password, confirmPassword } = formData;
        
        try {
            const exists = await checkUserName(userName);
            if (exists) {
                return toast.error("Username already exists.");
            }

            await register({ userName, password, confirmPassword });
            login();
            toast.success("Account created successfully!");
            router.push('/');
        } catch (error) {
            setApiErrors(prev => ({ ...prev, register: "Unable to create account." }));
            toast.error("Registration failed.");
        }
    };

    return (
        <div className="flex flex-col items-center py-10">
            <form onSubmit={handleSubmit} className="border-2 border-brand-brown bg-brand-lightest-green p-10 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-center text-4xl mb-8 font-serif text-brand-dark-brown">Register</h1>

                {apiErrors.register && (
                    <p className="text-red-500 text-center mb-4">
                        {apiErrors.register}
                    </p>
                )}

                <div className="flex flex-col mb-5">
                    <label htmlFor="userName" className="mb-1 font-bold">Username:</label>
                    <input
                        type="text"
                        value={formData.userName}
                        onChange={handleChange}
                        name="userName"
                        id="userName"
                        required
                        className="p-2 rounded border border-brand-brown outline-none focus:ring-2 focus:ring-brand-green"
                    />
                </div>

                <div className="flex flex-col mb-5">
                    {formErrors.password && <p className="text-red-500 text-xs mb-1">{formErrors.password}</p>}
                    <label htmlFor="password" className="mb-1 font-bold">Password:</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        name="password"
                        id="password"
                        required
                        className={`p-2 rounded border border-brand-brown outline-none focus:ring-2 focus:ring-brand-green ${formErrors.password ? "border-red-500" : ""}`}
                    />
                </div>

                <div className="flex flex-col mb-8">
                    {formErrors.confirmPassword && <p className="text-red-500 text-xs mb-1">{formErrors.confirmPassword}</p>}
                    <label htmlFor="confirmPassword" className="mb-1 font-bold">Confirm Password:</label>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                        id="confirmPassword"
                        required
                        className={`p-2 rounded border border-brand-brown outline-none focus:ring-2 focus:ring-brand-green ${formErrors.confirmPassword ? "border-red-500" : ""}`}
                    />
                </div>

                <button type="submit" className="green-button w-full py-3 font-bold hover:scale-105 transition-transform">
                    Create Account
                </button>
            </form>
        </div>
    );
}
