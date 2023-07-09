import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { filter_courses_by_language, filter_courses_by_price, order_courses , get_courses_all} from "../../../Redux/actions";

import { TbAdjustmentsHorizontal } from "react-icons/tb";
import styles from "./FilterBar.module.css";


//_________________________module_________________________
function FilterBar () {

    //states:
    const [showBar, setShowBar] = useState(false);
    const [elementClasses, setElementClasses] = useState({
        h1: "h1light",
        input: "inputlight",
        button: "buttonlight",
        buttoncontainer:"buttoncontainerlight",
        container: "containerslight",
        label: "labellight",
        p:"plight",
        div:"divlight",
        span:"spanlight",
        form: "formlight",
        hr: "hrlight",
        error:"errorlight",
        success:"successlight",
        link:"linklight",
        ul:"ullight",
        h2:"h2light",
    });

    const [showSideBar, setShowSideBar] = useState(false)
    const [showDropdownOne, setShowDropdownOne] = useState(false);
    const [showDropdownTwo, setShowDropdownTwo] = useState(false);
    const [showDropdownThree, setShowDropdownThree] = useState(false);

    //const:
    const dispatch = useDispatch();
    const darkmode = useSelector((state)=> state.darkMode);

    //functions:
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar)
    }

    const toggleDropDownOne = () => setShowDropdownOne(!showDropdownOne)
    const toggleDropDownTwo = () => setShowDropdownTwo(!showDropdownTwo)
    // const toggleDropDownThree = () => setShowDropdownThree(!showDropdownThree)

    const handleFilterByLanguage = (value) => {
        dispatch(filter_courses_by_language(value));
        setShowSideBar(true);
    }

    const handleFilterByPricing = (value) => {
        dispatch(filter_courses_by_price(value));
        setShowSideBar(true);
    }

    function languageSelectHandler(event) {
        const { value } = event.target;
        if (value !== "") {
            dispatch(filter_courses_by_language(value));
        }
    }

    function priceSelectHandler(event) {
        const { value } = event.target;
        if (value !== "") {
            dispatch(filter_courses_by_price(value));
        }
    }

    function buttonHandler(event) {
        event.preventDefault();
        dispatch(get_courses_all());
    }

    const handleMouseEnter = () => setShowBar(true);

    const handleMouseLeave = () => setShowBar(false);

    //en los handler que se refieren al mouse no es necesario 
    //event.preventDefault();ya que no se necesita prevenir el 
    //comportamiento predeterminado del evento  By Mica

    //life-cycles:
    useEffect(() => {
        const updatedElementClasses = {};

        Object.keys(elementClasses).forEach((key) => {
        updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
        });

        setElementClasses(updatedElementClasses);
    }, [darkmode]);

    //component:
    return (
        <div>
            <button onClick={toggleSideBar}>
                <TbAdjustmentsHorizontal/>
                FILTRAR
            </button>
            {
                showSideBar && (
                    <>
                        <div className={styles.filterBarOverlay} onClick={toggleSideBar}/>
                        <aside className={`${styles.filterBarSidebar} ${darkmode ? styles['filterBarSidebar-dark'] : styles['filterBarSidebar-light']}`}>
                            <label className={styles.filterBarMainLabel}>VER TODOS LOS CURSOS</label>
                            <div className={styles.filterBarSection}>
                                <label onClick={toggleDropDownTwo}>FILTRAR POR PRECIO</label>
                                {
                                    showDropdownTwo && (
                                        <ul>
                                            <li onClick={() => handleFilterByPricing(true)}>Acceso libre</li>
                                            <li onClick={() => handleFilterByPricing(false)}>Requiere compra</li>
                                        </ul>
                                    )
                                }
                            </div>
                            <div className={styles.filterBarSection}>
                                <label onClick={toggleDropDownOne}>FILTRAR POR IDIOMA</label>
                                {
                                    showDropdownOne && (
                                        <ul>
                                            <li onClick={() => handleFilterByLanguage("español")}>Español</li>
                                            <li onClick={() => handleFilterByLanguage("inglés")}>Inglés</li>
                                        </ul>
                                    )
                                }
                            </div>
                            {/* AGREGAR INPUT A CADA OPCION Y ALMACENAR LOS FILTROS */}
                            <button className={`${styles.filterButton} ${darkmode ? styles['filterButton-dark'] : styles['filterButton-light']}`}>
                                APLICAR FILTROS
                            </button>
                        </aside>
                    </>
                )
            }
        </div>
    );
}

export default FilterBar;