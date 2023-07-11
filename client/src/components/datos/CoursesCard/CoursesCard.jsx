import s from "./CoursesCard.module.css";
import CourseCard from "../CourseCard/CourseCard";

//_________________________module_________________________
function CoursesCard ( { allCourses } ) {

    //component:
    return (
        <div className={s.component}>
            {
                allCourses.map((course, index) => {
                    return (
                        <CourseCard
                            key={index}
                            id={course.id}
                            title={course.title}
                            description={course.description}
                            meanRating={course.meanRating}
                            isFree={course.isFree}
                            language={course.language}
                            imageURL={course.imageURL}
                            courseUrl={course.courseUrl}
                            released ={course.released}
                        />
                    )
                })
            }
        </div>
    )
}

export default CoursesCard;