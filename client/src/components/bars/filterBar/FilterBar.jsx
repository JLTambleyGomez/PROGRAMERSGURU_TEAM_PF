import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { filter_courses_by_language, filter_courses_by_price, order_courses , get_courses_all} from "../../../Redux/actions";
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
    const [currentValue, setCurrentValue] = useState("");

    //const:
    const dispatch = useDispatch();
    const darkmode = useSelector((state)=> state.darkMode);

 
 
    const handlebuttonModal = () => {
        setShowBar((prevShowBar) => !prevShowBar);
    }

    //life-cycles:
    useEffect(() => {
        const updatedElementClasses = {};

        Object.keys(elementClasses).forEach((key) => {
            updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
        });

        setElementClasses(updatedElementClasses);
    }, [darkmode]);

    const handleSortChange = (event) => {
        const sortValue = event.target.value;
         switch (sortValue) {
          case "Ascendente":
            dispatch(order_courses("Ascendente"));
            break;
          case "Desendente":
            dispatch(order_courses("Desendente"));
            break;
     
          default:
            break;
        }   
      };
      const handleLanguageChange = (event) => {
        const languageValue = event.target.value;
        
        switch (languageValue) {
        case "English":
            dispatch(filter_courses_by_language("English"));
            break;
        case "Spanish":
            dispatch(filter_courses_by_language("Spanish"));
            break;
      }};

      const handleFilterReset=(event)=>{
        event.preventDefault();
        dispatch(get_courses_all());
      }

    //component:
    return (
        <div>
            <p>Ordenar por</p>
      <select onChange={handleSortChange}>
        <option value="">Ordenar</option>
        <option value="Ascendente">Nombre Ascendente</option>
        <option value="Desendente">Nombre Descendente</option>
        </select>

        <p>Idioma</p>
        <select onChange={handleLanguageChange}>
  <option value="">Ordenar</option>
  <option value="English">Cursos en Inglés</option>
  <option value="Spanish">Cursos en Español</option>
</select>
 <hr></hr>
<div>
       <button onClick = {handleFilterReset}>Show Me All</button>
</div>

        </div>
        
    );                 
}

export default FilterBar;