import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { get_courses_all, clearMessage, clearCourses } from "../../../Redux/actions";

import "./CoursePage.css";
import CardsCourse from "../../datos/CardsCourse/CardsCourse";
import FilterBar from "../../bars/filterBar/FilterBar";
import OrderBar from "../../bars/orderBar/OrderBar";

//_________________________module_________________________
function CoursePage () {

    //states:
    const courses = useSelector((state) => state.courses)

    //const:
    const dispatch = useDispatch();

    //life-cycles:
    useEffect(() => {
        try {
            console.log("deberia aparecer algo mas")
            dispatch(get_courses_all());
            console.log(courses)
        } catch (error) {
          // Ignorar errores y no hacer nada
        }
    }, [dispatch]);


    //component:
    return (
        <div >
            <div className="coursePageC-mainBanner">
                <img alt="logo"/>
                <h1>Explora todos nuestros cursos</h1>
            </div>
            <div className="coursePageC-filters">
                <FilterBar/>
                {/* <button>ORDENAR</button> */}
                <OrderBar/>
            </div>
            {
                Array.isArray(courses) ? (
                    <CardsCourse courses = {courses}/>
                ) : (
                    <p>No hay cursos disponibles.</p>
                )
            }
        </div>
    )
}

export default CoursePage;