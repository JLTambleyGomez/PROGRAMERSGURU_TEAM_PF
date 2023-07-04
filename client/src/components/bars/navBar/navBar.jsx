import style from './navBar.module.css';
import { NavLink } from "react-router-dom";
import SearchBar from '../searchBar/searchBar';
import FilterBar from '../filterBar/Filter_Bar';



function NavBar() {
  return (

    <div>
      <div className = {style.container}>
        <div className = {style.bar1}>
          <div className = {style.buttonContainer}>
            <button className = {style.myButton}>
                <NavLink to="/HomePage" className={style.link}>
                  Home
                </NavLink>
            </button>
            <button className={style.myButton}>
              <NavLink to="/CoursePage" className={style.link}>
                Courses
              </NavLink>
            </button>
            <button className = {style.myButton}>
              <NavLink to="/" className = {style.link}>
                Salir
              </NavLink>
            </button>

          </div>
        </div>
      </div>
      <FilterBar></FilterBar>
      <div className={style.searchBarContainer}>
        <SearchBar/>
      </div>
 

    </div>
  );
}





export default NavBar;
