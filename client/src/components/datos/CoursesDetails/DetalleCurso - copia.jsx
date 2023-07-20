import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    get_courses_by_id,
    clearCourses,
    clearMessage,
    get_courses_all,
} from "../../../Redux/actions";
import {
    postFavoriteRequest,
    deleteFavoriteRequest,
} from "../../../axiosRequests/axiosRequests";

import styles from "./DetalleCurso.module.css";

//_________________________module_________________________
function DetalleCurso() {
    //global states:
    const course = useSelector((state) => state.allCourses);
    const dark = useSelector((state) => state.darkMode);

    //states:
    const [isFav, setFav] = useState(false);

    //const:
    const dispatch = useDispatch();
    let { id } = useParams();
    id = parseInt(id);

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const getDetails = () => {
        dispatch(get_courses_by_id(id));
    };

    //life-cycles:
    useEffect(() => {
        getDetails();
        favorites?.forEach((fav) => {
            console.log(fav);
            if (fav.id == id) setFav(true);
        });
        return () => {
            dispatch(clearMessage());
            dispatch(clearCourses());
            dispatch(get_courses_all());
        };
    }, [dispatch]);

    //component:
    return (
        <div className={`${styles.component} ${styles[theme("component")]}`}>
            <h1 className={`${styles.title} ${styles[theme("title")]}`}>
                {course.title}
            </h1>
            <div>
                <div className={styles.container1}>
                    <div className={`${styles.containerImage}`}>
                        <img className={styles.img} src={course.imageURL} />
                    </div>
                    <div className={`${styles.container2}`}>
                        <h2
                            className={`${styles.description} ${
                                styles[theme("description")]
                            }`}
                        >
                            {course.description}
                        </h2>

                        <h2 className={`${styles.p} ${styles[theme("p")]}`}>
                            CLASIFICACIÓN: {course.rating}
                        </h2>
                        <h2 className={`${styles.p} ${styles[theme("p")]}`}>
                            FECHA DE LANZAMIENTO: {course.released}
                        </h2>
                        <h2 className={`${styles.p} ${styles[theme("p")]}`}>
                            CATEGORIA:
                        </h2>
                        <h2 className={`${styles.p} ${styles[theme("p")]}`}>
                            LANGUAGE: {course.language}
                        </h2>
                        {course.isFree === true ? (
                            <h3>ESTE CURSO ES GRATUITO</h3>
                        ) : (
                            <h3>ESTE CURSO REQUIERE UN PAGO</h3>
                        )}
                        <a
                            className={`${styles.link} ${
                                styles[theme("link")]
                            }`}
                            href={course.courseUrl}
                            target="_blank"
                        >
                            Entrar aquí
                        </a>
                    </div>
                    {isFav ? (
                        <button
                            className={`${styles.button} ${
                                styles[theme("button")]
                            }`}
                            onClick={deleteFavoritesRequest}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-bookmark-star-fill"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M2 15.5V2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.74.439L8 13.069l-5.26 2.87A.5.5 0 0 1 2 15.5zM8.16 4.1a.178.178 0 0 0-.32 0l-.634 1.285a.178.178 0 0 1-.134.098l-1.42.206a.178.178 0 0 0-.098.303L6.58 6.993c.042.041.061.1.051.158L6.39 8.565a.178.178 0 0 0 .258.187l1.27-.668a.178.178 0 0 1 .165 0l1.27.668a.178.178 0 0 0 .257-.187L9.368 7.15a.178.178 0 0 1 .05-.158l1.028-1.001a.178.178 0 0 0-.098-.303l-1.42-.206a.178.178 0 0 1-.134-.098L8.16 4.1z"
                                />
                            </svg>
                        </button>
                    ) : (
                        <button
                            className={`${styles.button} ${
                                styles[theme("button")]
                            }`}
                            onClick={postFavoritesRequest}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                class="bi bi-bookmark-star"
                                viewBox="0 0 16 16"
                            >
                                <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.178.178 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.178.178 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.178.178 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.178.178 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.178.178 0 0 0 .134-.098L7.84 4.1z" />
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DetalleCurso;
