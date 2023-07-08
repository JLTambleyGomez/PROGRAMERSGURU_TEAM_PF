import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_categories,get_courses_all,clearCourses,clearMessage,} from "../../../Redux/actions";
import styles from "./HomePage.module.css";
import Cards from '../../datos/Cards/Cards';


//_________________________module_________________________
function HomePage () {

    //const:
    const coursesAll= useSelector((state)=> state.courses)
    const courses = coursesAll.slice(-6)
    const dispatch= useDispatch()

    //states:
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3;
    const darkmode = useSelector((state)=> state.darkMode);
    const pageNumberCourses = [];
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirtCourse = indexOfLastCourse - coursesPerPage;
    const currentAllCourses = courses.slice(indexOfFirtCourse, indexOfLastCourse);


    const [elementClasses, setElementClasses] = useState({
        h1: "h1light",
        input: "inputlight",
        button: "buttonlight",
        buttoncontainer:"buttoncontainerlight",
        container: "containerslight",
        label: "labellight",
        p:"plight",
        div:"divlight",
        span:"spanlight",
        form: "formlight",
        hr: "hrlight",
        error:"errorlight",
        success:"successlight",
        link:"linklight",
        ul:"ullight",
        h2:"h2light",
    });

    useEffect(() => {
        const updatedElementClasses = {};

        Object.keys(elementClasses).forEach((key) => {
          updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
        });

        setElementClasses(updatedElementClasses);
      }, [darkmode]);

    //functions:
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber); 
    }

    (() => {
        for (let i = 1; i <= Math.ceil(courses.length / coursesPerPage); i++) {
            pageNumberCourses.push(i);
        }
    })()

    useEffect(() => {   
        dispatch(get_categories());
        dispatch(get_courses_all());
        return ()=>{                   // return ocupar para hacer algo en el desmontaje          
         dispatch(clearMessage()); // limpiar 
         dispatch(clearCourses()); }
    }, [dispatch]);

//{<h1>no hay cursos</h1>}

    //component:
    return (
        <div className={`${styles.container} ${styles[elementClasses.container]}`}>
            <div>
                <img className={styles.imgcat} src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?resize=476%2C280&ssl=1" alt = "banner"/>
            </div>
            {/* <div className = "ultimosCursos"> */}
                <h1 className={`${styles.h1} ${styles[elementClasses.h1]}`}>Ultimos Cursos del Mercado</h1>
                {/* <div className={styles.pagination}>
                    {
                        pageNumberCourses.map((number, index) => {
                            return (
                                <button key={index} className={`${styles.paginationbutton} ${styles[elementClasses.paginationbutton]}`} onClick={() => {paginate(number)}}>
                                    <div >{number}</div>
                                </button>
                            )
                        })
                    }
                </div> */}
                <div>
                    <Cards courses = {currentAllCourses} /> 
                </div>
            {/* </div> */}
            <div className='categoriasMasBuscadas'>
            </div>
            <div className='comentariosPorCurso'>
            </div>
            <div className="preguntasMasFrequentes">
            </div>
            <div className="newsletter">
            </div>
        </div>
    );
}

export default HomePage;