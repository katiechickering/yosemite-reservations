'use client'; // Required for Swiper interactivity

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { NPSActivity } from "@/types/nps";

// Ensure your Swiper CSS is imported in layout.tsx or globals.css

interface ThingsToDoProps {
    thingsToDo: NPSActivity[];
}

export const ThingsToDo = ({ thingsToDo }: ThingsToDoProps) => {
    return (
        <div className="flex flex-col h-full w-full">
            <p className="font-bold text-3xl mb-4 text-center text-brand-dark-brown">
                Things To Do
            </p>
            
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full rounded-xl"
            >
                {thingsToDo.map((activity, index) => (
                    <SwiperSlide key={activity.id || index} className="h-full">
                        <div className="flex flex-col justify-center items-center h-full px-12 pb-16">
                            <div className="flex flex-col items-center text-center max-w-2xl">
                                <p className="font-bold text-2xl mb-4">{activity.title}</p>
                                
                                <p className="text-brand-dark-brown/90 leading-relaxed">
                                    {activity.shortDescription}
                                </p>
                                
                                <p className={`my-6 font-bold py-1 px-4 rounded-full text-sm ${
                                    activity.isReservationRequired === "true" 
                                        ? "bg-red-100 text-red-700" 
                                        : "bg-green-100 text-green-700"
                                }`}>
                                    {activity.isReservationRequired === "true" 
                                        ? "Reservation Required" 
                                        : "No Reservation Required"}
                                </p>

                                {activity.images?.[0]?.url && (
                                    <div className="relative group">
                                        <img 
                                            src={activity.images[0].url} 
                                            alt={activity.images[0].altText || activity.title} 
                                            className="h-[250px] w-auto object-cover rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};
