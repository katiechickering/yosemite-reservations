import axios, { AxiosError } from 'axios';

export interface User {
    _id: string;
    userName: string;
    password?: string; // Only present during registration/login
    confirmPassword?: string; // Virtual field for validation
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiError {
    message?: string;
    errors?: Record<string, string>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const USER_INSTANCE = axios.create({
    baseURL: `${API_URL}/user`,
    withCredentials: true
});

export const register = async (data: { userName: string; password: string; confirmPassword: string }): Promise<User> => {
    try {
        const res = await USER_INSTANCE.post<User>('/', data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        throw err.response?.data?.errors || err.message;
    }
};

export const login = async (data: { userName: string; password: string }): Promise<User> => {
    try {
        const res = await USER_INSTANCE.post<User>('/login', data);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        throw err.response?.data || err.message;
    }
};

export const logout = async (): Promise<void> => {
    try {
        await USER_INSTANCE.post('/logout');
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = async (): Promise<User> => {
    try {
        const res = await USER_INSTANCE.get<User>('/currentUser');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const res = await USER_INSTANCE.get<User[]>('/');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const checkUserName = async (userName: string): Promise<boolean> => {
    try {
        const res = await USER_INSTANCE.get<{ exists: boolean }>(
            '/checkUserName',
            { params: { userName } }
        );
        return res.data.exists;
    } catch (error) {
        throw error;
    }
};