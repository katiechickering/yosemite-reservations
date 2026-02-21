import axios, { AxiosError } from 'axios';

export type Campsite = 
    | "upperPines" 
    | "lowerPines" 
    | "northPines" 
    | "wawona" 
    | "hodgdonMeadow"
    | "tuolumneMeadows" 
    | "bridalveilCreek" 
    | "craneFlat" 
    | "tamarackFlat"
    | "whiteWolf" 
    | "yosemiteCreek" 
    | "porcupineFlat" 
    | "camp4";

export interface Reservation {
    _id: string;
    firstName: string;
    lastName: string;
    campsite: Campsite;
    date: string;
    lengthOfStay: number;
    partySize: number;
    hasPets: boolean;
    hasRV: boolean;
    user: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface ApiError {
    message?: string;
    errors?: Record<string, string>;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const RESERVATION_INSTANCE = axios.create({
    baseURL: `${API_URL}/reservation`,
    withCredentials: true
});

// Read 
export const getAllReservations = async (): Promise<Reservation[]> => {
    try {
        const res = await RESERVATION_INSTANCE.get<Reservation[]>('/');
        return res.data;
    } catch (error) {
        throw error;
    }
};

export const getReservationById = async (id: string): Promise<Reservation> => {
    try {
        const res = await RESERVATION_INSTANCE.get<Reservation>(`/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// Create
export const createReservation = async (newReservation: Omit<Reservation, '_id' | 'createdAt' | 'updatedAt'>): Promise<Reservation> => {
    try {
        const res = await RESERVATION_INSTANCE.post<Reservation>('/', newReservation);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        throw err.response?.data?.errors || err.message;
    }
};

// Delete
export const deleteReservationById = async (id: string): Promise<Reservation> => {
    try {
        const res = await RESERVATION_INSTANCE.delete<Reservation>(`/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
};

// Update
export const updateReservation = async (editedReservation: Reservation): Promise<Reservation> => {
    try {
        const res = await RESERVATION_INSTANCE.put<Reservation>(`/${editedReservation._id}`, editedReservation);
        return res.data;
    } catch (error) {
        const err = error as AxiosError<ApiError>;
        throw err.response?.data?.errors || err.message;
    }
};