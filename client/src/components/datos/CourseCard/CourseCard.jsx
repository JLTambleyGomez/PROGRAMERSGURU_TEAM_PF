import { useState } from "react";
import Card from "react-bootstrap/Card";

import styles from "./CourseCard.module.css";

//_________________________module_________________________
function CourseCard ({ id, title, meanRating, isFree, language, courseUrl, released, description, imageURL }) {

    //states:
    const [isFlipped, setIsFlipped] = useState(false);

    //const:
    const handleMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    //component:
    return (
        <div className={styles.cardContainer}>
            <Card
                className={styles.card}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={`${styles.cardContent} ${isFlipped ? styles.flipped : ""}`}>
                    <div className={styles.front}>
                        <Card.Body>
                            <Card.Title className={styles.title}>{title}</Card.Title>
                            <Card.Text> <img className={styles.img}src={imageURL} alt="sample45" /> </Card.Text>
                        </Card.Body>
                    </div>

                    <div className={styles.back}>
                        <Card.Body>
                            <Card.Title>Coste:{isFree}</Card.Title>  
                            <Card.Title>Rating : {meanRating}</Card.Title>  
                            <Card.Title>Idioma : {language}</Card.Title>  
                            <Card.Title><a className={styles.link} href= {courseUrl} target="_blank" rel="noopener noreferrer">VISITAR</a>
                            </Card.Title>  
                            <Card.Title>Fecha de lanzamiento {released}</Card.Title>  
                            <Card.Text className={styles.description}> {description}</Card.Text>
                        </Card.Body>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default CourseCard;