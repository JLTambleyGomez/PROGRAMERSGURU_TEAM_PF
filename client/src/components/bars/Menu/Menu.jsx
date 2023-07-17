import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Dark_Mode } from "../../../Redux/actions";
import { FaSun, FaMoon } from "react-icons/fa";

import logoutUser from "../../../user/logOut"

import s from "./Menu.module.css";

//_________________________module_________________________
function Menu () {

    //global state:
    const dark = useSelector((state) => state.darkMode);
    const logo= useSelector((state)=>state.user?.picture)

    //const:
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userImage = logo;
    // "https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664"

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const handleDarkMode = () => {
        dispatch(Dark_Mode(!dark));
    };

    // component:
    return  (
        <div className={`${s.component}`}>

            <div className={`${s.imageWrapper}`}>
            {logo ? ( <img src = {logo} alt = "user image" className={`${s.image}`}/>):( <img src = {"https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664"} alt = "user image" className={`${s.image}`}/>)}
            </div>

            <ul className={`${s.options}`}>
                <li onClick = {() => {navigate('/profile')}}>Perfil</li>
                <button className={`${s.themeButton} ${s[theme("themeButton")]}`} onClick={handleDarkMode}>
                    {dark ? <FaSun className={s.sun}/> : <FaMoon className={s.moon}/>}
                </button>
                <li onClick = {logoutUser}>Salir</li>
            </ul>

        </div>
    )
};

export default Menu;
