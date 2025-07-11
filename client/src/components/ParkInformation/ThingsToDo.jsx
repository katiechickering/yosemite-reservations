import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"

export const ThingsToDo = ({ thingsToDo }) => {

    return (
        <div className="flex flex-col h-full">
            <p className="font-bold text-3xl mb-4 text-center">Things To Do</p>
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
                className="w-full h-full"
            >
                {thingsToDo.map(({title, shortDescription, isReservationRequired, images}, index) => (
                    <SwiperSlide key={index} className="h-full">
                        <div className="flex flex-col justify-center items-center h-full px-12">
                            <div className="flex flex-col items-center">
                                <p className="font-bold mb-4 text-center">{title}</p>
                                <p>{shortDescription}</p>
                                <p className="my-4 font-bold">
                                    {isReservationRequired == "true" 
                                    ? "Reservation Required"
                                    : "No Reservation Required"}
                                </p>
                                <img src={images[0].url} alt={images[0].altText} className="h-[200px] rounded"/>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}