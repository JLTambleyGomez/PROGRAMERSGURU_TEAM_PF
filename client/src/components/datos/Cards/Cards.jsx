
import Card from "../Card/Card";

const Cards = ( { courses } ) => {
    return (
        <div>
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