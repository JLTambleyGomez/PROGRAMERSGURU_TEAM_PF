import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Dark_Mode } from "../../../Redux/actions";
import theme from "../../../theme/theme";
import logoutUser from "../../../user/logOut"

import { FaSun, FaMoon } from "react-icons/fa";
import s from "./Menu.module.css";

//_________________________module_________________________
function Menu () {

    //global state:
    const dark = useSelector((state) => state.darkMode);
    const logo= useSelector((state)=>state.user?.picture)

    //states:
    const [isDarkMode, setIsDarkMode] = useState(null)

    //const:
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const userImage = "https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664"


    //functions:
    const handleDarkMode = () => {
        setIsDarkMode(!isDarkMode) //para controlar el icono de sol y luna.
        localStorage.setItem("darkMode", !isDarkMode);
        dispatch(Dark_Mode())
    };

    //life-cycles:
    useEffect(() => {
        if (isDarkMode === null) {
          const localDark = localStorage.getItem("darkMode");
          setIsDarkMode(localDark ? JSON.parse(localDark) : false);
        }
    }, [isDarkMode]);


    // component:
    return  (
        <div className={`${s.component}`}>

            <div className={`${s.imageWrapper}`}>
            {logo ? ( <img src = {logo} alt = "user image" className={`${s.image}`}/>):( <img src = {userImage} alt = "user image" className={`${s.image}`}/>)}
            </div>

            <ul className={`${s.options}`}>
                <li onClick = {() => {navigate('/profile')}}>Perfil</li>
                <button className={`${s.themeButton} ${s[theme("themeButton")]}`} onClick={handleDarkMode}>
                    {isDarkMode ? <FaSun className={s.sun}/> : <FaMoon className={s.moon}/>}
                </button>
                <li onClick = {logoutUser}>Salir</li>
            </ul>

        </div>
    )
};

export default Menu;
