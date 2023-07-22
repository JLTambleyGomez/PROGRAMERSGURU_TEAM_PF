import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearCourses, clearMessage } from "../../../Redux/actions";
import {
    postFavoriteRequest,
    deleteFavoriteRequest,
} from "../../../axiosRequests/axiosRequests";
import { getCoursesByIdRequest } from "../../../axiosRequests/axiosRequests";
import PublishComment from "../Comments/subComponents/PublishComment";
import Rating from "@mui/material/Rating";

import styles from "./CourseDetails.module.css";
import Comments from "../Comments/Comments";

//_________________________module_________________________
function CourseDetails() {
    //global states:
    const user = useSelector((state) => state.user);
    const dark = useSelector((state) => state.darkMode);
    //states:

    const [loading, setLoading] = useState(true);
    const [fav, setFav] = useState(false);
    const [ids, setIds] = useState({
        userId: 0,
        courseId: 0,
    });
    const [course, setCourse] = useState({});
    console.log(course);
    //const:
    const emptyHeart = "https://www.svgrepo.com/show/340294/favorite.svg";
    const fullHeart = "https://www.svgrepo.com/show/340295/favorite-filled.svg";
    const dispatch = useDispatch();
    const { id } = useParams();

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const getCourse = async (id) => {
        const data = await getCoursesByIdRequest(id);
        setCourse(data);
        setFav(data?.Users?.find((fav) => fav?.id === user?.id) || false);
    };

    const handleRemoveFavorite = async (event) => {
        event.preventDefault();
        setFav(!fav);
        console.log(ids);
        const data = await deleteFavoriteRequest(ids);
        console.log(data.message);
    };
    const handleAddFavorite = async (event) => {
        event.preventDefault();
        setFav(!fav);
        console.log(ids);
        const data = await postFavoriteRequest(ids);
        console.log(data.message);
    };

    //life-cycles:
    useEffect(() => {
        getCourse(id);
        setIds({ ...ids, courseId: id, userId: user?.id });
        return () => {};
    }, [ids.userId, ids.courseId, id]);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => {
            dispatch(clearCourses());

            dispatch(clearMessage());
        };
    }, []);

    //component:
    return (
        <>
            {!loading ? (
                <div className={styles.component}>
                    <div className={styles.title}>
                        <h1>{course?.title}</h1>
                        <Rating
                            value={3.5}
                            precision={0.1}
                            name="read-only"
                            // value={course?.meanRating}
                            readOnly
                        />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.containerImage}>
                            <img
                                className={styles.imageURL}
                                src={course?.imageURL}
                                alt=""
                            />
                            <div
                                className={`${styles.data} ${
                                    styles[theme("data")]
                                }`}
                            >
                                <span>
                                    {!fav ? (
                                        <img
                                            className={`${styles.favorite} ${
                                                styles[theme("favorite")]
                                            }`}
                                            onClick={handleAddFavorite}
                                            src={emptyHeart}
                                            alt=""
                                        />
                                    ) : (
                                        <img
                                            className={`${styles.favorite} ${
                                                styles[theme("addfavorite")]
                                            }`}
                                            onClick={handleRemoveFavorite}
                                            src={fullHeart}
                                            alt=""
                                        />
                                    )}
                                </span>
                                <div className={styles.subData}>
                                    <h4>{course?.title}</h4>
                                    <p>Idioma: {course?.language}</p>
                                    <p>
                                        Fecha de lanzamiento: {course?.released}
                                    </p>
                                    {course?.isFree ? (
                                        <p>Este curso es gratuito</p>
                                    ) : (
                                        <p>Este curso es de pago</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerDescription}>
                            <div
                                className={`${styles.description} ${
                                    styles[theme("description")]
                                }`}
                            >
                                <h3>Descripción del curso</h3>
                                <div className={styles.scroll}>
                                    <h4>{course?.description}</h4>
                                </div>
                                <div className={styles.technologies}>
                                    {course?.Technologies?.map((tech) => {
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
                            <div className={styles.comments}>
                                <PublishComment
                                    userId={user?.id}
                                    picture={user?.picture}
                                    name={user?.name}
                                    comments={course?.Comments}
                                />
                                <Comments comments={course.Comments} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <h1 className={styles.carga}>Cargando...</h1>
            )}
        </>
    );
}

export default CourseDetails;
