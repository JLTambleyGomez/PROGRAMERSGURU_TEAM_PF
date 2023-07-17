import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { get_courses_by_name } from "../../../Redux/actions";

import s from "./searchBar.module.css";

//_________________________module_________________________
function SearchBar () {

    //global states:
    const dark = useSelector((state) => state.darkMode);

    //states:
    const [input, setInput] = useState("");
    const [toggleVisibility, setToggleVisibility] = useState(true);
    const [mensajeBusqueda,setMensajeBusqueda] = useState(false)

    //const:
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const handleSearchInput = (event) => {
        setInput(event.target.value);
    };

    const handleSearchButton = async () => {
        await dispatch(get_courses_by_name(input));
        setInput("");
        setToggleVisibility(true);
        setMensajeBusqueda(true);
        navigate("/CoursePage");
        const timer = setTimeout(() => {
          setMensajeBusqueda(false);
        }, 2000);
    }

    const setDefault = (event) => {
        event.preventDefault();
        setTimeout(() => {
            setInput("");
            setToggleVisibility(true);
        }, 300);
    };

   //component:
   return (
        <div className={`${s.component} ${s[theme("component")]}`}>
            {
                toggleVisibility ? (
                    <div className={`${s.searchOff}`}>
                        <h1
                            className={`${s.label} ${s[theme("label")]}`}
                            onClick={() => setToggleVisibility(false)}
                        >
                            BUSCAR
                        </h1>
                    </div>
                ) : (
                    <div className={`${s.searchOn}`} onBlur={setDefault}>
                        <input
                            className={`${s.input}`}
                            type="search"
                            autoFocus  
                            onChange={handleSearchInput}
                            value={input}
                            placeholder='Intenta "Java"'
                        />
                        <button
                            className={`${s.button}`}
                            onClick={handleSearchButton}
                        >
                            <svg className={`${s.buttonIcon} ${s[theme("buttonIcon")]}`}  xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
                            </svg>
                        </button>
                      
                    </div>
                )
            } 
            { mensajeBusqueda && (
                <div > 
                    <p className={s.mensaje}>Estos son los resultados de tu búsqueda</p>
                </div>
            )}
        </div>
    );
}

export default SearchBar;