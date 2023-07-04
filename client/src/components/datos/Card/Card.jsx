

const Card = ( { Title, Description, Rating, Free, Language } ) => {
    return (
        <div>
            <h1>{Title}</h1>
            <h2>{Description}</h2>
            <h2>{Rating}</h2>
            {
                Free === true
                ? <h2>This course is free</h2>
                : <h2>This course requires payment</h2>
            }
            <h2>{Language}</h2>
        </div>
    )
}

export default Card;