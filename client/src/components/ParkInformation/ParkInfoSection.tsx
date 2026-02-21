'use client';

import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { NPSPark } from "@/services/nps.service";

interface ParkInfoProps {
    parkInfo: NPSPark;
}

export const ParkInfoSection = ({ parkInfo }: ParkInfoProps) => {
    // Optional chaining added to prevent crashes if NPS returns empty arrays
    const phone = parkInfo.contacts?.phoneNumbers?.[0]?.phoneNumber;
    const email = parkInfo.contacts?.emailAddresses?.[0]?.emailAddress;
    const address = parkInfo.addresses?.[0];

    return (
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-brand-dark-brown">{parkInfo.fullName}</h2>
            <p className="mb-8 leading-relaxed">{parkInfo.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 w-full text-left bg-white/40 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                <div>
                    <p className="font-bold text-lg text-brand-green">Contact Information</p>
                    <p>{phone || "N/A"}</p>
                    <p>{email || "N/A"}</p>
                    {address && (
                        <p className="mt-2 italic">
                            {address.line1}<br />
                            {address.city}, {address.stateCode} {address.postalCode}
                        </p>
                    )}
                </div>

                <div>
                    <p className="font-bold text-lg text-brand-green">Hours & Weather</p>
                    <p className="text-sm mb-2">{parkInfo.operatingHours?.[0]?.description}</p>
                    <p className="font-bold text-brand-green mt-4">Current Weather Info</p>
                    <p className="text-sm italic">{parkInfo.weatherInfo}</p>
                </div>
            </div>

            <div className="mb-12">
                <p className="font-bold text-xl mb-2">Directions</p>
                <p className="mb-4 text-sm max-w-2xl">{parkInfo.directionsInfo}</p>
                <Link 
                    href={parkInfo.directionsUrl || "#"} 
                    target="_blank"
                    className="greenButton inline-block px-8 py-2 rounded-full transition-all hover:scale-105"
                >
                    View Official Directions
                </Link>
            </div>

            <div className="mt-4 w-full pb-10">
                <Swiper
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    spaceBetween={20}
                    navigation={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    pagination={{ clickable: true }}
                    loop={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="w-full rounded-xl overflow-hidden"
                >
                    {parkInfo.images?.map((img, index) => (
                        <SwiperSlide key={index} className="pb-12">
                            <div className="flex justify-center group overflow-hidden rounded-lg shadow-lg">
                                <img
                                    src={img.url}
                                    alt={img.altText}
                                    className="h-[250px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};
