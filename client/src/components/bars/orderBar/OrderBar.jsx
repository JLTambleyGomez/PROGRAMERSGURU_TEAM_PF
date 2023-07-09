import { useState } from "react";
import { useDispatch } from "react-redux";

import { filter_courses_by_language, filter_courses_by_price, order_courses , get_courses_all } from "../../../Redux/actions";

//_________________________module_________________________
function OrderBar () {

    //const:
    const dispatch = useDispatch();

    //states:
    const [showOrderBarSection, setShowOrderBarSection] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false)


    //functions:
    const toggleOrderBarSection = () => {
        setShowOrderBarSection(!showOrderBarSection)
    }

    const toggleDropDown = () => {
        setShowDropdown(!showDropdown)
    }

    const handleOrder = (value) => {
        if (value !== "") {
            dispatch(order_courses(value));
            setShowOrderBarSection(true);
            setShowDropdown(false)
        }
    }

    //component:
    return (
        <div className="orderBarContainer">
        <sidebar className={`orderBarSidebar ${showOrderBarSection ? "active" : ""}`}>
          <div className="orderBarSection">
            <label onClick={toggleDropDown}>ORDENAR POR NOMBRE</label>
            {showDropdown && (
              <ul>
                <li onClick={() => handleOrder("ABC+")}>Ascendente</li>
                <li onClick={() => handleOrder("ABC-")}>Descendente</li>
              </ul>
            )}
          </div>
        </sidebar>
        <div className="orderBarContent">
          <div className="orderBarComponent">
            <div onClick={toggleOrderBarSection}>ORDENAR</div>
          </div>
        </div>
      </div>
  
    )
}

export default OrderBar;