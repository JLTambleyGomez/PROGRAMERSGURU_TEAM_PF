import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dark_Mode } from "../../../Redux/actions";
import { FaSun, FaMoon } from "react-icons/fa";

import "./perfilbar.css";

//_________________________module_________________________
function PerfilBar () {

    //const:
    const navigate = useNavigate()
    const dispatch = useDispatch();
    
    const userImage = "https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664"
    
    const darkMode = useSelector((state) => state.darkMode);
    
    const handleDarkMode = () => {
        dispatch(Dark_Mode(!darkMode));
    };
    // component:
    return  (
        <div className = "accountOptionsWrapper">

            <div className = "accountOptionsImage">
                <img src = {userImage} alt = "user image" className = 'image'/>
            </div>

            <ul className = "accountOptionsList">
                <li onClick = {() => {navigate('/profile')}}>Account</li>
                <li onClick = {() => {navigate('/coursepage')}}>Courses</li>
                <button onClick={handleDarkMode}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
                <li onClick = {() => {navigate('/')}}>Sign out</li>
            </ul>

        </div>
    )
};

export default PerfilBar;
