
const Card = (props) => {
    

    return(
        <div>
            <h1>Title</h1>
            <a href="" target="_blank" rel="noopener noreferrer"><img src={props.ImageUrl}/></a>
            <h2>Description</h2>
            <h2>Rating</h2>
            <h2>Free</h2>
            <h2>Language</h2>
        </div>
    )
}


export default Card
