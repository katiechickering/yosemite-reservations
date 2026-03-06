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
    user: {
        _id: string;
        userName: string;
    };
    createdAt?: string;
    updatedAt?: string;
}