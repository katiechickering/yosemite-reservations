'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { login } from "@/services/user.service";
import { useLogin } from "@/context/UserContext";
import { pingServer } from "@/services/ping.service";

export default function LoginPage() {
    const router = useRouter();
    const { login: loginUser } = useLogin();
    
    const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
    const [serverIsLoaded, setServerIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        pingServer()
            .then(() => setServerIsLoaded(true))
            .catch((error) => {
                console.error("pingServer error", error);
                toast.error("Unable to connect to server");
                setApiErrors(prev => ({ ...prev, pingServer: "Unable to load server." }));
            });
    }, []);

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const userName = formData.get("userName")?.toString() || "";
        const password = formData.get("password")?.toString() || "";

        try {
            await login({ userName, password });
            loginUser();
            toast.success("Login successful!");
            router.push('/'); 
        } catch (error) {
            console.error("login error:", error);
            setApiErrors(prev => ({ ...prev, login: "Invalid credentials or server error." }));
            toast.error("Unable to login.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="max-w-2xl mb-8 bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-brand-brown/20 shadow-sm">
                <p className="text-center text-xl font-bold text-brand-dark-brown">
                    Welcome to the Yosemite Reservations app! Don&apos;t have an account yet? 
                    Sign up to start planning.
                </p>

                {serverIsLoaded ? (
                    <p className="text-center text-green-600 font-medium mt-3 animate-pulse">
                        ✓ Server is active and ready
                    </p>
                ) : (
                    <p className="text-center text-amber-600 font-medium mt-3 italic">
                        Please wait 20-40 seconds for the server to wake up...
                    </p>
                )}

                {apiErrors.pingServer && (
                    <p className="text-red-500 text-center mt-2 text-sm">{apiErrors.pingServer}</p>
                )}
            </div>

            <form 
                onSubmit={handleSubmit} 
                className="w-full max-w-md border-2 border-brand-brown bg-brand-lightest-green p-10 rounded-2xl shadow-xl"
            >
                <h1 className="text-center text-4xl mb-8 font-serif text-brand-dark-brown">Login</h1>

                <div className="flex flex-col mb-5">
                    <label htmlFor="userName" className="mb-2 font-bold text-brand-dark-brown">Username:</label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        required
                        autoComplete="username"
                        className="p-2 rounded border border-brand-brown focus:ring-2 focus:ring-brand-green outline-none"
                    />
                </div>

                <div className="flex flex-col mb-8">
                    <label htmlFor="password" title="password" className="mb-2 font-bold text-brand-dark-brown">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        autoComplete="current-password"
                        className="p-2 rounded border border-brand-brown focus:ring-2 focus:ring-brand-green outline-none"
                    />
                </div>

                {apiErrors.login && (
                    <p className="text-red-500 text-center mb-5 text-sm font-bold bg-red-50 p-2 rounded border border-red-200">
                        {apiErrors.login}
                    </p>
                )}

                <div className="flex justify-center w-full">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`green-button w-full py-3 text-lg font-bold transition-all ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                    >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}
