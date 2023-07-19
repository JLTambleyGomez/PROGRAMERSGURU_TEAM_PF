import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_categories,
    clearCourses,
    clearMessage,
    get_courses_all,
    post_course,
    delete_course,
    put_course,
} from "../../../Redux/actions";
import styles from "./AdminPanel.module.css";

function Courses() {
    // global state:
    const categories = useSelector((state) => state.categories);
    const message = useSelector((state) => state.message);
    const dark = useSelector((state) => state.darkMode);
    const courses = useSelector((state) => state.allCourses);

    // const:
    const dispatch = useDispatch();

    // states:
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        imageURL: "",
        courseUrl: "",
        rating: 0,
        released: "",
        isFree: false,
        language: "",
        categories: [],
    });
    const [modificarCourse, setModificarCourse] = useState(false);
    const [course, setCourse] = useState({});
    const [postCourse, setPostCourse] = useState(false);
    const [courseId, setCourseId] = useState(null);

    const [modifCourse, setModifCourse] = useState({
        title: "",
        description: "",
        imageURL: "",
        courseUrl: "",
        rating: 0,
        released: "",
        isFree: false,
        language: "",
        categories: [],
    });

    // functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    //DESPACHA LA ACTION PARA HACER EL PUT
    const handleCoursePut = (event) => {
        event.preventDefault();
        dispatch(put_course(modifCourse));
        dispatch(get_courses_all());
    };

    //modificar curso
    const handleModificarCurso = (event) => {
        const id = event.target.value.id
        const course = event.target.value
        setModificarCourse(true);
        setCourse(course)
        setCourseId(id);
    };

    const handleCourseChange = (event) => {
        const { name, value } = event.target;
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
    };

    const handleCategorySelection = (event) => {
        const selectedCategories = Array.from(
            event.target.selectedOptions,
            (option) => ({
                id: option.value,
            })
        );
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            categories: selectedCategories,
        }));
    };

    const handleDeleteCourse = async (id) => {
        try {
            await dispatch(delete_course(id));
            await dispatch(get_courses_all());
        } catch (error) {
            console.log("error");
        }
    };

    const handleClosingModification = (event) => {
        console.log(event.target);
        setModificarCourse(false);
        setPostCourse(false);
    };
    console.log(modificarCourse);
    console.log(postCourse);
    const handleCoursePost = (event) => {
        event.preventDefault();

        if (modificarCourse) {
            dispatch(put_course(courseId, newCourse))
                .then(() => {
                    setNewCourse({
                        title: "",
                        description: "",
                        imageURL: "",
                        courseUrl: "",
                        rating: 0,
                        released: "",
                        isFree: false,
                        language: "",
                        categories: [],
                    });
                    dispatch(get_courses_all());
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            dispatch(post_course(newCourse))
                .then(() => {
                    setNewCourse({
                        title: "",
                        description: "",
                        imageURL: "",
                        courseUrl: "",
                        rating: 0,
                        released: "",
                        isFree: false,
                        language: "",
                        categories: [],
                    });
                    dispatch(get_courses_all());
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setModificarCourse(false);
        setPostCourse(false);
    };

    const handlePostCourse = () => {
        setPostCourse(true);
    };

    // life-cycles:
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_categories());
        dispatch(get_courses_all());

        return () => {
            dispatch(clearMessage());
            dispatch(clearCourses());
        };
    }, [dispatch]);

    // component:
    return (
        <div className={`${styles.component} ${styles[theme("component")]}`}>
            <div className={styles.contain}>
                <div></div>

                <section className={`${styles.Panel}`}>
                    {postCourse || modificarCourse ? (
                        <form className={`${styles.coursesForm}`}>
                            {modificarCourse ? (
                                <h2>Modificar Curso</h2>
                            ) : (
                                <h2>Nuevo Curso</h2>
                            )}
                            {postCourse && (
                                <button onClick={handleClosingModification}>
                                    X
                                </button>
                            )}
                            {modificarCourse && (
                                <button onClick={handleClosingModification}>
                                    X
                                </button>
                            )}
                            <div className={`${styles.h1}`}>
                                <label>Título:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={newCourse.title}
                                    onChange={handleCourseChange}
                                    placeholder={modifCourse && course.name}
                                />
                            </div>

                            <div className={`${styles.h1}`}>
                                <label>Descripción:</label>
                                <textarea
                                    name="description"
                                    value={newCourse.description}
                                    onChange={handleCourseChange}
                                    placeholder={modifCourse && course.description}
                                />
                            </div>

                            <div className={`${styles.h1}`}>
                                <label>URL de la imagen:</label>
                                <input
                                    type="text"
                                    name="imageURL"
                                    value={newCourse.imageURL}
                                    onChange={handleCourseChange}
                                    placeholder={modifCourse && course.imageURL}
                                />
                            </div>

                            <div className={`${styles.h1}`}>
                                <label>URL del curso:</label>
                                <input
                                    type="text"
                                    name="courseUrl"
                                    value={newCourse.courseUrl}
                                    onChange={handleCourseChange}
                                    placeholder={modifCourse && course.courseUrl}
                                    />
                            </div>

                            <div className={`${styles.h1}`}>
                                <label>Rating:</label>
                                <input
                                    type="number"
                                    name="rating"
                                    value={newCourse.rating}
                                    onChange={handleCourseChange}
                                    placeholder={modifCourse && course.rating}
                                    />
                            </div>

                            <div className={`${styles.h1}`}>
                                <label>Fecha de lanzamiento:</label>
                                <input
                                    type="date"
                                    name="released"
                                    value={newCourse.released}
                                    onChange={handleCourseChange}
                                    placeholder={modifCourse && course.released}
                                    />
                            </div>

                            <div className={`${styles.h1}`}>
                                <label>Es gratuito:</label>
                                <input
                                    type="checkbox"
                                    name="isFree"
                                    checked={newCourse.isFree}
                                    onChange={handleCourseChange}
                                />
                            </div>

                            <div className={`${styles.h1}`}>
                                <label>Idioma:</label>
                                <input
                                    type="text"
                                    name="language"
                                    value={newCourse.language}
                                    onChange={handleCourseChange}
                                    placeholder={modifCourse && course.language}
                                    
                                    />
                            </div>

                            <div className={`${styles.h1}`}>
                                <label>Categorías:</label>
                                <select
                                    multiple
                                    name="categories"
                                    onChange={handleCategorySelection}
                                  placeholder={modifCourse && course.categories}
                                    >
                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button onClick={handleCoursePost}>
                                {modificarCourse ? "Editar" : "Postear curso"}
                            </button>
                        </form>
                    ) : (
                        <>
                            <h2>Crear un curso nuevo</h2>
                            <button onClickCapture={handlePostCourse}>
                                Crear curso
                            </button>
                        </>
                    )}
                    {modificarCourse ? (
                        <></>
                    ) : (
                        <div className={`${styles.coursesContainer}`}>
                            <h1>Courses</h1>
                            <div className={`${styles.coursesBox}`}>
                                {courses.map((course) => (
                                    <div
                                        className={`${styles.course}`}
                                        key={course.id}
                                    >
                                        <button
                                            onClick={handleModificarCurso}
                                            value={course}
                                        >
                                            Modificar Curso
                                        </button>
                                        <p>ID: {course.id}</p> {course.title}
                                        <p>
                                            Fecha De Lanzamiento{" "}
                                            {course.released}{" "}
                                        </p>
                                        <button
                                            onClick={() =>
                                                handleDeleteCourse(course.id)
                                            }
                                        >
                                            X
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </section>

                <div></div>
            </div>
        </div>
    );
}

export default Courses;
