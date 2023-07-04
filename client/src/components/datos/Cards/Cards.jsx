
import Card from "../Card/Card";

const Cards = ( { cursos } ) => {
    return (
        <div>
            {
                cursos.map((curso) => {
                    return (
                        <Card
                            Title = {curso.Title}
                            Description = {curso.Description}
                            Rating = {curso.Rating}
                            Free = {curso.Free}
                            Language = {curso.Language}
                        />
                    )
                })
            }
        </div>
    )
}

export default Cards;