import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    get_courses_by_id,
    clearCourses,
    clearMessage,
    get_courses_all,
    get_Favorites_Request,
} from "../../../Redux/actions";
import {
    deleteFavoriteRequest,
    postFavoriteRequest,
} from "../../../axiosRequests/axiosRequests";

import axios from "axios"; //remover axios => axiosRequests.js
import styles from "./CoursesDetails.module.css";

//_________________________module_________________________
function CourseDetails() {
    const location = useLocation();
    const array = location.pathname.split("/");
    const courseId = array[array.length - 1];

    //global states:
    const course = useSelector((state) => state.allCourses);
    const favorites = useSelector((state) => state.favorites);
    const dark = useSelector((state) => state.darkMode);
    const user = useSelector((state) => state.user);
    const userId = user?.id;

    //states:
    const [fav, setFav] = useState(false);
    const [ids, setIds] = useState({
        userId: "",
        courseId: "",
    });

    //const:
    const dispatch = useDispatch();
    let { id } = useParams();
    id = parseInt(id);

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const getDetails = async () => {
        await dispatch(get_courses_by_id(id));
    };

    const handleFavorite = () => {
        setIds({ ...ids, userId, courseId });
        console.log(favorites);
        if (!fav) {
            console.log(ids);
            postFavoriteRequest(ids);
        } else {
            deleteFavoriteRequest({courseId: 2, userId:8 });
        }
        setFav(!fav);
    };

    //life-cycles:
    useEffect(() => {
        dispatch(get_Favorites_Request(8));
        getDetails();
        favorites?.forEach((fav) => {
            console.log(fav);
            if (fav.id == id) setFav(true);
        });
        return async () => {
            await dispatch(clearMessage());
            await dispatch(clearCourses());
            await dispatch(get_courses_all());
        };
    }, [dispatch]);

    //component:
    return (
        <div className={`${styles.component} ${styles[theme("component")]}`}>
            <h1 className={`${styles.title} ${styles[theme("title")]}`}>
                {course.title}
            </h1>

            <div className={styles.container1}>
                <img className={styles.img} src={course.imageURL} />
                <h2
                    className={`${styles.description} ${
                        styles[theme("description")]
                    }`}
                >
                    {course.description}
                </h2>
            </div>

            <div className={styles.container2}>
                <h2 className={`${styles.p} ${styles[theme("p")]}`}>
                    Ratings: {course.rating}
                </h2>
                <h3 className={`${styles.p} ${styles[theme("p")]}`}>
                    Release date: {course.released}
                </h3>
                <h2 className={`${styles.p} ${styles[theme("p")]}`}>
                    Categories:
                </h2>
                <h4 className={`${styles.p} ${styles[theme("p")]}`}>
                    Language: {course.language}
                </h4>
                {course.isFree === true ? (
                    <h3>This course is free</h3>
                ) : (
                    <h3>This course requires payment</h3>
                )}
                <a
                    className={`${styles.link} ${styles[theme("link")]}`}
                    href={course.courseUrl}
                    target="_blank"
                >
                    Entrar aquí
                </a>
            </div>

            {fav ? (
                <button
                    className={`${styles.button} ${styles[theme("button")]}`}
                    onClick={handleFavorite}
                >
                    Quitar de favoritos ❤️
                </button>
            ) : (
                <button
                    className={`${styles.button} ${styles[theme("button")]}`}
                    onClick={handleFavorite}
                >
                    Añadir a favoritos 🤍
                </button>
            )}
        </div>
    );
}

export default CourseDetails;
