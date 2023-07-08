import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "./Cards.css";
import Card from "../Card/Card";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; 
import "swiper/css/navigation";

//_________________________module_________________________
function Cards ( { courses } ) {

    //component:
    return (
        <div className = "courses-container"> 
            <Swiper
                modules={[EffectCoverflow, Pagination, Navigation]}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5
                }}
                pagination={{
                    clickable: true
                }}
                navigation
                className="swiper-container"
            >
                {
                    courses.map((course, index) => {
                        return (
                            <SwiperSlide id = {index}>
                                <Card
                                    key = {index}
                                    id = {course.id}
                                    title = {course.title}
                                    description = {course.description}
                                    rating = {course.rating}
                                    free = {course.free}
                                    language = {course.language}
                                    imageURL={course.imageURL}
                                />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>
        </div>
    )
}

export default Cards;