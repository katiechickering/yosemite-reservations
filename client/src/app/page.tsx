'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLogin } from '@/context/UserContext';
import { getAllReservations } from "@/services/reservation.service";
import { CampsiteSearch } from "@/components/Homepage/CampsiteSearch";
import { ReservationList } from "@/components/Homepage/ReservationList";
import { useUI } from "@/context/UIContext";
import { Reservation } from '@/types/reservation'

export default function Home() {
    const [allReservations, setAllReservations] = useState<Reservation[]>([]);
    const [filteredReservations, setFilteredReservations] = useState<Reservation[]>([]);
    const [campsiteSearch, setCampsiteSearch] = useState("");
    const [loading, setLoading] = useState<string | boolean>("Loading reservations...");
    const [apiError, setApiError] = useState<string | null>(null);

    const router = useRouter();
    const { isLoggedIn } = useLogin();
    const { setHeaderInfo } = useUI();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        getAllReservations()
            .then((res) => {
                setAllReservations(res);
                setFilteredReservations(res);
            })
            .catch((error) => {
                console.error("getAllReservations error:", error);
                setApiError("Unable to load reservations.");
                toast.error("Unable to load reservations.");
            })
            .finally(() => setLoading(false));

            setHeaderInfo({})
    }, [isLoggedIn, router, setHeaderInfo]);

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setCampsiteSearch(value);
        if (value) {
            setFilteredReservations(
                allReservations.filter((res) => res.campsite === value)
            );
        } else {
            setFilteredReservations(allReservations);
        }
    };

    const resetReservations = () => {
        setCampsiteSearch("");
        setFilteredReservations(allReservations);
    };

    if (!isLoggedIn) return null;

    return (
        <div className="flex flex-col gap-8">
            <CampsiteSearch
                campsiteSearch={campsiteSearch}
                onSelectChange={handleSelectChange}
                onReset={resetReservations}
            />

            <ReservationList
                loading={loading}
                apiError={apiError}
                reservations={filteredReservations}
            />
        </div>
    );
}
