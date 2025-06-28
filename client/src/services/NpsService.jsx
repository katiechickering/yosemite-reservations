import axios from "axios"

const API_KEY = import.meta.env.VITE_NPS_API_KEY;

const PARK_INSTANCE = axios.create({
    baseURL: `https://developer.nps.gov/api/v1`
})

export const getParkInfo = async () => {
    try {
        const RES = await PARK_INSTANCE.get(`/parks?parkCode=yose&api_key=${API_KEY}`)
        return RES.data.data[0]
    }
    catch(error){throw error}
}

export const get10ThingsToDo = async () => {
    try {
        const RES = await PARK_INSTANCE.get(`/thingstodo?parkCode=yose&limit=10&api_key=${API_KEY}`)
        return RES.data.data
    }
    catch(error){throw error}
}

export const get10NewsReleases = async () => {
    try {
        const RES = await PARK_INSTANCE.get(`/newsreleases?parkCode=yose&limit=10&api_key=${API_KEY}`)
        return RES.data.data
    }
    catch(error){throw error}
}

export const getCampsites = async () => {
    try {
        const RES = await PARK_INSTANCE.get(`/campgrounds?parkCode=yose&api_key=${API_KEY}`)
        return RES.data.data
    }
    catch(error){throw error}
}