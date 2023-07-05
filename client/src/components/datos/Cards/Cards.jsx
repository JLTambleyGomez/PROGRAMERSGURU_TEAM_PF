
import Card from "../Card/Card";
import styles from "./Cards.module.css"

const Cards = ( { courses } ) => {
    return (
        <div className={styles.container}> 
            {
                courses.map((course) => {
                    return (
                        <Card
                            title = {course.title}
                            description = {course.description}
                            rating = {course.rating}
                            free = {course.free}
                            language = {course.language}
                        />
                    )
                })
            }
        </div>
    )
}

export default Cards;