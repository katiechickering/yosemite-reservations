'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { getReservationById, createReservation, updateReservation } from "@/services/reservation.service";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useLogin } from '@/context/UserContext';
import { useUI } from '@/context/UIContext';
import { formatString } from '@/utils/format';

const DEFAULT_FORM_VALUES = {
    firstName: "",
    lastName: "",
    campsite: "",
    date: "",
    lengthOfStay: "",
    partySize: "",
    hasPets: false,
    hasRV: false
};

const CAMPSITE_ENUM = [
    "upperPines", "lowerPines", "northPines", "wawona", "hodgdonMeadow",
    "tuolumneMeadows", "bridalveilCreek", "craneFlat", "tamarackFlat",
    "whiteWolf", "yosemiteCreek", "porcupineFlat", "camp4"
];

export const ReservationForm = () => {
    const [formData, setFormData] = useState<any>(DEFAULT_FORM_VALUES);
    const [formErrors, setFormErrors] = useState<Record<string, string | boolean>>({});
    const [loading, setLoading] = useState<string | boolean>("Loading reservation details...");
    const [apiErrors, setApiErrors] = useState<Record<string, string>>({});

    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;
    const { isLoggedIn } = useLogin();
    const { setHeaderInfo } = useUI();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        } else if (id) {
            getReservationById(id)
                .then(res => {
                    res.date = res.date.slice(0, 10);
                    setFormData(res);
                    setHeaderInfo(res);
                })
                .catch(() => {
                    setApiError("getReservationById", "Unable to load reservation details.");
                    toast.error("Unable to load reservation details.");
                })
                .finally(() => setLoading(false));
        } else {
            setFormData(DEFAULT_FORM_VALUES);
            setLoading(false);
            setHeaderInfo({});
        }
    }, [id, isLoggedIn, router, setHeaderInfo]);

    const setApiError = (key: string, msg: string) => {
        setApiErrors(prev => ({ ...prev, [key]: msg }));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === "checkbox") {
            const checkbox = e.target as HTMLInputElement;
            setFormData((prev: any) => ({ ...prev, [name]: checkbox.checked }));
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
        validateData(name, value);
    };

    const today = dayjs().startOf('day');
    const oneYearFromToday = today.add(1, 'year');

    const validateData = (name: string, value: string) => {
        const validations: any = {
            firstName: (val: string) => val.length < 2 ? "First name must be at least 2 characters." : val.length > 30 ? "Max 30 characters." : false,
            lastName: (val: string) => val.length < 2 ? "Last name must be at least 2 characters." : val.length > 30 ? "Max 30 characters." : false,
            campsite: (val: string) => !CAMPSITE_ENUM.includes(val) ? "Select a valid campsite." : false,
            date: (val: string) => {
                const userDate = dayjs(val);
                return userDate.isBefore(today) ? "Date must not be in the past." : userDate.isAfter(oneYearFromToday) ? "Cannot book more than 1 year in advance." : false;
            },
            lengthOfStay: (val: any) => val < 1 ? "Min 1 day." : val > 14 ? "Max 14 days." : false,
            partySize: (val: any) => val < 1 ? "Min 1 person." : val > 8 ? "Max 8 people." : false,
            hasPets: () => false,
            hasRV: () => false
        };
        if (validations[name]) {
            setFormErrors(prev => ({ ...prev, [name]: validations[name](value) }));
        }
    };

    const isReadyToSubmit = (): boolean => {
        const hasErrors = Object.values(formErrors).some(error => error !== false);
        if (hasErrors) return false;
        
        return formData.firstName && formData.lastName && formData.campsite && 
                formData.date && formData.lengthOfStay && formData.partySize;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!isReadyToSubmit()) return toast.error("Please fix form errors.");

        try {
            if (id) {
                await updateReservation(formData);
                toast.success("Updated!");
                router.push(`/reservation/details/${id}`);
            } else {
                await createReservation(formData);
                toast.success("Created!");
                router.push("/");
            }
        } catch (err) {
            toast.error("Submission failed.");
        }
    };

    return (
        <div className="flex flex-col items-center">
            <p className="text-center font-bold mb-8">Not sure where to stay? Check Park Information.</p>

            <form onSubmit={handleSubmit} className="border-2 border-brand-brown bg-brand-lightest-green p-10 rounded shadow-lg">
                {loading && <p className="text-center italic">{loading}</p>}
                
                <div className="mb-5 flex flex-col">
                    <label htmlFor="firstName">First Name: </label>
                    <input type="text" value={formData.firstName} onChange={handleChange} name="firstName" id="firstName" required className={`p-1 border rounded ${formErrors.firstName ? "border-red-500" : "border-brand-brown"}`} />
                    {formErrors.firstName && <p className="text-red-500 text-xs">{formErrors.firstName}</p>}
                </div>

                <div className="mb-5 flex flex-col">
                    <label htmlFor="lastName">Last Name: </label>
                    <input type="text" value={formData.lastName} onChange={handleChange} name="lastName" id="lastName" required className={`p-1 border rounded ${formErrors.lastName ? "border-red-500" : "border-brand-brown"}`} />
                    {formErrors.lastName && <p className="text-red-500 text-xs">{formErrors.lastName}</p>}
                </div>

                <div className="mb-5 flex flex-col">
                    <label htmlFor="campsite">Campsite: </label>
                    <select name="campsite" id="campsite" required value={formData.campsite} onChange={handleChange} className={`p-1 border rounded ${formErrors.campsite ? "border-red-500" : "border-brand-brown"}`} >
                        <option value="" disabled>Select a campsite</option>
                        {CAMPSITE_ENUM.map(c => <option key={c} value={c}>{formatString(c)}</option>)}
                    </select>
                    {formErrors.campsite && <p className="text-red-500 text-xs">{formErrors.campsite}</p>}
                </div>

                <div className="mb-5 flex flex-col">
                    <label htmlFor="date">Date: </label>
                    <input type="date" value={formData.date} onChange={handleChange} name="date" id="date" required className={`p-1 border rounded ${formErrors.date ? "border-red-500" : "border-brand-brown"}`}/>
                    {formErrors.date && <p className="text-red-500 text-xs">{formErrors.date}</p>}
                </div>

                <div className="mb-5 flex flex-col">
                    <label htmlFor="lengthOfStay">Days: </label>
                    <input type="number" value={formData.lengthOfStay} onChange={handleChange} name="lengthOfStay" id="lengthOfStay" required className={`p-1 border rounded ${formErrors.lengthOfStay ? "border-red-500" : "border-brand-brown"}`} />
                    {formErrors.lengthOfStay && <p className="text-red-500 text-xs">{formErrors.lengthOfStay}</p>}
                </div>

                <div className="mb-5 flex flex-col">
                    <label htmlFor="partySize">People: </label>
                    <input type="number" value={formData.partySize} onChange={handleChange} name="partySize" id="partySize" required className={`p-1 border rounded ${formErrors.partySize ? "border-red-500" : "border-brand-brown"}`} />
                    {formErrors.partySize && <p className="text-red-500 text-xs">{formErrors.partySize}</p>}
                </div>

                <div className="flex gap-4 mb-8">
                    <label className="flex gap-2"><input type="checkbox" name="hasPets" checked={formData.hasPets} onChange={handleChange} /> Pets?</label>
                    <label className="flex gap-2"><input type="checkbox" name="hasRV" checked={formData.hasRV} onChange={handleChange} /> RV?</label>
                </div>

                <button type="submit" className="greenButton w-full py-2">
                    {id ? "Update Reservation" : "Create Reservation"}
                </button>
            </form>
        </div>
    );
};
