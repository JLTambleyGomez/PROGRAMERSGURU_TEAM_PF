import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";

// import styles from './navBar.module.css';
import s from "./navBar.module.css";
import SearchBar from '../searchBar/searchBar';
import Menu from '../Menu/Menu';

//_________________________module_________________________
function NavBar ( { logoutUser } ) {

    //global states:
    const dark = useSelector((state) => state.darkMode);

    //states:
    const [shopbag, setShopbag] = useState(false);

    //const:
    const location = useLocation();

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const toggleShopbag = () => {
        setShopbag(!shopbag)
    }

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
            <FontAwesomeIcon
                onClick={toggleShopbag}
                icon={faBagShopping}
            />
            {
                shopbag && (
                    <div className={s.shopbagOverlay} onClick={toggleShopbag}>
                        <aside className={s.shopbag} onClick={(event) => event.stopPropagation()}> 
                            bag
                        </aside>
                    </div>
                )
            }
        </nav>
    );
}

export default NavBar;