'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";
import { NPSNews } from "@/types/nps";
import dayjs from "dayjs";

interface NewsReleasesProps {
    newsReleases: NPSNews[];
}

export const NewsReleases = ({ newsReleases }: NewsReleasesProps) => {
    return (
        <div className="flex flex-col h-full w-full">
            <p className="font-bold text-3xl mb-4 text-center text-brand-dark-brown">News Releases</p>
            
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
                {newsReleases.map((news, index) => (
                    <SwiperSlide key={news.id || index} className="h-full">
                        <div className="flex flex-col justify-center items-center h-full px-12 pb-16">
                            <div className="flex flex-col items-center text-center max-w-3xl">
                                <p className="font-bold text-2xl mb-2">{news.title}</p>
                                
                                <p className="font-bold text-brand-green my-2">
                                    {/* Using dayjs for quick TS-friendly formatting */}
                                    {dayjs(news.releaseDate).format('MMMM D, YYYY')}
                                </p>
                                
                                <p className="text-brand-dark-brown/90 leading-relaxed">
                                    {news.abstract}
                                </p>
                                
                                {news.url && (
                                    <Link 
                                        href={news.url} 
                                        target="_blank"
                                        className="my-6 greenButton px-8 py-2 rounded shadow-md transition-all hover:scale-105"
                                    >
                                        Read Article
                                    </Link>
                                )}

                                {news.image?.url && (
                                    <div className="relative mt-4 group">
                                        <img 
                                            src={news.image.url} 
                                            alt={news.image.altText || news.title} 
                                            className="h-[250px] w-auto object-cover rounded-lg shadow-lg border border-white/20"
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
