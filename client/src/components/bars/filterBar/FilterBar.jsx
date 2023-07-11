import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { filter_courses_by_language, filter_courses_by_price, order_courses , get_courses_all} from "../../../Redux/actions";

import s from "./FilterBar.module.css";

//_________________________module_________________________
function FilterBar () {
    //states:
    const [showBar, setShowBar] = useState(false);
    const [currentValue, setCurrentValue] = useState("");
    const [orden, setOrden] = useState("")
    const [idioma, setIdioma] = useState("")




    

    //const:
    const dispatch = useDispatch();
    const darkmode = useSelector((state)=> state.darkMode);

    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const handlebuttonModal = () => {
        setShowBar((prevShowBar) => !prevShowBar);
    }

    const handleSortChange = async (event) => {
        const value = event.target.value;
        setOrden(value);
      
        if (idioma === "") {
            await dispatch(order_courses(value));
        } else {
            await dispatch(filter_courses_by_language(idioma));
            await dispatch(order_courses(value));
        }
    };

      const handleLanguageChange = async (event) => {
            const value = event.target.value;
        
        if (value === "") {
            await dispatch(get_courses_all());
        } else {
            if (value !== idioma) {
                await dispatch(get_courses_all());
            }
            await dispatch(filter_courses_by_language(value));
        }
            setIdioma(value);
        
        if (orden !== "") {
            await dispatch(order_courses(orden));
        }
    };
      
    const handleFilterReset = (event) => {
        event.preventDefault();
        dispatch(get_courses_all());
    }

    //life-cycles:
    useEffect(()=>{
        console.log(idioma)
    }, [idioma])

    useEffect(() => {
        console.log("deberia de aparecer los estados")
        console.log(idioma);
        console.log(orden)
    }, [])



    //component:
    return (
        <div className={`${s.component}`}>
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