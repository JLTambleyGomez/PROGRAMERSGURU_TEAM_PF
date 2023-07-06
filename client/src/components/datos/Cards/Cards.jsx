import styles from "./Cards.module.css"
import Card from "../Card/Card";


//_________________________module_________________________
function Cards ( { courses } ) {

    //component:
    return (
        <div className = {styles.container}> 
            {
                courses.map((course, index) => {
                    return (
                        <Card
                            key = {index}
                            title = {course.title}
                            description = {course.description}
                            rating = {course.rating}
                            isFree = {course.isFree}
                            language = {course.language}
                        />
                    )
                })
            }
        </div>
    )
}

export default Cards;