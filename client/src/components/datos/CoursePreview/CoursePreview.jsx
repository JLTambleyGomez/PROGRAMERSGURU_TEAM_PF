import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Dark_Mode } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import styles from "./CoursePreview.module.css";

//_________________________module_________________________
function CoursePreview ({ id, title, description, rating, isFree, language, imageURL }) {


    //global states:
    const dark = useSelector((state) => state.darkMode);

    //const:
    const dispatch = useDispatch();

    //life-cycles:
    useEffect(() => {
        dispatch(Dark_Mode());
    }, [dark])


    //component:
    return (
        <div className={`${styles.component} ${styles[theme("component")]}`}>
            <div className={`${styles.container1} ${styles[theme("container1")]}`}>
                <NavLink className={`${styles.title} ${styles[theme("title")]}`} to={`/CourseDetails/${id}`}>{title}</NavLink>
                <h2 className={`${styles.description} ${styles[theme("description")]}`}>{description}</h2>
                {/* <h2 className={`${styles.h2} ${styles[theme("h2")]}`}>{rating}</h2> */}
                {/* <h2 className={`${styles.h2} ${styles[theme("h2")]}`}> Course Language : {language}</h2> */}
            </div>
            <div className={`${styles.container2} ${styles[theme("container2")]}`}>
                <img src={imageURL} alt="sample45" /> 
                {
                    isFree === true ? (
                        <h2 className={styles.free}>Este curso es gratuito</h2>
                    ) : (
                        <h2 className={styles.payment}>Este curso require pago</h2>
                    )
                }
            </div>
        </div>
    );
};

export default CoursePreview;
