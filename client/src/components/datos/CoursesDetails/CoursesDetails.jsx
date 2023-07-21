import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { get_courses_by_id, clearCourses, clearMessage, get_courses_all} from "../../../Redux/actions";
import theme from "../../../theme/theme";

import axios from "axios"; //remover axios => axiosRequests.js
import styles from "./CoursesDetails.module.css";

//_________________________module_________________________
function CourseDetails () {

    //global states:
    const course = useSelector((state) => state.allCourses);
    const favorites = useSelector((state) => state.favorites);
    const user= useSelector((state)=> state.user)

    //states:
    const [isFav, setFav] = useState(false);

    //const:
    const dispatch = useDispatch();
    let { id } = useParams();
    id = parseInt(id);

    //functions:
    const getDetails = async () => {
        await dispatch(get_courses_by_id(id))
    }

    //esto es para renderizar y dar funcion a un boton que agrege un favorito
    const postFavoritesRequest = async () => {
        const ids={idCourse:id, idUser:user.id}
        const {data} = await axios.post("http://localhost:3001/favorite", ids)
        setFav(true)
    }

    const deleteFavoritesRequest = async () => {
        const {data}= await axios.delete(`http://localhost:3001/favorite/${id}`);
        setFav(false)
    }
    console.log(favorites)
    console.log(isFav)

    // optimize el código eliminando la función getDetails
    // y llamando directamente a 
    // dispatch(get_courses_by_id(id)) dentro del useEffect. 
    //life-cycles:
    useEffect(() => {
        getDetails();
        favorites?.forEach((fav) => {
            console.log(fav);
            if (fav.id == id) setFav(true); 
        })
        return async () => {
            await dispatch(clearMessage());
            await dispatch (clearCourses())
            await dispatch(get_courses_all())
        };  
    }, [dispatch]);

    //component:
    return(
        <div className={`${styles.component} ${styles[theme("component")]}`}>
            <div className={styles.mainTitle}>
                <h1 className={`${styles.title} ${styles[theme("title")]}`}>{course.title}</h1>
            </div>

            <div className={styles.wrapper}>
                <div className={styles.container1}>
                    <img className={styles.img} src={course.imageURL}/>
                </div>

                <div className={styles.container2}>
                    <h2 className={`${styles.description} ${styles[theme("description")]}`}>{course.description}</h2>
                    <h2 className={`${styles.p} ${styles[theme("p")]}`}>Ratings: {course.rating}</h2>
                    <h3 className={`${styles.p} ${styles[theme("p")]}`}>Release date: {course.released}</h3>
                    <h2 className={`${styles.p} ${styles[theme("p")]}`}>Categories:</h2>
                    <h4 className={`${styles.p} ${styles[theme("p")]}`}>Language: {course.language}</h4>
                    {/* {
                        course.isFree === true ? (
                            <h3>This course is free</h3>
                        ) : (
                            <h3>This course requires payment</h3>
                        )
                    }
                    <a className={`${styles.link} ${styles[theme("link")]}`} href={course.courseUrl} target="_blank">Entrar aquí</a> */}
                </div>
            </div>

            {/* {
                isFav ? (
                    <button className={`${styles.button} ${styles[theme("button")]}`} onClick={deleteFavoritesRequest}>Quitar de favoritos ❤️</button>
                ) : (
                    <button className={`${styles.button} ${styles[theme("button")]}`} onClick={postFavoritesRequest}>Añadir a favoritos 🤍</button>
                )
            } */}
        </div>
    )
}

export default CourseDetails;