import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCourses, clearMessage } from "../../../Redux/actions";
import {
    postFavoriteRequest,
    deleteFavoriteRequest,
    isFavorite,
} from "../../../axiosRequests/axiosRequests";
import { get_course_by_id } from "../../../Redux/actions";

import styles from "./DetalleCurso.module.css";

//_________________________module_________________________
function DetalleCurso() {
    //global states:
    const course = useSelector((state) => state.course);
    const dark = useSelector((state) => state.darkMode);
    const user = useSelector((state) => state.user);
    const userId = user.id;
    //states:
    const [fav, setFav] = useState(false);
    const [ids, setIds] = useState({
        userId: "",
        courseId: "",
    });

    //const:
    const emptyHeart = "https://www.svgrepo.com/show/340294/favorite.svg";
    const fullHeart = "https://www.svgrepo.com/show/340295/favorite-filled.svg";
    const emptyStar = "https://www.svgrepo.com/show/372411/favorite.svg";
    const fullStar = "https://www.svgrepo.com/show/371873/favorite.svg";
    const dispatch = useDispatch();
    const { id } = useParams();
    const courseId = parseInt(id);
console.log(courseId);
    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const handleAddFavorite = async (event) => {
        event.preventDefault()
        setIds({...ids, userId: userId, courseId: courseId})
        console.log(ids);
        await postFavoriteRequest(ids)
        const fav = isFavorite(ids)
        setFav(fav)
    }
    const handleRemoveFavorite = async (event) => {
        event.preventDefault()
        setIds({...ids, userId, courseId})
        console.log(ids);
        await deleteFavoriteRequest(ids)
        const fav = isFavorite(ids)
        setFav(fav)
    }

    //life-cycles:
    useEffect(() => {
        dispatch(get_course_by_id(courseId));
        return () => {
            dispatch(clearMessage());
            dispatch(clearCourses());
        };
    }, [dispatch]);

    //component:
    return (
        <div className={styles.component}>
            <div className={styles.title}>
                <h1>{course[0].title}</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.containerImage}>
                    {!fav ? (
                        <img className={styles.favorite} onClick={handleAddFavorite} src={emptyHeart} alt="" />
                    ) : (
                        <img className={styles.favorite} onClick={handleRemoveFavorite} src={fullHeart} alt="" />
                    )}
                    <img src={course[0].imageURL} alt="" />
                    <div className={styles.data}>
                        <h3>{course[0].title}</h3>
                        <div className={styles.subData}>
                            <p>Idioma: {course[0].language}</p>
                            <p>Fecha de lanzamiento: {course[0].released}</p>
                            {course[0].isFree ? (
                                <p>Este curso es gratuito</p>
                            ) : (
                                <p>Este curso es de pago</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.containerDescription}>
                    <div className={styles.description}>
                        <h3>Descripción del curso</h3>
                        <div className={styles.scroll}>
                            <h4>{course[0].description}</h4>
                        </div>
                        <div className={styles.technologies}>
                            {course[0].Technologies.map((tech) => {
                                return (
                                    <span className={styles.technology}>
                                        {tech.name}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.comments}></div>
                </div>
            </div>
        </div>
    );
}

export default DetalleCurso;
