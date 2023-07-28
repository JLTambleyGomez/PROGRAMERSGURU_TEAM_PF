import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_tecnology,
    clearCourses,
    clearMessage,
    get_courses_all,
    post_course,
    delete_course,
    put_course,
    adminPanelMensajesLocales,
} from "../../../Redux/actions";
import s from "./Paginacion/Courses.module.css";
import styles from "./Courses.module.css";
import { validateCourse } from "./validate";
import { SubirImagenCurso } from "./SubirImagenCurso";
import theme from "../../../theme/theme";
import { Table } from "react-bootstrap";
import SelectTechnologies from "./SelectTechnologies";
//import ObjectListCourses from ""
import ObjectsListCourses from "./Paginacion/ObjectListCourses";

function Courses() {
    // global state:
    const tecnology = useSelector((state) => state.tecnology);
    const dark = useSelector((state) => state.darkMode);
    const courses = useSelector((state) => state.allCourses);

    // const:
    const dispatch = useDispatch();

    // states:
    const [change, setChange] = useState(false);
    const [selectedTechnologies, setSelectedTechnologies] = useState([]);
    const [modificarCourse, setModificarCourse] = useState(false);
    const [courseId, setCourseId] = useState(null);
    const [messagePost, setMessagePost] = useState("");
    const [postCourse, setPostCourse] = useState(false);
    const [course, setCourse] = useState({});
    const [newCourse, setNewCourse] = useState({
        title: "",
        description: "",
        imageURL: "",
        courseUrl: "",
        released: "",
        isFree: false,
        language: "",
        tecnology: [],
    });
    const [errorCourse, setErrorCourse] = useState({
        title: "",
        description: "",
        imageURL: "",
        courseUrl: "",
        released: "",
        isFree: false,
        language: "",
        tecnology: [],
    });
    const [modifCourse, setModifCourse] = useState({
        title: "",
        description: "",
        imageURL: "",
        courseUrl: "",
        released: "",
        isFree: false,
        language: "",
        tecnology: [],
    });

    //modificar curso
    const handleModificarCurso = (id) => {
        const courseModificar = courses.find((course) => course.id === +id);
        setCourse(courseModificar);
        setCourseId(id);
        setModificarCourse(true);
    };

    //setea segun los cambios en los inputs
    const handleCourseChange = (event) => {
        const { name, value } = event.target;
        setChange(true);

        setNewCourse((prevCourse) => ({
            ...prevCourse,
            [name]:
                (name === "imageURL" &&
                    localStorage.getItem("urlNewCourseImage")) ||
                value,
        }));
        dispatch(clearMessage());
        setMessagePost("");
    };

    const HandleSelectTechnologies = (e) => {
        e.preventDefault();
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            tecnology: selectedTechnologies,
        }));
    };

    //ve los cambios en el select
    const handleMultipleSelection = (e) => {
        e.preventDefault();
        const { value, checked } = e.target;
        console.log(checked);
        setNewCourse((prevCourse) => {
            if (checked) {
                return {
                    ...prevCourse,
                    tecnology: [...prevCourse.tecnology, value],
                };
            } else {
                return {
                    ...prevCourse,
                    tecnology: prevCourse.tecnology.filter(
                        (tec) => tec !== value
                    ),
                };
            }
        });
    };

    const handleDeleteCourse = async (id) => {
        try {
            await dispatch(delete_course(id));
            await dispatch(get_courses_all());
        } catch (error) {
            console.log("error");
        }
    };

    //boton para cerrar el formulario
    const handleClosingModification = (event) => {
        event.preventDefault()
        // setLimpiar(true);
        console.log(newCourse)
        setModificarCourse(false);
        setPostCourse(false);
        setCourseId(0);
        setMessagePost("");
        setErrorCourse({
            title: "",
            description: "",
            imageURL: "",
            courseUrl: "",

            released: "",
            isFree: false,
            language: "",
            tecnology: [],
        });
        setNewCourse({
            title: "",
            description: "",
            imageURL: "",
            courseUrl: "",
            released: "",
            isFree: false,
            language: "",
            tecnology: [],
        });
        setModifCourse({
            title: "",
            description: "",
            imageURL: "",
            courseUrl: "",
            released: "",
            isFree: false,
            language: "",
            tecnology: [],
        });
     
    };

    //envia el formulario
    const handleCoursePost = async (event) => {
        event.preventDefault();

        if (modificarCourse) {
            if (
                errorCourse.title ||
                errorCourse.description ||
                errorCourse.imageURL ||
                errorCourse.courseUrl ||
                errorCourse.released ||
                errorCourse.isFree ||
                errorCourse.language
            )
                return setMessagePost("Revise los datos");

            dispatch(put_course(courseId, newCourse))
                .then(() => {
                    setNewCourse({
                        title: "",
                        description: "",
                        imageURL: "",
                        courseUrl: "",
                        released: "",
                        isFree: false,
                        language: "",
                        tecnology: [],
                    });
                    dispatch(get_courses_all());
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            if (
                !newCourse.title ||
                !newCourse.description ||
                !newCourse.imageURL ||
                !newCourse.courseUrl ||
                !newCourse.released ||
                !newCourse.language
            )
                return setMessagePost("Debe completar los datos");

            if (
                errorCourse.title ||
                errorCourse.description ||
                errorCourse.imageURL ||
                errorCourse.courseUrl ||
                errorCourse.released ||
                errorCourse.isFree ||
                errorCourse.language
            )
                return setMessagePost("Revise los datos");

            setMessagePost("");
            dispatch(post_course(newCourse))
                .then(() => {
                    setNewCourse({
                        title: "",
                        description: "",
                        imageURL: "",
                        courseUrl: "",
                        released: "",
                        isFree: false,
                        language: "",
                        tecnology: [],
                    });
                    dispatch(get_courses_all());
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        setModificarCourse(false);
        setPostCourse(false);
        localStorage.removeItem("urlNewCourseImage");
    };

    const handlePostCourse = () => {
        setPostCourse(true);
    };

    // life-cycles:
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_tecnology());
        dispatch(get_courses_all());

        return () => {
            dispatch(clearMessage());
            dispatch(clearCourses());
        };
    }, [dispatch]);

    useEffect(() => {
        if (messagePost !== "") {
            dispatch(adminPanelMensajesLocales(messagePost));
        }
    }, [messagePost]);

    useEffect(() => {
        (async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            dispatch(clearMessage());
        })();
    }, [dispatch]);

    useEffect(() => {
        console.log(newCourse);
    }, [newCourse]);

    // component:
    return (
        <div className={s.component}>
            <div className={s.contain}>
                <section className={s.Panel}>
                    {postCourse || modificarCourse ? (
                        <>
                            <form className={`${styles.coursesForm}`}>
                                {postCourse || modificarCourse ? (
                                    <button onClick={handleClosingModification}>
                                        X
                                    </button>
                                ) : (
                                    ""
                                )}
                                {modificarCourse ? (
                                    <h2>Modificar Curso</h2>
                                ) : (
                                    <h2>Nuevo Curso</h2>
                                )}
                                {messagePost && <p>{messagePost}</p>}
                                <div className={`${styles.h1}`}>
                                    <label>Título:</label>
                                    <input className={styles.input}
                                        type="text"
                                        name="title"
                                        value={newCourse.title}
                                        onChange={handleCourseChange}
                                        placeholder={
                                            modificarCourse
                                                ? course.title
                                                : "Titulo"
                                        }
                                    />
                                    {errorCourse && <p>{errorCourse.title}</p>}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Descripción:</label>
                                    <textarea className={styles.input}
                                        name="description"
                                        value={newCourse.description}
                                        onChange={handleCourseChange}
                                        placeholder={
                                            modificarCourse
                                                ? course.description
                                                : "Descripción"
                                        }
                                    />
                                    {errorCourse && (
                                        <p>{errorCourse.description}</p>
                                    )}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>URL de la imagen:</label>
                                    <input className={styles.input}
                                        type="text"
                                        name="imageURL"
                                        value={newCourse.imageURL}
                                        onChange={handleCourseChange}
                                        placeholder={
                                            modificarCourse
                                                ? course.imageURL
                                                : "Url imagen"
                                        }
                                    />
                                    {errorCourse.imageURL && (
                                        <p>{errorCourse.imageURL}</p>
                                    )}
                                </div>
                                <div>
                                    <SubirImagenCurso
                                        handleCourseChange={handleCourseChange}
                                        title={
                                            modificarCourse
                                                ? modifCourse?.title
                                                : newCourse?.title
                                        }
                                    />
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>URL del curso:</label>
                                    <input className={styles.input}
                                        type="text"
                                        name="courseUrl"
                                        value={newCourse.courseUrl}
                                        onChange={handleCourseChange}
                                        placeholder={
                                            modificarCourse
                                                ? course.courseUrl
                                                : "Url curso"
                                        }
                                    />
                                    {errorCourse.courseUrl && (
                                        <p>{errorCourse.courseUrl}</p>
                                    )}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Fecha de lanzamiento:</label>
                                    <input className={styles.input}
                                        type="date"
                                        name="released"
                                        value={newCourse.released}
                                        onChange={handleCourseChange}
                                        placeholder={
                                            modificarCourse
                                                ? course.released
                                                : "Fecha de lanzamiento"
                                        }
                                    />
                                    {errorCourse.released && (
                                        <p>{errorCourse.released}</p>
                                    )}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Tipo</label>
                                    <label>Gratuito</label>
                                    <input
                                        type="radio"
                                        name="isFree"
                                        checked={newCourse.isFree}
                                        onChange={handleCourseChange}
                                    />
                                    <label>Exclusivo</label>
                                    <input type="radio" name="isFree" />
                                    <p>{errorCourse.isFree}</p>
                                    {errorCourse.isFree && (
                                        <p>{errorCourse.isFree}</p>
                                    )}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Idioma:</label>
                                    <input className={styles.input}
                                        type="text"
                                        name="language"
                                        value={newCourse.language}
                                        onChange={handleCourseChange}
                                        placeholder={
                                            modificarCourse
                                                ? course.language
                                                : "Idioma"
                                        }
                                    />

                                    {errorCourse.language && (
                                        <p>{errorCourse.language}</p>
                                    )}

                                    <div className={`${styles.h1}`}>
                                        <div>
                                            <label>Tecnologías:</label>
                                            <SelectTechnologies
                                                selectedTechnologies={
                                                    selectedTechnologies
                                                }
                                                setSelectedTechnologies={
                                                    setSelectedTechnologies
                                                }
                                                tecnology={tecnology}
                                                handleCourseChange={
                                                    handleCourseChange
                                                }
                                            />
                                            <button
                                                onClick={
                                                    HandleSelectTechnologies
                                                }
                                            >
                                                Ok
                                            </button>
                                        </div>
                                    </div>
                       
                                </div>

                                <button onClick={handleCoursePost}>
                                    {modificarCourse
                                        ? "Editar"
                                        : "Postear curso"}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2>Crear un curso nuevo</h2>
                            <button onClick={handlePostCourse}>
                                Crear curso
                            </button>
                        </>
                    )}
                    {modificarCourse ? (
                        <></>
                    ) : (
                        <div className={`${styles.coursesContainer}`}>
                            <ObjectsListCourses
                                objects={courses}
                                titulo="Cursos"
                                handleModificarCurso={handleModificarCurso}
                                handleDeleteCourse={handleDeleteCourse}
                            />
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}
export default Courses;
