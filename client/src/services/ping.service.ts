import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const PING_INSTANCE = axios.create({
    baseURL: API_URL,
    withCredentials: true
});

export const pingServer = async (): Promise<boolean> => {
    try {
        const res = await PING_INSTANCE.get("/ping");
        return res.status === 200;
    } catch (error) {
        return false;
    }
};