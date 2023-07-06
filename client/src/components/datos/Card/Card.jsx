import { Link } from 'react-router-dom';

import styles from "./Card.module.css";


//_________________________module_________________________
function Card ({ title, description, rating, free, language }) {
    
    //component:
    return (
        <div className={styles.cardContainer}>
            {/* TITLE */}
            <Link to={"/CourseDetails/1"}>
                <h1 className={styles.title}>{title}</h1>
            </Link>
            {/* DESCRIPTION */}
            <h2 className={styles.description}>{description}</h2>
            {/* RATING */}
            <h2 className={styles.rating}>{rating}</h2>
            {/* PRICING */}
            {
                free === true ? (
                    <h2 className={styles.free}>This course is free</h2>
                ) : (
                    <h2 className={styles.payment}>This course requires payment</h2>
                )
            }
            {/* LANGUAGE */}
            <h2 className={styles.language}>{language}</h2>
        </div>
    );
};

export default Card;
