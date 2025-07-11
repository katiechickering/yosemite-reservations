import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { Link } from "react-router-dom"

export const ParkInfoSection = ({ parkInfo }) => {

    return (
        <div className="flex flex-col items-center">
            <p className="text-3xl font-bold mb-4">{parkInfo.fullName}</p>
            <p className="mb-4">{parkInfo.description}</p>
            <p className="font-bold">Contact Information</p>
            <p>{parkInfo.contacts.phoneNumbers[0].phoneNumber}</p>
            <p>{parkInfo.contacts.emailAddresses[0].emailAddress}</p>
            <p className="mb-4">
                {parkInfo.addresses[0].line1}{" "}
                {parkInfo.addresses[0].city},{" "}
                {parkInfo.addresses[0].stateCode}{" "}
                {parkInfo.addresses[0].postalCode}
            </p>
            <p className="font-bold">Directions</p>
            <p>{parkInfo.directionsInfo}</p>
            <Link to={parkInfo.directionsUrl} className="mb-6 greenButton">Directions Link</Link>
            <p className="font-bold">Hours of Operation</p>
            <p className="mb-4">{parkInfo.operatingHours[0].description}</p>
            <p className="font-bold">Weather</p>
            <p className="mb-4">{parkInfo.weatherInfo}</p>
            <div className="mt-4 w-full">
                <Swiper
                    slidesPerView={3}
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
                    className="w-full"
                >
                    {parkInfo.images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex justify-center">
                                <img
                                    src={img.url}
                                    alt={img.altText}
                                    className="h-[200px] object-cover rounded"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}