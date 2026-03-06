import axios from "axios";
import type { NPSResponse, NPSPark, NPSActivity, NPSNews, NPSCampsite } from "@/types/nps"

const PARK_INSTANCE = axios.create({
    baseURL: `/api/nps`
});

export const getParkInfo = async (): Promise<NPSPark> => {
    try {
        const res = await PARK_INSTANCE.get<NPSResponse<NPSPark>>(
            `?endpoint=parks`
        );
        return res.data.data[0];
    } catch (error) {
        throw error;
    }
};

export const get10ThingsToDo = async (): Promise<NPSActivity[]> => {
    try {
        const res = await PARK_INSTANCE.get<NPSResponse<NPSActivity>>(
            `?endpoint=thingstodo`
        );
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

export const get10NewsReleases = async (): Promise<NPSNews[]> => {
    try {
        const res = await PARK_INSTANCE.get<NPSResponse<NPSNews>>(
            `?endpoint=newsreleases`
        );
        return res.data.data;
    } catch (error) {
        throw error;
    }
};

export const getCampsites = async (): Promise<NPSCampsite[]> => {
    try {
        const res = await PARK_INSTANCE.get<NPSResponse<NPSCampsite>>(
            `?endpoint=campgrounds`
        );
        return res.data.data;
    } catch (error) {
        throw error;
    }
};
