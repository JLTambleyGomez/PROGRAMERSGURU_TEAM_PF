import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_categories,get_courses_all, } from "../../../Redux/actions";

import styles from "./HomePage.module.css";
import Cards from '../../datos/Cards/Cards';


//_________________________module_________________________
function HomePage () {

    //const:
    const courses= useSelector((state)=> state.courses)
    const dispatch= useDispatch()


    useEffect(()=>{
        dispatch(get_courses_all())
    },[])



    //states:
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 3;
    const pageNumberCourses = [];

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirtCourse = indexOfLastCourse - coursesPerPage;
    const currentAllCourses = courses.slice(indexOfFirtCourse, indexOfLastCourse);

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
        dispatch(get_courses_all())
    }, []);


    //component:
    return (
        <div className={styles.container}>
            <h1 className={styles.h1}>Ultimos Cursos del Mercado</h1>
            <div className={styles.pagination}>
                {
                    pageNumberCourses.map((number, index) => {
                        return (
                            <button key={index} className={styles.paginationbutton} onClick={() => {paginate(number)}}>
                                <div >{number}</div>
                            </button>
                        )
                    })
                }
            </div>
            <Cards courses = {currentAllCourses} /> 
        </div>
    );
}

export default HomePage;