import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { get_courses_by_name } from "../../../Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { get_courses_all } from "../../../Redux/actions";

import styles from "./CardsCourse.module.css"
import CardCourse from "../CardCourse/CardCourse";

//_________________________module_________________________
function CardsCourse ( { courses } ) {

    //state:
    // const courses = useSelector((state) => state.courses)

    //const:
    const { pathname } = useLocation();
    const dispatch = useDispatch();

    //life-cycle:
    // useEffect(() => {
        // dispatch(get_courses_all())
        // console.log(courses)
    // }, [])

    //component:
    return (
        <div className={styles.cardsCourseComponent}>
            {
                courses.map((course, index) => {
                    return (
                        <CardCourse
                            key={index}
                            id={course.id}
                            title={course.title}
                            description={course.description}
                            rating={course.rating}
                            free={course.free}
                            language={course.language}
                            imageURL={course.imageURL}
                        />
                    )
                })
            }
        </div>
    )
}

export default CardsCourse  