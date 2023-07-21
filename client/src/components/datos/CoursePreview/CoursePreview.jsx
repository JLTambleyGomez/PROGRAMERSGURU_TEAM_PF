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

    //functions:
    // let slideIndex = 0;
    // showSlides();

    // function showSlides() {
    //     let i;
    //     let slides = document.getElementsByClassName("mySlides");
    //     for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
    //     slideIndex++;
    //     if (slideIndex > slides.length) {slideIndex = 1}
    //     slides[slideIndex-1].style.display = "block";
    //     setTimeout(showSlides, 2000); // Change image every 2 seconds
    // }

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
                        <h2 className={styles.free}>This course is free</h2>
                    ) : (
                        <h2 className={styles.payment}>This course requires payment</h2>
                    )
                }
            </div>
        </div>
    );
};

export default CoursePreview;
