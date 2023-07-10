import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import styles from "./Card.module.css";


//_________________________module_________________________
function Card ({ id,title, description, rating, isFree, language }) {
    
    
    const darkmode = useSelector((state)=> state.darkMode);
    const [elementClasses, setElementClasses] = useState({
          h1: "h1light",
          input: "inputlight",
          button: "buttonlight",
          buttoncontainer:"buttoncontainerlight",
          container: "containerslight",
          label: "labellight",
          p:"plight",
          div:"divlight",
          span:"spanlight",
          form: "formlight",
          hr: "hrlight",
          error:"errorlight",
          success:"successlight",
          link:"linklight",
          ul:"ullight",
          h2:"h2light",
          
        });
    
 useEffect(() => {
            const updatedElementClasses = {};
        
            Object.keys(elementClasses).forEach((key) => {
              updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
            });
        
            setElementClasses(updatedElementClasses);
          }, [darkmode]);


    //component:
    return (
        <div className={`${styles.container} ${styles[elementClasses.container]}`}>
        <NavLink  className={`${styles.link} ${styles[elementClasses.link]}`} to={`/CourseDetails/${id}`} >{title}</NavLink>
            <h2 className={`${styles.p} ${styles[elementClasses.p]}`}>{description}</h2>
            <h2 className={`${styles.h2} ${styles[elementClasses.h2]}`}>{rating}</h2>
            {
                isFree === true ? (
                    <h2 className={styles.free}>This course is free</h2>
                ) : (
                    <h2 className={styles.payment}>This course requires payment</h2>
                )
            }
            <h2 className={`${styles.h2} ${styles[elementClasses.h2]}`}>{language}</h2>
            <h1>{id}</h1>
           
        </div>
    );
};

export default Card;
