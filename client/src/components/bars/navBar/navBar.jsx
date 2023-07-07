import { NavLink } from "react-router-dom";

import style from './navBar.module.css';
import SearchBar from '../searchBar/searchBar';
import FilterBar from '../filterBar/Filter_Bar';

import PerfilBar from '../perfilbar/perfilbar';


//_________________________module_________________________
function NavBar () {

    //component:
    return (
        <div>
        {/* HEADER */}
            <div className={style.container}>
                <div className={style.bar1}>
                <div className={style.buttonContainer}>
                    <button className={style.myButton}>
                        <NavLink to="/HomePage" className = {style.link}>
                            Home
                        </NavLink>
                    </button>
                    <button className={style.myButton}>
                        <NavLink to="/CoursePage" className = {style.link}>
                            Courses
                        </NavLink>
                    </button> 
                    <SearchBar/>
                    <FilterBar/>

                    <PerfilBar/>
                </div> 
                </div>
            </div>
            {/* FILTER */}
           
            {/* SEARCH */}
            <div >
               
            </div>
        </div>
    );
}


export default NavBar;