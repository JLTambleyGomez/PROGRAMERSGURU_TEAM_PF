import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import PagoMetamask from "../../datos/PagoMetamask/PagoMetamask";
import { toggle_shopbag } from "../../../Redux/actions";

// import styles from './navBar.module.css';
import s from "./navBar.module.css";
import SearchBar from '../searchBar/searchBar';
import Menu from '../Menu/Menu';

//_________________________module_________________________
function NavBar ({logoutUser}) {

    //global states:
    const dark = useSelector((state) => state.darkMode);
    const shopbag = useSelector((state) => state.shopbag);

    //states:
    // const [shopbag, setShopbag] = useState(false);

    //const:
    const location = useLocation();
    const disptach = useDispatch();

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const toggleShopbag = () => {
        dispatch(toggle_shopbag(!shopbag))
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
                <NavLink to="/store" className={`${s.link} ${s[theme("link")]}`}>
                    Tienda 
                </NavLink>
            </button>
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/Cart" className={`${s.link} ${s[theme("link")]}`}>
                    Carrito
                </NavLink>
            </button>
            <SearchBar/>
            <PagoMetamask></PagoMetamask>
            <Menu logoutUser={logoutUser}/>
            <FontAwesomeIcon
                onClick={toggleShopbag}
                icon={faBagShopping}
            />
            {/* {
                shopbag && (
                    <div className={s.shopbagOverlay} onClick={toggleShopbag}>
                        <aside className={s.shopbag} onClick={(event) => event.stopPropagation()}>
                            elementos
                        </aside>
                    </div>
                )
            } */}
        </nav>
    );
}


export default NavBar;