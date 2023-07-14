import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { get_courses_all, clearMessage, clearCourses } from "../../../Redux/actions";

import styles from "./CoursePage.module.css";
import CoursesCard from "../../datos/CoursesCard/CoursesCard";
import FilterBar from "../../bars/filterBar/FilterBar";
import OrderBar from "../../bars/orderBar/OrderBar";

//_________________________module_________________________
function CoursePage () {

    //states:
    const allCourses = useSelector((state) => state.courses)
    const [isloading, setIsloading] = useState(true);

    //const:
    const dispatch = useDispatch();

    //life-cycles:
    useEffect(() => {
        if (!allCourses.length){
          dispatch(get_courses_all());
        }
        return () => { 
            dispatch(clearMessage());
            dispatch(clearCourses());
        };
    }, [dispatch]);

    useEffect(() => {
        setIsloading(true);
        const timer = setTimeout(() => {
            setIsloading(false);
        }, 500);
    }, [allCourses])


    //component:
    return (
        <main className = {styles.component}>
            <div className={styles.mainBanner}>
                <h1>Explora todos nuestros cursos</h1>
            </div>
            <div className={styles.filterOrder}>
                <FilterBar/>
            </div>
           
            <div className = {styles.cardComponent}>
               {/* {allCourses.length?(<CoursesCard allCourses = {allCourses}/>):""}  */}
                {
                    isloading ? (<h1 className={styles.cargando}>CARGANDO...</h1>)
                    : <CoursesCard/>
                }
                {/* {allCourses ? (<CoursesCard/>):"isLoading"}  */}
            </div>
        </main>
    )
}

export default CoursePage;