'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useLogin } from '@/context/UserContext';
import { 
    get10NewsReleases, 
    get10ThingsToDo, 
    getCampsites, 
    getParkInfo 
} from "@/services/nps.service";
import { ParkInfoSection } from "@/components/ParkInformation/ParkInfoSection";
import { ThingsToDo } from "@/components/ParkInformation/ThingsToDo";
import { NewsReleases } from "@/components/ParkInformation/NewsReleases";
import { Campsites } from "@/components/ParkInformation/Campsites";
import { NPSPark, NPSActivity, NPSNews, NPSCampsite } from "@/types/nps";

export default function ParkInformation() {
    const [parkData, setParkData] = useState<{
        parkInfo?: NPSPark;
        thingsToDo?: NPSActivity[];
        newsReleases?: NPSNews[];
        campsites?: NPSCampsite[];
    }>({});
    const [loading, setLoading] = useState({
        getParkInfo: "Loading park information..." as string | false,
        get10ThingsToDo: "Loading things to do..." as string | false,
        get10NewsReleases: "Loading news releases..." as string | false,
        getCampsites: "Loading campsites..." as string | false
    });
    const [apiErrors, setApiErrors] = useState<Record<string, string>>({})

    const router = useRouter();
    const { isLoggedIn } = useLogin();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
        } else {
            getParkInfo()
                .then(res => {
                    setParkData((prev) => ({ ...prev, parkInfo: res }));
                })
                .catch(error => {
                    console.log("getParkInfo error:", error);
                    setApiErrors((prev) => ({ ...prev, getParkInfo: "NPS API failed to load park information. Please try again later." }));
                    toast.error("NPS API failed to load park information. Please try again later.");
                })
                .finally(() => setLoading((prev) => ({ ...prev, getParkInfo: false })));

            get10ThingsToDo()
                .then(res => {
                    setParkData((prev) => ({ ...prev, thingsToDo: res }));
                })
                .catch(error => {
                    console.log("get10ThingsToDo error:", error);
                    setApiErrors((prev) => ({ ...prev, get10ThingsToDo: "NPS API failed to load things to do. Please try again later." }));
                    toast.error("NPS API failed to load things to do. Please try again later.");
                })
                .finally(() => setLoading((prev) => ({ ...prev, get10ThingsToDo: false })));

            get10NewsReleases()
                .then(res => {
                    setParkData((prev) => ({ ...prev, newsReleases: res }));
                })
                .catch(error => {
                    console.log("get10NewsReleases error:", error);
                    setApiErrors((prev) => ({ ...prev, get10NewsReleases: "NPS API failed to news releases. Please try again later." }));
                    toast.error("NPS API failed to load news releases. Please try again later.");
                })
                .finally(() => setLoading((prev) => ({ ...prev, get10NewsReleases: false })));

            getCampsites()
                .then(res => {
                    setParkData((prev) => ({ ...prev, campsites: res }));
                })
                .catch(error => {
                    console.log("getCampsites error:", error);
                    setApiErrors((prev) => ({ ...prev, getCampsites: "NPS API failed to load campsite information. Please try again later." }));
                    toast.error("NPS API failed to load campsites. Please try again later.");
                })
                .finally(() => setLoading((prev) => ({ ...prev, getCampsites: false })));
        }
    }, [isLoggedIn, router]);

    return (
        <div className="flex flex-col pb-12">

            {/* Park information section*/}
            <div className="border-2 border-brand-dark-brown w-full rounded-xl p-4 bg-white flex flex-col">
                {loading.getParkInfo && <p className="text-center">{loading.getParkInfo}</p>}
                {apiErrors.getParkInfo && <p className="text-red-500 text-center">{apiErrors.getParkInfo}</p>}
                {parkData.parkInfo && <ParkInfoSection parkInfo={parkData.parkInfo} />}
            </div>

            <div className="flex justify-between my-10 items-stretch">

                {/* Things to do section*/}
                <div className="border-2 rounded-xl p-4 bg-white w-[48%] flex flex-col">
                    {loading.get10ThingsToDo && <p className="text-center">{loading.get10ThingsToDo}</p>}
                    {apiErrors.get10ThingsToDo && <p className="text-red-500 text-center">{apiErrors.get10ThingsToDo}</p>}
                    {parkData.thingsToDo && <ThingsToDo thingsToDo={parkData.thingsToDo} />}
                </div>

                {/* News releases section */}
                <div className="border-2 rounded-xl p-4 bg-white w-[48%] flex flex-col">
                    {loading.get10NewsReleases && <p className="text-center">{loading.get10NewsReleases}</p>}
                    {apiErrors.get10NewsReleases && <p className="text-red-500 text-center">{apiErrors.get10NewsReleases}</p>}
                    {parkData.newsReleases && <NewsReleases newsReleases={parkData.newsReleases} />}
                </div>

            </div>

            {/* Campsites section */}
            <div className="border-2 border-brand-dark-brown w-full rounded-xl p-4 bg-white flex flex-col">
                {loading.getCampsites && <p className="text-center">{loading.getCampsites}</p>}
                {apiErrors.getCampsites && <p className="text-red-500 text-center">{apiErrors.getCampsites}</p>}
                {parkData.campsites && <Campsites campsites={parkData.campsites} />}
            </div>

        </div>
    )
}
