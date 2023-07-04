import style from './navBar.module.css';
import { NavLink } from "react-router-dom";
import SearchBar from '../searchBar/searchBar';


function NavBar() {
  return (
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

          {/* <button className={style.myButton}>
            <NavLink to="/" className={style.link}>
              Contacto
            </NavLink>
          </button> */}

          {/*<button className={style.myButton}>
            <NavLink to="/faq" className={style.link}>
              Preguntas frequentes
            </NavLink>
          </button>*/}

          <button className = {style.myButton}>
            <NavLink to="/" className = {style.link}>
              Salir
            </NavLink>
          </button>

        </div>

      </div>

    </div> 
  );
}





export default NavBar;
