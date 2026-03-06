'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { NPSCampsite } from "@/types/nps";

interface CampsitesProps {
    campsites: NPSCampsite[];
}

export const Campsites = ({ campsites }: CampsitesProps) => {
    return (
        <div className="flex flex-col w-full">
            <p className="font-bold text-3xl mb-4 text-center text-brand-dark-brown">Campsites</p>
            
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                autoHeight={true}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full rounded-xl overflow-hidden"
            >
                {campsites.map((site, index) => (
                    <SwiperSlide key={site.id || index}>
                        <div className="flex flex-col justify-center items-center px-12 pb-16">
                            <div className="flex flex-col items-center text-center max-w-4xl">
                                <p className="font-bold text-2xl mb-2">{site.name}</p>
                                <p className="mb-4 text-brand-dark-brown/80">{site.description}</p>
                                
                                <p className="font-bold text-lg">Number of Reservable sites: {site.numberOfSitesReservable}</p>
                                <p className="mb-4">{site.reservationInfo}</p>
                                
                                <p className="font-bold text-lg">Directions</p>
                                <p className="mb-6">{site.directionsOverview}</p>
                                
                                {site.url && (
                                    <Link 
                                        href={site.url} 
                                        target="_blank" 
                                        className="my-4 greenButton px-6 py-2 rounded shadow-md transition-transform hover:scale-105"
                                    >
                                        More Information
                                    </Link>
                                )}

                                <div className="flex w-full justify-center mt-6 gap-4 flex-wrap items-center">
                                    {site.images?.map((img, imgIndex) => (
                                        <div key={imgIndex} className="relative h-[200px] w-[300px]">
                                            <img
                                                src={img.url}
                                                alt={img.altText || site.name}
                                                className="h-full w-full object-cover rounded shadow-sm"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
