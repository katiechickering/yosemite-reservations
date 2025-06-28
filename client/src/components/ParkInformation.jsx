import { Link } from "react-router-dom"
import { get10NewsReleases, get10ThingsToDo, getCampsites, getParkInfo } from "../services/NpsService"
import { useEffect, useState } from "react"
import { formatDate } from "../utils/FormatFunctions"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import { toast } from "react-toastify"

export const ParkInformation = () => {

    const [parkData, setParkData] = useState({})
    const [loading, setLoading] = useState({
        parkInfo: "Loading park information...",
        thingsToDo: "Loading things to do...",
        newsReleases: "Loading news releases...",
        campsites: "Loading campsites..."
    })
    const [errors, setErrors] = useState({parkInfo: false, thingsToDo: false, newsReleases: false, campsites: false});

    // API Calls
    useEffect(() => {

        getParkInfo()
        .then(res => {
            setParkData(prev => ({...prev, parkInfo: res}))
        })
        .catch(error => {
            console.log("getParkInfo error:", error)
            setParkData(prev => ({...prev, parkInfo: []}))
            setErrors(prev => ({ ...prev, parkInfo: "NPS API failed to load park information. Please try again later." }))
            toast.error("NPS API failed to load park information. Please try again later.")
        })
        .finally(() => setLoading(prev => ({...prev, parkInfo: false})))

        get10ThingsToDo()
        .then(res => {
            setParkData(prev => ({...prev, thingsToDo: res}))
        })
        .catch(error => {
            console.log("get10ThingsToDo error:", error)
            setParkData(prev => ({...prev, thingsToDo: []}))
            setErrors(prev => ({ ...prev, thingsToDo: "NPS API failed to load things to do information. Please try again later." }))
            toast.error("NPS API failed to load things to do. Please try again later.")
        })
        .finally(() => setLoading(prev => ({...prev, thingsToDo: false})))

        get10NewsReleases()
        .then(res => {
            setParkData(prev => ({...prev, newsReleases: res}))
        })
        .catch(error => {
            console.log("get10NewsReleases error:", error)
            setParkData(prev => ({...prev, newsReleases: []}))
            setErrors(prev => ({ ...prev, newsReleases: true }))
            toast.error("NPS API failed to load news releases. Please try again later.")
        })
        .finally(() => setLoading(prev => ({...prev, newsReleases: false})))

        getCampsites()
        .then(res => {
            setParkData(prev => ({...prev, campsites: res}))
        })
        .catch(error => {
            console.log("getCampsites error:", error)
            setParkData(prev => ({...prev, campsites: []}))
            setErrors(prev => ({ ...prev, campsites: "NPS API failed to load campsite information. Please try again later." }))
            toast.error("NPS API failed to load campsites. Please try again later.")
        })
        .finally(() => setLoading(prev => ({...prev, campsites: false})))

    }, [])

    return (
        <div className="flex flex-col bg-brandLightestGreen w-screen py-8 px-25">

            {/* Park information section*/}
            <div className="border-2 border-brandDarkBrown w-full rounded-xl p-4 bg-white flex flex-col">
                {loading.parkInfo ? (
                    <p>{loading.parkInfo}</p>
                ) : errors.parkInfo ? (
                    <p className="text-red-500 text-center">{errors.parkInfo}</p>
                ) : (
                    <div className="flex flex-col items-center">
                        <p className="text-3xl font-bold mb-4">{parkData.parkInfo.fullName}</p>
                        <p className="mb-4">{parkData.parkInfo.description}</p>
                        <p className="font-bold">Contact Information</p>
                        <p>{parkData.parkInfo.contacts.phoneNumbers[0].phoneNumber}</p>
                        <p>{parkData.parkInfo.contacts.emailAddresses[0].emailAddress}</p>
                        <p className="mb-4">
                            {parkData.parkInfo.addresses[0].line1}{" "}
                            {parkData.parkInfo.addresses[0].city},{" "}
                            {parkData.parkInfo.addresses[0].stateCode}{" "}
                            {parkData.parkInfo.addresses[0].postalCode}
                        </p>
                        <p className="font-bold">Directions</p>
                        <p>{parkData.parkInfo.directionsInfo}</p>
                        <Link to={parkData.parkInfo.directionsUrl} className="mb-6 greenButton">Directions Link</Link>
                        <p className="font-bold">Hours of Operation</p>
                        <p className="mb-4">{parkData.parkInfo.operatingHours[0].description}</p>
                        <p className="font-bold">Weather</p>
                        <p className="mb-4">{parkData.parkInfo.weatherInfo}</p>
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
                                {parkData.parkInfo.images.map((img, i) => (
                                <SwiperSlide key={i}>
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
                )}
            </div>

            <div className="flex justify-between my-10 items-stretch">

                {/* Things to do section*/}
                <div className="border-2 rounded-xl p-4 bg-white w-[48%] flex flex-col">
                    {loading.thingsToDo ? (
                        <p>{loading.thingsToDo}</p>
                    ) : errors.thingsToDo ? (
                        <p className="text-red-500 text-center">{errors.thingsToDo}</p>
                    ) : (
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
                                {parkData.thingsToDo.map(({title, shortDescription, isReservationRequired, images}, index) => (
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
                    )}
                </div>

                {/* News releases section */}
                <div className="border-2 rounded-xl p-4 bg-white w-[48%] flex flex-col">
                    {loading.newsReleases ? (
                        <p>{loading.newsReleases}</p>
                    ) : errors.newsReleases ? (
                        <p className="text-red-500 text-center">{errors.newsReleases}</p>
                    ) : (
                        <div className="flex flex-col h-full">
                            <p className="font-bold text-3xl mb-4 text-center">News Releases</p>
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
                                {parkData.newsReleases.map(({url, title, abstract, image, releaseDate}, index) => (
                                    <SwiperSlide key={index} className="h-full">
                                        <div className="flex flex-col justify-center items-center h-full px-12 pb-10">
                                            <div className="flex flex-col items-center">
                                                <p className="font-bold text-center">{title}</p>
                                                <p className="font-bold my-4">{formatDate(releaseDate)}</p>
                                                <p>{abstract}</p>
                                                <Link to={url} className="my-6 greenButton">Read Article</Link>
                                                {image.url && <img src={image.url} alt={image.altText} className="h-[200px] mt-4 rounded"/>}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    )}
                </div>

            </div>

            {/* Campsites section */}
            <div className="border-2 border-brandDarkBrown w-full rounded-xl p-4 bg-white flex flex-col">
                {loading.campsites ? (
                    <p>{loading.campsites}</p>
                ) : errors.campsites ? (
                    <p className="text-red-500 text-center">{errors.campsites}</p>
                ) : (
                    <div className="flex flex-col">
                        <p className="font-bold text-3xl mb-4 text-center">Campsites</p>
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
                            className="w-full"
                        >
                            {parkData.campsites.map(({url, name, description, reservationInfo, directionsOverview, images, numberOfSitesReservable}, index) => (
                                <SwiperSlide key={index} className="">
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
                                                {images?.map((img, i) => (
                                                    <img
                                                        key={i}
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
                )}
            </div>

        </div>
    )
}
