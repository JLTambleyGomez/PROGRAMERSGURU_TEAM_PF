import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { toggle_shopbag, get_User_By_Email, get_products_all} from "../../../Redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import s from "./navBar.module.css";
import ConexionMetamask from "../../datos/PagoMetamask/ConexionMetamask";
import SubscripcionesButton from "../../datos/Subscripciones/SubscripcionesButton";
import SearchBar from '../searchBar/searchBar';
import Menu from '../Menu/Menu';

//_________________________module_________________________
function NavBar ( { logoutUser } ) {

    //global states:
    const dark = useSelector((state) => state.darkMode);
    const shopbag = useSelector((state) => state.shopbag);

    //states:
    const user = useSelector((state) => state.user);
    
    //const:
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const email = localStorage.getItem("email");
    const token = sessionStorage.getItem("accessToken")

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const toggleShopbag = () => {
        dispatch(toggle_shopbag(!shopbag))
    }


    //life-cycles:
    useEffect(() => {
        if (email) {
            if (!user?.email) dispatch(get_User_By_Email(email));
        }
    }, []) //testear con array vacio.

    useEffect(()=>{
        if (token){
            dispatch (get_products_all())
        }
    },[])

    //component:
    return (
        <nav className={`${s.component} ${s[theme("component")]}`}>
        {/* INICIO */}
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/HomePage" className={`${s.link} ${s[theme("link")]}`}>
                    Inicio
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gem" viewBox="0 0 16 16">
                      <path d="M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z"/></svg>
                </NavLink>
            </button>
        {/* CURSOS */}
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/CoursePage" className={`${s.link} ${s[theme("link")]}`}>
                    Cursos
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                        <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                        <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
                    </svg>
                </NavLink>
            </button>
        {/* TIENDA */}
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/store" className={`${s.link} ${s[theme("link")]}`}>
                    Tienda 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-shop" viewBox="0 0 16 16">
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                    </svg>  
                </NavLink>
            </button>
        {/* CARRITO */}
            <button className={`${s.button} ${s[theme("button")]}`}>
                <NavLink to="/Cart" className={`${s.link} ${s[theme("link")]}`}>
                    Carrito
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-stars" viewBox="0 0 16 16">
                        <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
                    </svg>
                </NavLink>
            </button>
        {/* SEARCHBAR */}
            <SearchBar/>
        {/* SUSCRIPCION */}
            <SubscripcionesButton/>
        {/* METAMASK */}
            <ConexionMetamask/>
        {/* BOLSA */}
            <FontAwesomeIcon
                className={s.bolsita}
                onClick={toggleShopbag}
                icon={faBagShopping}
            />
        {/* MENU */}
            <Menu logoutUser={logoutUser}/>
        </nav>
    );
}


export default NavBar;