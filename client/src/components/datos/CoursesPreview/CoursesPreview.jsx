import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from "swiper/modules";

import "./CoursesPreview.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination"; 
import "swiper/css/navigation";
import CoursePreview from "../CoursePreview/CoursePreview";

// ChatGPT 💕
//_________________________module_________________________
function CoursesPreview ( { courses } ) {

    //component:
    return (
            <div className = "coursesSwiperComponent"> 
                <div className="navigation-container">
                    <Swiper
                        autoplay={{
                            delay: 2500,
                            pauseOnMouseEnter: true,
                            disableOnInteraction: false,
                        }}                 
                        enabled={true}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
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
                                    <CoursePreview
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
                        {/* <div className="navigation-container">
                        </div> */}
                    </Swiper>
                    {/* <div className="navigation-container2">
                        <button className="swiper-button-next" />
                        <button className="swiper-button-prev" />
                    </div> */}
                </div>
                <div className="swiper-pagination">
                    {
                        courses.map((course, index) => (
                            <span key={index} className="swiper-pagination-bullet"></span>
                        ))
                    }
                </div>
            </div>
    )
}

export default CoursesPreview;