import { useState } from "react";
import { useDispatch } from "react-redux";

import { filter_courses_by_language, filter_courses_by_price, order_courses , get_courses_all } from "../../../Redux/actions";

import "./OrderBar.css"
//_________________________module_________________________
function OrderBar () {
    
    //states:
    const [showSideBar, setShowSideBar] = useState(false);
    const [showDropdownOne, setShowDropdownOne] = useState(false);
    const [showDropdownTwo, setShowDropdownTwo] = useState(false);

    //const:
    const dispatch = useDispatch();

    const arrayStates = {
        showDropdownOne: setShowDropdownOne,
        showDropdownTwo: setShowDropdownTwo
    }

    //functions:
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar)
    }

    const toggleDropDown = (value) => {
        // value === showDropdownOne && setShowDropdownOne(!sectionNumber)
        // arrayStates.forEach((state) => {
        //     if (state.toString().contains(value)) {
        //         state()
        //     }
        // })
        for (const state in arrayStates) {
            if (arrayStates.hasOwnProperty(state) && state[prop].toString().contains(value)) {
                state[prop](!state)
            }
        }
    }


    const handleOrder = (value) => {
        if (value !== "") {
            dispatch(order_courses(value));
            setShowSideBar(true);
            setShowDropdownOne(false)
        }
    }

    //component:
    return (
        <div className="orderBarContainer">
            <label onClick={toggleSideBar}>ORDENAR</label>
            {
                showSideBar && (
                    <>
                        <div className="orderBarOverlay" onClick={toggleSideBar}/>
                        <aside className="orderBarSidebar">
                            <div className="orderBarSection">
                                <label onClick={() => {toggleDropDown("one")}}>ORDENAR POR NOMBRE</label>
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
                                <label onClick={() => {toggleDropDown("two")}}>ORDENAR POR PUNTUACION</label>
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