import axios from "axios"

const RESERVATION_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

// Read 
export const getAllReservations = async () => {
    try {
        const RES = await RESERVATION_INSTANCE.get('/')
        return RES.data
    } catch (error) {throw error}
}

export const getReservationById = async (id) => {
    try {
        const RES = await RESERVATION_INSTANCE.get(`/${id}`)
        return RES.data
    }
    catch (error) {throw error}
}

// Create
export const createReservation = async (newReservation) => {
    try {
        const RES = await RESERVATION_INSTANCE.post('/', newReservation)
        return RES.data
    }
    catch (error) {throw error}
}

// Delete
export const deleteReservationById = async (id) => {
    try {
        const RES = await RESERVATION_INSTANCE.delete(`/${id}`)
        return RES.data
    }
    catch (error) {throw error}
}

// Update
export const updateReservation = async (editedReservation) => {
    try {
        const RES = await RESERVATION_INSTANCE.put(`/${editedReservation._id}`, editedReservation)
        return RES.data
    }
    catch (error) {throw error}
}