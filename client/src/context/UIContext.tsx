'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

interface HeaderInfo {
    firstName?: string;
    _id?: string;
}

interface UIContextType {
    headerInfo: HeaderInfo;
    setHeaderInfo: (info: HeaderInfo) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
    const [headerInfo, setHeaderInfo] = useState<HeaderInfo>({});

    return (
        <UIContext.Provider value={{ headerInfo, setHeaderInfo }}>
            {children}
        </UIContext.Provider>
    );
};

export const useUI = () => {
    const context = useContext(UIContext);
    if (!context) throw new Error("useUI must be used within a UIProvider");
    return context;
};
