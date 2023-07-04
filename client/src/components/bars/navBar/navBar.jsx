import style from './barsup1.module.css';
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className={style.container}>
    <div className={style.bar1}>
      <div className={style.buttonContainer}>
       <button className={style.myButton}>
          <NavLink to="/HomePage" className={style.link}>
            Home
          </NavLink>
        </button>
      
        <button className={style.myButton}>
          <NavLink to="/PreguntasFrecuentes" className={style.link}>
            Preguntas Frecuentes
          </NavLink>
        </button>
        <button className={style.myButton}>
          <NavLink to="/Contacto" className={style.link}>
            Contacto
          </NavLink>
        </button>
        <button className={style.myButton}>
          <NavLink to="/SobreNosotros" className={style.link}>
            Sobre Nosotros
          </NavLink>
        </button>  
        <button className={style.myButton}>
          <NavLink to="/" className={style.link}>
            Salir
          </NavLink>
        </button>
      </div> 
    </div>
</div>
 
  );
}





export default NavBar;
