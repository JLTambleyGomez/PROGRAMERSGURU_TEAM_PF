import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import "./Cards.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; 
import "swiper/css/navigation";
import Card from "../Card/Card";

// ChatGPT 💕
//_________________________module_________________________
function Cards ( { courses } ) {

    //component:
    return (

        <div className = "container"> 
            <div className = "courses-container"> 
                <Swiper
                    enabled={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    effect={"coverflow"}
                    spaceBetween={100}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={1}
                    keyboard={{
                        enabled: true,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 200,
                        modifier: 2.5,
                        slideShadows: false
                    }}
                    mousewheel
                    pagination={{
                        el:".swiper-pagination",
                        clickable: true
                    }}
                    allowSlideNext={true}
                    navigation={{
                        prevEl:".swiper-button-prev",
                        nextEl:".swiper-button-next",
                    }}
                    className="swiper-container"
                    nested={true}
                >
                    {
                        courses.map((course) => (
                            <SwiperSlide key={course.id} style={{ margin: 0 }}>
                            <Card
                                id={course.id}
                                title={course.title}
                                description={course.description}
                                rating={course.rating}
                                free={course.free}
                                language={course.language}
                                imageURL={course.imageURL}
                                className="courseCardContainer"
                            />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
                <div className="swiper-pagination">
                    {
                        courses.map((course, index) => (
                            <span key={index} className="swiper-pagination-bullet"></span>
                        ))
                    }
                </div>
                <div className="navigation-container">
                    <button className="swiper-button-prev" />
                    <button className="swiper-button-next" />
                </div>
            </div>
        </div>
    )
}

export default Cards;