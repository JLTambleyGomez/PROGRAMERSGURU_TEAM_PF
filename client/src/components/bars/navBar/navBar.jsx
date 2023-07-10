import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import s from "./NavBar.module.css";
import SearchBar from '../searchBar/searchBar';
import PerfilBar from '../perfilbar/perfilbar';

//_________________________module_________________________
function NavBar () {

    //global states:
    const dark = useSelector((state) => state.darkMode);

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    //life-cycles:
    useEffect(() => {
    }, [])

    //component:
    return (
        <div className={`${s.component} ${s[theme("component")]}`}>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/HomePage" className={`${s.link} ${s[theme("link")]}`}>
                    Home
                </NavLink>
            </button>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/CoursePage" className={`${s.link} ${s[theme("link")]}`}>
                    Courses
                </NavLink>
            </button>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/Commingsoon" className={`${s.link} ${s[theme("link")]}`}>
                    Store Comming Soon
                </NavLink>
            </button>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/Commingsoon" className={`${s.link} ${s[theme("link")]}`}>
                    Cart Comming Soon
                </NavLink>
            </button>
            <SearchBar/>
            <PerfilBar/>
        </div>
    );
}

export default NavBar;