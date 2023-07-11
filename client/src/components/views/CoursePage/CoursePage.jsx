import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { get_courses_all, clearMessage, clearCourses } from "../../../Redux/actions";
import styles from "./CoursePage.module.css";
import CardsCourse from "../../datos/CardsCourse/CardsCourse";
import FilterBar from "../../bars/filterBar/FilterBar";
import OrderBar from "../../bars/orderBar/OrderBar";


//_________________________module_________________________
function CoursePage () {
    //states:
    const allCourses = useSelector((state) => state.courses)

    //const:
    const dispatch = useDispatch();

 
    
    //life-cycles:
    useEffect(() => {
    if (!allCourses.length){dispatch(get_courses_all());}

        
        return () => { 
          dispatch(clearMessage());
          dispatch(clearCourses());
        };
      }, [dispatch]);
      

    //component:
    return (
        <div className = {styles.component}>
            <div className={styles.mainBanner}>
                <h1>Explora todos nuestros cursos</h1>
            </div>
            <div className={styles.filterOrder}>
                <FilterBar/>
                {/* <OrderBar/> */}
            </div >
            <div className = {styles.cardComponent}>

                { allCourses.length?(<CardsCourse allCourses = {allCourses}/>):""}
            </div>
        </div>
    )
}

export default CoursePage;