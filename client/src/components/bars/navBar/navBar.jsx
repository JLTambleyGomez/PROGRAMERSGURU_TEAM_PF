import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

// import styles from './navBar.module.css';
import s from "./navBar.module.css";
import SearchBar from '../searchBar/searchBar';
import Menu from '../Menu/Menu';

//_________________________module_________________________
function NavBar ({logoutUser}) {

    //global states:
    const dark = useSelector((state) => state.darkMode);

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    //const:
    const location = useLocation();

    //component:
    return (
        <nav className={`${s.component} ${s[theme("component")]}`}>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/HomePage" className={`${s.link} ${s[theme("link")]}`}>
                    Inicio
                </NavLink>
            </button>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/CoursePage" className={`${s.link} ${s[theme("link")]}`}>
                    Cursos
                </NavLink>
            </button>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/Commingsoon" className={`${s.link} ${s[theme("link")]}`}>
                    Tienda ¡Pronto!
                </NavLink>
            </button>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/Commingsoon" className={`${s.link} ${s[theme("link")]}`}>
                    Lista de Deseos ¡Pronto!
                </NavLink>
            </button>
            <SearchBar/>
            <Menu logoutUser={logoutUser}/>
        </nav>
    );
}


export default NavBar;