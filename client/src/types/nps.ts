export interface NPSResponse<T> {
    total: string;
    limit: string;
    start: string;
    data: T[];
}

export interface NPSPark {
    fullName: string;
    description: string;
    directionsInfo: string;
    directionsUrl: string;
    weatherInfo: string;
    contacts: {
        phoneNumbers: { phoneNumber: string }[];
        emailAddresses: { emailAddress: string }[];
    };
    addresses: {
        line1: string;
        city: string;
        stateCode: string;
        postalCode: string;
    }[];
    operatingHours: { description: string }[];
    images: { url: string; altText: string }[];
}

export interface NPSActivity {
    id: string;
    title: string;
    shortDescription: string;
    isReservationRequired: string;
    images: {
        url: string;
        altText: string;
    }[];
}

export interface NPSNews {
    id: string;
    url: string;
    title: string;
    abstract: string;
    releaseDate: string;
    image: {
        url: string;
        altText: string;
    };
}

export interface NPSCampsite {
    id: string;
    name: string;
    description: string;
    url?: string;
    reservationInfo?: string;
    directionsOverview?: string;
    numberOfSitesReservable?: string;
    images: { url: string; altText: string }[];
}