import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";
// import { get_courses_all, clearMessage, clearCourses } from "../../../Redux/actions";

import "./CoursePage.css";
// import CardsCourse from "../../datos/CardCourse/CardCourse";
import FilterBar from "../../bars/filterBar/FilterBar";
import OrderBar from "../../bars/orderBar/OrderBar";

//_________________________module_________________________
function CoursePage () {

    useEffect(() => {
        console.log("deberia aparecer algo mas")
    }, []);

    //component:
    return (
        <div >
            <div className="coursePageC-mainBanner">
                <img alt="logo"/>
                <h1>Explora todos nuestros cursos</h1>
            </div>
            <div className="coursePageC-filters">
                <FilterBar/>
                <OrderBar/>
            </div>

        </div>
    )
}

export default CoursePage;