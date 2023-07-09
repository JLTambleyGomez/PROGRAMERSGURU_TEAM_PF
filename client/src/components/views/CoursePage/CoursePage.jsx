import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import "./CoursePage.css";
import FilterBar from "../../bars/filterBar/FilterBar";
import OrderBar from "../../bars/orderBar/OrderBar";

//_________________________module_________________________
function CoursePage () {

    //component:
    return (
        <div className="coursePageComponent">
            <div className="coursePageC-mainBanner">
                <img alt="logo"/>
                <h1>Explora todos nuestros cursos</h1>
            </div>
            <div className="coursePageC-filters">
                <FilterBar/>
                {/* <button>ORDENAR</button> */}
                <OrderBar/>
            </div>
            <div className="coursePageC-cards">
                <div className="coursePageC-card"></div>
                <div className="coursePageC-card"></div>
                <div className="coursePageC-card"></div>
                <div className="coursePageC-card"></div>
                <div className="coursePageC-card"></div>
                <div className="coursePageC-card"></div>
                <div className="coursePageC-card"></div>
                <div className="coursePageC-card"></div>
                <div className="coursePageC-card"></div>
            </div>
        </div>
    )
}

export default CoursePage;