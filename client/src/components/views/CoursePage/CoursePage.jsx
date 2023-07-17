import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_courses_all, clearMessage, clearCourses } from "../../../Redux/actions";

import styles from "./CoursePage.module.css";
import CoursesCard from "../../datos/CoursesCard/CoursesCard";
import FilterBar from "../../bars/filterBar/FilterBar";
import OrderBar from "../../bars/orderBar/OrderBar";
import Modal from "../ventanaemergente/ventana";

//_________________________module_________________________
function CoursePage () {


    //global states:
    const allCourses = useSelector((state) => state.courses)

    //states:
    const [isloading, setIsloading] = useState(true);

    //const:
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = sessionStorage.getItem("accessToken")

    //life-cycles:
    useEffect(() => {
        if (!allCourses.length) dispatch(get_courses_all());

        //--desmontado
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
        {/* BANNER */}
            <div className={styles.mainBanner}>
                <h1>Explora todos nuestros cursos</h1>
            </div>

        {/* FILTROS */}
            <div className={styles.filterOrder}>
                <FilterBar/>
            </div>

        {/* CURSOS */}

            {
                
                (<div className = {styles.cardComponent}>
                    {
                        isloading 
                        ? <h1 className={styles.cargando}>CARGANDO...</h1>
                        : <CoursesCard/>
                    }
                </div>)

            }
        </main>
    )
}

export default CoursePage;