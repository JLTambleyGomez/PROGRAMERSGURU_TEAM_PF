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
                pagination={{el:"swiper-pagination", clickable: true}}
                navigation={{
                    prevEl:"swiper-button-prev",
                    nextEl:"swiper-button-next",
                    clickable: true
                }}
                modules={[EffectCoverflow, Pagination, Navigation]}
                className="swiper-container"
            >
                {
                        courses.map((course, index) => {
                            return (
                                <SwiperSlide id = {index}>
                                    <Card
                                        key = {index}
                                        title = {course.title}
                                        description = {course.description}
                                        rating = {course.rating}
                                        free = {course.free}
                                        language = {course.language}
                                    />
                                </SwiperSlide>
                            )
                        })
                }
                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                    </div>
                    <div className="swiper-button-next slider-arrow">
                    </div>
                    <div className="swiper-pagination">
                        <h1>PAGINATION</h1>
                        {/* {
                            courses.map((x, index) => {
                                return (
                                    <a key = {index} href= {`#${index}`}></a>
                                    )
                                })
                        } */}
                    </div>
                </div>
            </Swiper>
        </div>
    )
}

export default Cards;