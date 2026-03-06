export interface User {
    _id: string;
    userName: string;
    password?: string; // Only present during registration/login
    confirmPassword?: string; // Virtual field for validation
    createdAt?: string;
    updatedAt?: string;
}