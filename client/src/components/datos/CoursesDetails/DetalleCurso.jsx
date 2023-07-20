import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    clearCourses,
    clearMessage,
    get_Favorites_Request,
    get_User_By_Email,
    get_course_by_id,
} from "../../../Redux/actions";
import {
    postFavoriteRequest,
    deleteFavoriteRequest,
} from "../../../axiosRequests/axiosRequests";

import styles from "./DetalleCurso.module.css";

//_________________________module_________________________
function DetalleCurso() {
    //global states:
    const course = useSelector((state) => state.course);
    const favorites = useSelector((state) => state.favorites);
    const user = useSelector((state) => state.user);
    const dark = useSelector((state) => state.darkMode);
    //states:
    const [fav, setFav] = useState(null);
    const [ids, setIds] = useState({
        userId: 0,
        courseId: 0,
    });

    //const:
    const emptyHeart = "https://www.svgrepo.com/show/340294/favorite.svg";
    const fullHeart = "https://www.svgrepo.com/show/340295/favorite-filled.svg";
    const emptyStar = "https://www.svgrepo.com/show/372411/favorite.svg";
    const fullStar = "https://www.svgrepo.com/show/371873/favorite.svg";
    const dispatch = useDispatch();
    const { id } = useParams();
    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const handleFavorite = async (event) => {
        event.preventDefault();
        setFav(!fav);
        setIds({ ...ids, userId: user?.id, courseId: Number(id) });
        console.log(ids);
        if (fav) {
            console.log(ids);
            await deleteFavoriteRequest(ids);
            const favs = favorites?.Courses?.map((fav) => fav.id);
            if (favs?.includes(Number(course[0]?.id))) {
                console.log("holis");
                setFav(true);
            }
        }
        if (!fav) {
            await postFavoriteRequest(ids);
        }
    };

    //life-cycles:
    useEffect(() => {
        dispatch(get_course_by_id(id));
        console.log(course);
        console.log(user?.id);
        dispatch(get_Favorites_Request(user?.id));
        console.log(favorites);
        const favs = favorites?.Courses?.map((fav) => fav.id);
        console.log(favs);
        if (favs?.includes(Number(id))) {
            setFav(true);
        }
        return () => {
            dispatch(clearMessage());
            dispatch(clearCourses());
        };
    }, [dispatch]);

    //component:
    return (
        <div className={styles.component}>
            <div className={styles.title}>
                <h1>{course[0]?.title}</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.containerImage}>
                    <img className={styles.imageURL} src={course[0]?.imageURL} alt="" />
                    <div className={styles.data}>
                        <span>
                            {!fav ? (
                                <img
                                    className={styles.favorite}
                                    onClick={handleFavorite}
                                    src={emptyHeart}
                                    alt=""
                                />
                            ) : (
                                <img
                                    className={styles.favorite}
                                    onClick={handleFavorite}
                                    src={fullHeart}
                                    alt=""
                                />
                            )}
                        </span>
                        <div className={styles.subData}>
                            <h4>{course[0]?.title}</h4>
                            <p>Idioma: {course[0]?.language}</p>
                            <p>Fecha de lanzamiento: {course[0]?.released}</p>
                            {course[0]?.isFree ? (
                                <p>Este curso es gratuito</p>
                            ) : (
                                <p>Este curso es de pago</p>
                            )}
                        </div>
                    </div>
                    {/* {!fav ? (
                        <img
                            className={styles.favorite}
                            onClick={handleFavorite}
                            src={emptyHeart}
                            alt=""
                        />
                    ) : (
                        <img
                            className={styles.favorite}
                            onClick={handleFavorite}
                            src={fullHeart}
                            alt=""
                        />
                    )} */}
                </div>
                <div className={styles.containerDescription}>
                    <div className={styles.description}>
                        <h3>Descripción del curso</h3>
                        <div className={styles.scroll}>
                            <h4>{course[0]?.description}</h4>
                        </div>
                        <div className={styles.technologies}>
                            {course[0]?.Technologies.map((tech) => {
                                return (
                                    <span
                                        key={tech?.id}
                                        className={styles.technology}
                                    >
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
