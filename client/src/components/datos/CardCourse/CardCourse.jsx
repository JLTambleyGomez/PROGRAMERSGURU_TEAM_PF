import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import styles from "./CardCourse.module.css";

//_________________________module_________________________
function CardCourse ( { id, title, description, rating, isFree, language, imageURL } ) {

    //component:
    return (
        <div className = {styles.cardCourseComponent}>
            {/* <img src={imageURL}/> */}
            <p>{title}</p>
            <p>{rating}</p>
            <p>{isFree}</p>
            <p>{language}</p>
        </div>
    )
}

export default CardCourse;