import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { get_courses_by_id, clearCourses, clearMessage, } from "../../../Redux/actions";

import axios from "axios"; //remover axios => axiosRequests.js
import styles from "./CoursesDetails.module.css";

//_________________________module_________________________
function CourseDetails () {

    //global states:
    const course = useSelector((state) => state.allCourses);
    const favorites = useSelector((state) => state.favorites);
    const darkmode = useSelector((state)=> state.darkMode);

    //states:
    const [isFav, setFav] = useState(false);

    //const:
    const dispatch = useDispatch();
    let { id } = useParams();
    id = parseInt(id);

    const [elementClasses, setElementClasses] = useState({
        h1: "h1light",
        input: "inputlight",
        button: "buttonlight",
        buttoncontainer:"buttoncontainerlight",
        container: "containerslight",
        label: "labellight",
        a:"alight",
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

    //functions:
    const getDetails = async () => {
        await dispatch(get_courses_by_id(id))
    }

    //esto es para renderizar y dar funcion a un boton que agrege un favorito
    const postFavoritesRequest = async () => {
        const ids={idCourse:id, idUser:1}
        await axios.post("http://localhost:3001/favorite", ids)
        setFav(true)
    }

    const deleteFavoritesRequest = async () => {
        await axios.delete(`http://localhost:3001/favorite/${id}`);
        setFav(false)
    }
    console.log(favorites)
    console.log(isFav)

    // optimize el código eliminando la función getDetails
    // y llamando directamente a 
    // dispatch(get_courses_by_id(id)) dentro del useEffect. 
    //life-cycles:
    useEffect(() => {
        getDetails()
        favorites?.forEach((fav) => {
            console.log(fav)
            if (fav.id == id) setFav(true); 
        });
        return () => {
            dispatch(clearMessage());
            dispatch(clearCourses());
        };
    }, [dispatch]);

    useEffect(() => {
        const updatedElementClasses = {};

        Object.keys(elementClasses).forEach((key) => {
            updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
        });

        setElementClasses(updatedElementClasses);
    }, [darkmode]);

    //component:
    return(
        <div className={styles.container}>
            <h1  className={`${styles.h1} ${styles[elementClasses.h1]}`}>{course.title}</h1>

            <div className={styles.container1} >
                <img src={course.imageURL} className={styles.img}/>
                <h2 className={`${styles.h2} ${styles[elementClasses.h2]}`}> {course.description}</h2>
            </div>

            <div className={styles.container2}>
                <h2 className={`${styles.p} ${styles[elementClasses.p]}`}> Ratings: {course.rating}</h2>
                <h3 className={`${styles.p} ${styles[elementClasses.p]}`}>Release date: {course.released}</h3>
                <h2 className={`${styles.p} ${styles[elementClasses.p]}`}>Categories:</h2>
                <h4  className={`${styles.p} ${styles[elementClasses.p]}`}>Language: {course.language}</h4>
                {
                    course.isFree === true ? (
                        <h3>This course is free</h3>
                    ) : (
                        <h3>This course requires payment</h3>
                    )
                }
                <a  className={`${styles.a} ${styles[elementClasses.a]}`} href={course.courseUrl}>Entrar aquí</a>
            </div>
            { 
                isFav ? (
                    <button onClick={deleteFavoritesRequest}>Quitar de favoritos ❤️</button>
                ) : (
                    <button onClick={postFavoritesRequest}>Añadir a favoritos 🤍</button>
                )
            }
        </div>
    )
}

export default CourseDetails;