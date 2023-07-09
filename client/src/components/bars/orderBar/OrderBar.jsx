import { useState } from "react";
import { useDispatch } from "react-redux";

import { filter_courses_by_language, filter_courses_by_price, order_courses , get_courses_all } from "../../../Redux/actions";

import "./OrderBar.css";

//_________________________module_________________________
function OrderBar () {

    //states:
    const [showSideBar, setShowSideBar] = useState(false);
    const [showDropdownOne, setShowDropdownOne] = useState(false);
    const [showDropdownTwo, setShowDropdownTwo] = useState(false);

    //const:
    const dispatch = useDispatch();

    //functions:
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar)
    }

    const toggleDropDownOne = () => setShowDropdownOne(!showDropdownOne)

    const toggleDropDownTwo = () => setShowDropdownTwo(!showDropdownTwo)

    const handleOrder = (value) => {
        dispatch(order_courses(value));
        setShowSideBar(true);
        setShowDropdownOne(false)
    }

    //component:
    return (
        <div className="orderBarContainer">
            <button onClick={toggleSideBar}>ORDENAR</button>
            {
                showSideBar && (
                    <>
                        <div className="orderBarOverlay" onClick={toggleSideBar}/>
                        <aside className="orderBarSidebar">
                            <div className="orderBarSection">
                                <label onClick={toggleDropDownOne}>ORDENAR POR NOMBRE</label>
                                    {
                                        showDropdownOne && (
                                            <ul>
                                                <li onClick={() => handleOrder("ABC+")}>Ascendente</li>
                                                <li onClick={() => handleOrder("ABC-")}>Descendente</li>
                                            </ul>
                                        )
                                    }
                            </div>
                            <div className="orderBarSection">
                                <label onClick={toggleDropDownTwo}>ORDENAR POR PUNTUACION</label>
                                    {
                                        showDropdownTwo && (
                                            <ul>
                                                <li onClick={() => console.log("dispatch rating +")}>Más valorado</li>
                                                <li onClick={() => console.log("dispatch rating -")}>Menos valorado</li>
                                            </ul>
                                        )
                                    }
                            </div>
                        </aside>
                    </>
                )
            }
      </div>
    )
}

export default OrderBar;