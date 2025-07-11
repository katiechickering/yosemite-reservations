import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import { Link } from "react-router-dom"
import { formatDate } from "../../utils/FormatFunctions"

export const NewsReleases = ({ newsReleases }) => {

    return (
        <div className="flex flex-col h-full">
            <p className="font-bold text-3xl mb-4 text-center">News Releases</p>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                navigation={true}
                pagination={{clickable: true}}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="w-full h-full"
            >
                {newsReleases.map(({url, title, abstract, image, releaseDate}, index) => (
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
    )
}