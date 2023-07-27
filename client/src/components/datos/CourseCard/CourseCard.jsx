import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, } from "react-router-dom";
import Card from "react-bootstrap/Card";

import { Dark_Mode } from "../../../Redux/actions";

import styles from "./CourseCard.module.css";

//_________________________module_________________________
function CourseCard ({ id, title, meanRating, isFree, language, courseUrl, released, description, imageURL }) {


    //global states:
    const dark = useSelector((state) => state.darkMode);
    
    //states:
    const [isFlipped, setIsFlipped] = useState(false);

    //const:
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //functions:
    const handleclickcardtodetail = ()=>{
        navigate(`/CourseDetails/${id}`)
    }

    const handleMouseEnter = () => {
        setIsFlipped(true);
    };

    const handleMouseLeave = () => {
        setIsFlipped(false);
    };

    //life-cycles:
    useEffect(() => {
        dispatch(Dark_Mode());
    }, [dark])

    //component:
    return (
        <div className={`${styles.component}`}>
            <Card
                className={styles.card}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div onClick={handleclickcardtodetail} className={`${styles.cardContent} ${isFlipped ? styles.flipped : ""}`}>

                    <div className={styles.front}>
                        <Card.Body>
                            <Card.Title className={styles.title}>{title}</Card.Title>
                            <Card.Text> <img className={styles.img}src={imageURL} alt="sample45" /> </Card.Text>
                        </Card.Body>
                    </div>

                    <div className={styles.back}>
                        <Card.Body>
                            <Card.Title>Coste:{isFree ? "gratis" : "pago"}</Card.Title>  
                            <Card.Title>Rating : {meanRating}</Card.Title>  
                            <Card.Title>Idioma : {language}</Card.Title>  
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