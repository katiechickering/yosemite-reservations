import axios from "axios";

const PING_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

export const pingServer = async () => {
    try {
        const RES = await PING_INSTANCE.get("/ping")
        return RES.status === 200
    } catch (error) {
        return false
    }
}