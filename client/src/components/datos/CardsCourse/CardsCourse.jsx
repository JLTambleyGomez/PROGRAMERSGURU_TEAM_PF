import styles from "./CardsCourse.module.css";
import CardCourse from "../CardCourse/CardCourse";

//_________________________module_________________________
function CardsCourse ( { allCourses } ) {

 

    //component:
    return (
        <div className={styles.cardsCourseComponent}>
            {
                allCourses.map((course, index) => {
                    return (
                        <CardCourse
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

export default CardsCourse;