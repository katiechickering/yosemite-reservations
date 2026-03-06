'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { getReservationById, deleteReservationById } from "@/services/reservation.service";
import { getCurrentUser } from "@/services/user.service";
import { formatDate, formatString } from "@/utils/format";
import { toast } from "react-toastify";
import { useLogin } from '@/context/UserContext';
import { useUI } from '@/context/UIContext';
import type { Reservation } from "@/services/reservation.service"
import type { User } from "@/services/user.service";

export default function ViewReservation() {
    const [reservation, setReservation] = useState<Reservation | null>(null);
    const [loading, setLoading] = useState(true);
    const [apiErrors, setApiErrors] = useState<Record<string, string>>({});
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const params = useParams();
    const id = params?.id as string;
    const router = useRouter();
    const { isLoggedIn } = useLogin();
    const { setHeaderInfo } = useUI();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            getCurrentUser()
                .then(res => setCurrentUser(res as User))
                .catch(error => {
                    console.error("getProfile error:", error);
                    setApiErrors((prev) => ({ ...prev, getCurrentUser: "Unable to load current user." }));
                });

            getReservationById(id)
                .then(res => {
                    setHeaderInfo(res); 
                    setReservation(res);
                })
                .catch(error => {
                    console.error("getReservationById error:", error);
                    setApiErrors((prev) => ({ ...prev, getReservationById: "Unable to load reservation details." }));
                    toast.error("Unable to load reservation details.");
                })
                .finally(() => setLoading(false));
        }

        return () => setHeaderInfo({});
    }, [id, isLoggedIn, router, setHeaderInfo]);

    const deleteReservation = () => {
        deleteReservationById(id)
            .then(() => {
                toast.success("Reservation deleted successfully!");
                router.push("/");
            })
            .catch(error => {
                console.error("deleteReservationById error:", error);
                setApiErrors((prev) => ({ ...prev, deleteReservationById: "Unable to delete reservation." }));
                toast.error("Unable to delete reservation.");
            });
    };

    if (!reservation) {
        return <p className="text-center">Reservation not found</p>;
    }

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center border-2 border-brand-brown bg-brand-lightest-green py-5 px-10 rounded shadow-lg">

                {loading && <p className="text-center">Loading reservation details...</p>}
                {apiErrors.getReservationById && <p className="text-red-500 text-center">{apiErrors.getReservationById}</p>}
                {apiErrors.getCurrentUser && <p className="text-red-500 text-center">{apiErrors.getCurrentUser}</p>}

                <p className="text-3xl font-bold text-brand-dark-brown">{reservation.firstName} {reservation.lastName}</p>
                <p className="mb-5 text-sm">Username: @{reservation.user?.userName}</p>
                <p className="m-3 text-lg font-medium">{formatString(reservation.campsite)} Campsite</p>
                <p className="m-3">Arrival Date: {formatDate(reservation.date)}</p>
                <p className="m-3">{reservation.lengthOfStay} Days</p>
                <p className="m-3">{reservation.partySize} People</p>

                <p className="m-3">
                    {reservation.hasPets
                        ? `${reservation.firstName} is bringing pets!`
                        : "No Pets"}
                </p>

                <p className="m-3">
                    {reservation.hasRV
                        ? `${reservation.firstName} is bringing an RV!`
                        : "No RV"}
                </p>

                { (reservation.user?._id === currentUser?._id && !loading) &&
                    <div className="m-3 flex justify-evenly w-full gap-4 mt-6">
                        <button 
                            type="button"
                            className="bg-brand-dark-brown hover:bg-brand-brown text-white py-2 px-6 rounded transition-colors"
                            onClick={deleteReservation}
                        >
                            Delete
                        </button>

                        <Link 
                            href={`/reservation/update/${id}`} 
                            className="green-button py-2 px-6 rounded"
                        >
                            Update
                        </Link>
                    </div>
                }

                {apiErrors.deleteReservationById && <p className="text-red-500 text-center mt-4">{apiErrors.deleteReservationById}</p>}
            </div>
        </div>
    );
}
