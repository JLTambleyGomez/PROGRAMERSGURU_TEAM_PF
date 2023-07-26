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
import { Table } from "react-bootstrap";
import SelectTechnologies from "./SelectTechnologies";


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
    const [course, setCourse] = useState({})
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
        const courseModificar = courses.find((course) => course.id === +id )
        setCourse(courseModificar)
        setCourseId(id);
        setModificarCourse(true);
    };

    //setea segun los cambios en los inputs
    const handleCourseChange = (event) => {
        const { name, value } = event.target;
        setChange(true);
        
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            [name]: (name==="imageURL" && localStorage.getItem("urlNewCourseImage")) || value,
        }));
        dispatch(clearMessage());
        setMessagePost('')
    };
    


    const HandleSelectTechnologies = (e) => {
        e.preventDefault()
        setNewCourse((prevCourse) => ({
            ...prevCourse,
            tecnology: selectedTechnologies,
        }));
    }


    // const handleTechnologySelection = (event) => {
    //     event.preventDefault()
    //     const { value, checked } = event.target; 
    //     const selectedTechnologies = Array.from(
    //         event.target.selectedOptions,
    //         (option) => ({
    //             id: option.value,
    //         })
    //     );
    //     setNewCourse((prevCourse) => ({
    //         ...prevCourse,
    //         tecnology: selectedTechnologies,
    //     }));
     
    // };

    //ve los cambios en el select
    const handleMultipleSelection = (e) => {
        e.preventDefault();
        const { value, checked } = e.target;
        console.log(checked)
        setNewCourse((prevCourse) => {
            if(checked) {
                return {
                    ...prevCourse,
                    tecnology: [...prevCourse.tecnology, value],
                };
            } else {
                return {
                    ...prevCourse,
                    tecnology: prevCourse.tecnology.filter(tec => tec !== value)
                }
            }
        })
    }

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
        console.log("borra")
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
                 ) return setMessagePost("Revise los datos");
            

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
            <section className={`${styles.Panel}`}>
                {postCourse || modificarCourse ? (
                    <>
                        <form className={`${styles.coursesForm}`}>
                            {postCourse || modificarCourse ? (
                                <button className={styles.button} onClick={handleClosingModification}>
                                    X
                                </button>
                             ) : ''}
                            {modificarCourse ? (
                                <h2 className={styles.h1}>Modificar Curso</h2>
                            ) : (
                                <h2 lassName={styles.h1}>Nuevo Curso</h2>
                            )}
                             {messagePost && <p>{messagePost}</p>}
                                <div className={`${styles.h1}`}>
                                    <label>Título:</label>
                                    <input className={styles.input}
                                        type="text"
                                        name="title"
                                        value={newCourse.title}
                                        onChange={handleCourseChange}
                                        placeholder={modificarCourse ? course.title : 'Titulo'}
                                        />
                                    {errorCourse && <p>{errorCourse.title}</p>}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Descripción:</label>
                                    <textarea className={styles.input}
                                        name="description"
                                        value={newCourse.description}
                                        onChange={handleCourseChange}
                                        placeholder={modificarCourse ? course.description : 'Descripción'}
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
                                        placeholder={modificarCourse ? course.imageURL : 'Url imagen'}
                                        />
                                    {errorCourse.imageURL && <p>{errorCourse.imageURL}</p>}
                                </div>
                                <div className={styles.subirimagen} >
                                    <SubirImagenCurso handleCourseChange={handleCourseChange} title={modificarCourse ? modifCourse?.title : newCourse?.title}/>
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>URL del curso:</label>
                                    <input className={styles.input}
                                        type="text"
                                        name="courseUrl"
                                        value={newCourse.courseUrl}
                                        onChange={handleCourseChange}
                                        placeholder={modificarCourse ? course.courseUrl : 'Url curso'}
                                        />
                                    {errorCourse.courseUrl && <p>{errorCourse.courseUrl}</p>}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Fecha de lanzamiento:</label>
                                    <input className={styles.input}
                                        type="date"
                                        name="released"
                                        value={newCourse.released}
                                        onChange={handleCourseChange}
                                        placeholder={modificarCourse ? course.released : 'Fecha de lanzamiento'}
                                        />
                                   {errorCourse.released && <p>{errorCourse.released}</p>}
                                 
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Tipo</label>
                                    <label>Gratuito</label>
                                        <input className={styles.input}
                                            type="radio"
                                            name="isFree"
                                            checked={newCourse.isFree}
                                            onChange={handleCourseChange}
                                        />
                                    <label>Exclusivo</label>
                                        <input className={styles.input}
                                            type="radio"
                                            name="isFree"
                                        />
                                    <p>{errorCourse.isFree}</p>
                                        {errorCourse.isFree && <p>{errorCourse.isFree}</p>}
                                </div>

                                <div className={`${styles.h1}`}>
                                    <label>Idioma:</label>
                                    <input className={styles.input}
                                        type="text"
                                        name="language"
                                        value={newCourse.language}
                                        onChange={handleCourseChange}
                                        placeholder={modificarCourse ? course.language : 'Idioma'}
                                        />
                                    
                                        {errorCourse.language && <p>{errorCourse.language}</p>}

                                <div className={`${styles.h1}`}>
                                    
                                <div className={styles.tecnologias} >
                                    <label>Tecnologías:</label>
                                    <SelectTechnologies 
                                    selectedTechnologies={selectedTechnologies} 
                                    setSelectedTechnologies={setSelectedTechnologies} 
                                    tecnology={tecnology} handleCourseChange={handleCourseChange} />
                                    <button className={styles.button} onClick={HandleSelectTechnologies}>Ok</button>
                                </div>
                        
                                </div>
                                {/* <label>Selecciona las tecnologías</label>
                                {tecnology?.map((tecnologia,i) => (
                                    <div key={i}>
                                    <label>{tecnologia.name}    </label>
                                    <input type="checkbox"
                                    value= {tecnologia}
                                    name = "tecnology"
                                    onChange={handleMultipleSelection}
                                    />
                                    </div>
                                ))} */}
                                </div>
                          

                            <button className={styles.button} onClick={handleCoursePost}>
                                {modificarCourse
                                    ? "Editar"
                                    : "Postear curso"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <h2>Crear un curso nuevo</h2>
                        <button className={styles.button} onClick={handlePostCourse}>
                            Crear curso
                        </button>
                    </>
                )}
                {modificarCourse ? (
                    <></>
                ) : (
                    <div className={`${styles.coursesContainer}`}>
                        <h1>Courses</h1>
                        <Table className={`${styles.Tabla} table table-striped table-bordered table-hover`}>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Nombre</th>
                                <th>Rating</th>
                                <th>Fecha de lanzamiento</th>
                                <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!courses.length && courses.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.title}</td>
                                        <td>{course.meanRating}</td>
                                        <td>{course.released}</td>
                                        <td>
                                 <button onClick={() => handleModificarCurso(course.id)}className={styles.modificarButton}><svg xmlns="http://www.w3.org/2000/svg" className={styles.mod} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path><path d="M21 3a16 16 0 0 0 -12.8 10.2"></path><path d="M21 3a16 16 0 0 1 -10.2 12.8"></path><path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path>
                                    </svg></button>
                                <button onClick={() =>handleDeleteCourse (course.id)}className={styles.deleteButton}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.bin} viewBox="0 0 16 16">
                                       <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                    </svg></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )}
            </section>
        </div>
    </div>
);
}
export default Courses;
