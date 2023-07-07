import styles from "./Cards.module.css"
import Card from "../Card/Card";


//_________________________module_________________________
function Cards ( { courses } ) {

    //component:
    return (
        <div className = {styles.container}> 
            <div className = {styles.carouselSlider}>
                {
                    courses.map((course, index) => {
                        return (
                            <Card
                                key = {index}
                                id = {course.id}
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
            <div className={styles.carouselDots}>
                {
                    courses.map((x, index) => {
                        return (
                                <a key = {index} href=""></a>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Cards;