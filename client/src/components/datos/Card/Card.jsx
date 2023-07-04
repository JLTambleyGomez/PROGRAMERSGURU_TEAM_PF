

const Card = ( { Title, Description, Rating,Free, Language } ) => {
    return (
        <div>
            <h1>{Title}</h1>
            <h2>{Description}</h2>
            <h2>{Rating}</h2>
            <h2>{Free}</h2>
            <h2>{Language}</h2>
        </div>
    )
}

export default Card;