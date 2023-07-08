import { useDispatch,useSelector } from "react-redux";
import { useState,useEffect } from "react";
import { filter_courses_by_language, filter_courses_by_price, order_courses , get_courses_all} from "../../../Redux/actions";
import styles from "./Filter_Bar.module.css";

function FilterBar() {
  const dispatch = useDispatch();
  const [showBar, setShowBar] = useState(false);
  const darkmode = useSelector((state)=> state.darkMode);
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

  useEffect(() => {
    const updatedElementClasses = {};

    Object.keys(elementClasses).forEach((key) => {
      updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
    });

    setElementClasses(updatedElementClasses);
}, [darkmode]);

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

function orderSelectHandler(event) {
  const { value } = event.target;
  if (value !== "") {
    dispatch(order_courses(value));
  }
}

function buttonHandler(event) {
  event.preventDefault();
  dispatch(get_courses_all());
}
//en los handler que se refieren al mouse no es necesario 
//event.preventDefault(); ya que sus funciones no alteran 
function handleMouseEnter() {
  setShowBar(true);
}

function handleMouseLeave() {
  setShowBar(false);
}

  return (
    <div className={`${styles.container} ${styles[elementClasses.container]}`}>
    <div className={`${styles.container} ${styles[elementClasses.container]}`}
     onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      Filtros : <img className={styles.img} src="https://w7.pngwing.com/pngs/403/20/png-transparent-computer-icons-filter-miscellaneous-angle-rectangle-thumbnail.png" alt="sample45" />
      {showBar && (
        <div className={styles.bar1}>
          <p>Selecciona Lenguaje</p>
          <select onChange={languageSelectHandler}>
            <option value="">idioma/language</option>
            <option value="español">español</option>
            <option value="inglés">ingles</option>
          </select>

          <p>Selecciona Coste</p>
          <select onChange={priceSelectHandler}>
            <option value="">select price</option>
            <option value="true">Free/Gratis</option>
            <option value="false">Pagado/Payed</option>
          </select>

          <p>Ordenar Asc/Des</p>
          <select onChange={orderSelectHandler}>
            <option value="">Ordenar</option>
            <option value="ABC+">Nombre Ascendente</option>
            <option value="ABC-">Nombre Descendente</option>
          </select>
     
        </div>
        
      )} 
    
    </div>
    <p className={styles.pinvi}>__Micarulz__</p>
          <p className={`${styles.p} ${styles[elementClasses.p]}`} 
      onClick={buttonHandler}>Search/Filter Reset</p>
     </div>
  );
}

export default FilterBar;
