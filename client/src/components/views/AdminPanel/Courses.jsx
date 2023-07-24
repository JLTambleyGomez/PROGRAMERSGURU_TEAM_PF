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
    adminPanelMensajesLocales
} from "../../../Redux/actions";
import styles from "./Courses.module.css";
import { validateCourse } from "./validate";
import { SubirImagenCurso } from "./SubirImagenCurso";
import theme from "../../../theme/theme"

function Courses() {
    // global state:
    const tecnology = useSelector((state) => state.tecnology);
    const dark = useSelector((state) => state.darkMode);
    const courses = useSelector((state) => state.allCourses);

    // const:
    const dispatch = useDispatch();

    // states:
    const [change, setChange] = useState(false);
    const [messagePost, setMessagePost] = useState("");
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
    const [modificarCourse, setModificarCourse] = useState(false);
    const [postCourse, setPostCourse] = useState(false);
    const [courseId, setCourseId] = useState(null);
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
    const [course, setCourse] = useState({})

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

    // functions:

    //DESPACHA LA ACTION PARA HACER EL PUT

    //modificar curso
    const handleModificarCurso = (event) => {
        const id = event.target.value;

        const courseModificar = courses.find((course) => course.id === +id )
        setCourse(courseModificar)
        setCourseId(id);
        setModificarCourse(true);
    };

    const handleCourseChange = (event) => {
        const { name, value } = event.target;
        setChange(true);
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            [name]: value,
        }));
        dispatch(clearMessage());
        setMessagePost('')

        // if (postCourse)
        //     setErrorCourse(validateCourse({ ...newCourse, [name]: value }));
    };

    const handleTechnologySelection = (event) => {
        const selectedTechnologies = Array.from(
            event.target.selectedOptions,
            (option) => ({
                id: option.value,
            })
        );
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            tecnology: selectedTechnologies,
        }));
        // if (postCourse)
        //     setErrorCourse(
        //         validateCourse({ ...newCourse, tecnology: selectedTechnologies })
        //     );
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
        setModificarCourse(false);
        setPostCourse(false);
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
    };

    const handleCoursePost = async (event) => {
        event.preventDefault();
     
        if (modificarCourse) {
            if (
                errorCourse.name ||
                errorCourse.description ||
                errorCourse.genre ||
                errorCourse.platforms ||
// platforms?
                errorCourse.released ) return setMessagePost("Revise los datos");
            

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
                !newCourse.isFree ||
                !newCourse.language 
            ) return setMessagePost('Debe completar los datos')
        
            if (
                errorCourse.title ||
                errorCourse.description ||
                errorCourse.imageURL ||
                errorCourse.courseUrl ||
                errorCourse.released ||
                errorCourse.isFree ||
                errorCourse.language 

            )return setMessagePost("Revise los datos")
            
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
        localStorage.removeItem("urlNewCourseImage")
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
            await new Promise(resolve => setTimeout(resolve, 5000));
            dispatch(clearMessage());
        })()
    }, [dispatch])

    useEffect(() => {
        console.log(newCourse)
    }, [newCourse])

    // component:
    return (
        <div className={`${styles.component} ${styles[theme("component")]}`}>
            <div className={styles.contain}>
                <div></div>

                <section className={`${styles.Panel}`}>
                    {postCourse || modificarCourse ? (
                        <>
                            <form className={`${styles.coursesForm}`}>
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
                                {modificarCourse ? (
                                    <h2>Modificar Curso</h2>
                                ) : (
                                    <h2>Nuevo Curso</h2>
                                )}
                                {messagePost && <p>{messagePost}</p>}
                                <div className={`${styles.h1}`}>
                                    <label>Título:</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={newCourse.title}
                                        onChange={handleCourseChange}
                                        placeholder={modifCourse && course.title}
                                        />
                                    {errorCourse && <p>{errorCourse.title}</p>}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Descripción:</label>
                                    <textarea
                                        name="description"
                                        value={newCourse.description}
                                        onChange={handleCourseChange}
                                        placeholder={modifCourse && course.description}
                                        />
                                    {errorCourse && (
                                        <p>{errorCourse.description}</p>
                                        )}
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
                                    {errorCourse.imageURL && <p>{errorCourse.imageURL}</p>}
                                </div>
                                <div>
                                    <SubirImagenCurso title={course?.title}/>
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
                                    {errorCourse.courseUrl && <p>{errorCourse.courseUrl}</p>}
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
                                   {errorCourse.released && <p>{errorCourse.released}</p>}
                                 
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
                                        <input
                                            type="radio"
                                            name="isFree"
                                        />
                                    <p>{errorCourse.isFree}</p>
                                        {errorCourse.isFree && <p>{errorCourse.isFree}</p>}
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
                                    
                                        {errorCourse.language && <p>{errorCourse.language}</p>}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Tecnologías:</label>
                                    <select
                                        multiple
                                        name="tecnology"
                                        onChange={handleTechnologySelection}
                                        >
                                        {tecnology?.map((technology) => (
                                            <option
                                                key={technology.id}
                                                value={technology.id}
                                            >
                                                {technology.name}
                                            </option>
                                        ))}
                                    </select>
                                        {/* {errorCourse.tecnology && <p>{errorCourse.tecnology}</p>} */}

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
                            <h1>Courses</h1>
                            <div className={styles.conteiner}>
                                {!!courses.length && courses.map((course) => (
                                    <div key={course.id}>
                                        <button
                                            onClick={handleModificarCurso}
                                            value={course.id}
                                        >
                                            Modificar Curso
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteCourse(course.id)
                                            }
                                        >
                                            X
                                        </button>
                                        <p>ID: {course.id}</p>
                                        <p>Titulo: {course.title}</p>
                                        <p>Rating: {course.meanRating}</p>
                                        <p>
                                            Fecha De Lanzamiento:{" "}
                                            {course.released}
                                        </p>
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
