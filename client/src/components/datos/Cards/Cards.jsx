import React from "react";

import { Swiper, SwiperSlide } from 'swiper/react';



import "./Cards.css"
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; 
import "swiper/css/navigation";
import Card from "../Card/Card";


import { EffectCoverflow, Pagination, Navigation } from "swiper/modules"

//_________________________module_________________________
function Cards ( { courses } ) {

    //component:
    return (
        <div className = "courses-container"> 
            <Swiper
                modules={[EffectCoverflow, Pagination, Navigation]}
                // effect={"coverflow"}
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
                pagination={{clickable: true}}
                navigation
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
            </Swiper>
                {/* <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                    </div>
                    <div className="swiper-button-next slider-arrow">
                    </div>
                    <div className="swiper-pagination">
                    </div>
                </div> */}
            {/* <div className = {styles.carouselSliderWrapper}>
                <div className={styles.carouselSlider}>
                    {
                        courses.map((course, index) => {
                            return (
                                <div id = {index} className={styles.carouselSliderCourse}>
                                    <Card
                                        key = {index}
                                        title = {course.title}
                                        description = {course.description}
                                        rating = {course.rating}
                                        free = {course.free}
                                        language = {course.language}
                                    />
                                </div>
                            )
                        })
                    }
                </div>

                <div className={styles.carouselDots}>
                    {
                        courses.map((x, index) => {
                            return (
                                <a key = {index} href= {`#${index}`}></a>
                                )
                            })
                    }
                </div>
            </div> */}
        </div>
    )
}

export default Cards;