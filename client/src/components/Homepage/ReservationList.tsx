'use client';

import Link from 'next/link';
import { formatDate, formatString } from '@/utils/format';
import { Reservation } from '@/types/reservation'

interface ReservationListProps {
    loading: string | boolean;
    apiError: string | null;
    reservations: Reservation[];
}

export const ReservationList = ({ loading, apiError, reservations }: ReservationListProps) => {
    return (
        <div className="flex flex-wrap justify-center md:justify-start">
            {/* Loading & Error States */}
            {loading && <p className="text-center w-full animate-pulse text-brand-brown">{loading}</p>}
            {apiError && <p className="text-red-500 text-center w-full bg-white/80 p-2 rounded">{apiError}</p>}

            {/* List Mapping */}
            {reservations?.map(({ firstName, lastName, campsite, date, _id }) => (
                <div
                    className="flex flex-col w-[220px] h-[220px] m-6 p-6 border rounded-xl 
                    bg-brand-lightest-green border-brand-brown items-center justify-between 
                    shadow-md transition-transform hover:scale-105"
                    key={_id}
                >
                    <div className="text-center">
                        <p className="font-bold text-brand-dark-brown">{firstName} {lastName}</p>
                        <p className="text-sm mt-1">{formatString(campsite)}</p>
                    </div>
                    
                    <p className="text-sm font-medium">{formatDate(date)}</p>
                    
                    <Link
                        href={`/reservation/details/${_id}`}
                        className="greenButton w-full text-center py-2 text-sm"
                    >
                        View Reservation
                    </Link>
                </div>
            ))}

            {/* Empty State */}
            {!loading && reservations?.length === 0 && (
                <p className="text-center w-full mt-10 text-brand-dark-brown">No reservations found.</p>
            )}
        </div>
    );
};
