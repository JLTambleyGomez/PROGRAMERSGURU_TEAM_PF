import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState,useEffect } from "react";
import styles from './navBar.module.css';
import SearchBar from '../searchBar/searchBar';
import FilterBar from '../filterBar/FilterBar';
import PerfilBar from '../perfilbar/perfilbar';


//_________________________module_________________________
function NavBar () {

    //const:
    const darkmode = useSelector((state)=> state.darkMode);
    const location = useLocation();
    //states:
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
    //life-cycles:
    useEffect(() => {
        const updatedElementClasses = {};

        Object.keys(elementClasses).forEach((key) => {
            updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
        });

        setElementClasses(updatedElementClasses);
    }, [darkmode]);

        const isCoursePage = location.pathname === "/CoursePage";

    //component:
    return (
        <div className={styles.container1}>
        {/* HEADER */}
            <div className={`${styles.container} ${styles[elementClasses.container]}`}>
                <div className={`${styles.div} ${styles[elementClasses.div]}`}>
                <div className={`${styles.buttoncontainer} ${styles[elementClasses.buttoncontainer]}`}>
                    <button className={`${styles.button} ${styles[elementClasses.button]}`}>
                        <NavLink to="/HomePage"className={`${styles.link} ${styles[elementClasses.link]}`}>
                            Home
                        </NavLink>
                    </button>
                    <button className={`${styles.button} ${styles[elementClasses.button]}`}>
                        <NavLink to="/CoursePage"className={`${styles.link} ${styles[elementClasses.link]}`}>
                            Courses
                        </NavLink>
                        </button>
                              <button className={`${styles.button} ${styles[elementClasses.button]}`}>
                        <NavLink to="/Compras" className={`${styles.link} ${styles[elementClasses.link]}`}>
                            Store
                        </NavLink>
                    </button>
                    <button className={`${styles.button} ${styles[elementClasses.button]}`}>
                        <NavLink to="/Cart"className={`${styles.link} ${styles[elementClasses.link]}`}>
                            Cart
                        </NavLink>
                    </button>
                   
                    <SearchBar/>
                    {isCoursePage && <FilterBar />}

                    <PerfilBar/>
                    
                </div> 
                </div>
            </div>
        </div>
    );
}


export default NavBar;