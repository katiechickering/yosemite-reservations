import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { Link } from "react-router-dom"

export const Campsites = ({ campsites }) => {

    return (
        <div className="flex flex-col">
            <p className="font-bold text-3xl mb-4 text-center">Campsites</p>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                autoHeight={true}
                navigation={true}
                pagination={{clickable: true}}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full"
            >
                {campsites.map(({url, name, description, reservationInfo, directionsOverview, images, numberOfSitesReservable}, index) => (
                    <SwiperSlide key={index}>
                        <div className="flex flex-col justify-center items-center px-12 pb-10">
                            <div className="flex flex-col items-center">
                                <p className="font-bold text-lg">{name}</p>
                                <p className="mb-4">{description}</p>
                                <p className="font-bold text-lg">Number of Reservable sites: {numberOfSitesReservable}</p>
                                <p className="mb-4">{reservationInfo}</p>
                                <p className="font-bold text-lg">Directions</p>
                                <p>{directionsOverview}</p>
                                <Link to={url} className="my-4 greenButton">More Information</Link>
                                <div className="flex w-full justify-center mt-4 gap-4 flex-wrap items-center">
                                    {images?.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img.url}
                                            alt={img.altText}
                                            className="h-[200px] rounded"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}