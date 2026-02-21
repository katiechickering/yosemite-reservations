'use client';

import { useState, useContext, createContext, ReactNode } from "react";

interface UserContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useLogin = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useLogin must be used within a UserContextProvider");
    }
    return context;
};

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = () => {
        setIsLoggedIn(true);
    };

    const logout = () => {
        setIsLoggedIn(false);
    };

    return (
        <UserContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};
