import { useDispatch } from "react-redux";
import { filter_courses_by_language, filter_courses_by_price, order_courses, } from "../../../Redux/actions";

import style from "./Filter_Bar.module.css";


//_________________________module_________________________
function FilterBar () {

    //const:
    const dispacth = useDispatch();


    //functions:
    function languageSelectHandler(event) {
        if (event.target.value !== "")
        dispacth(filter_courses_by_language(event.target.value))
    }

    function priceSelectHandler(event) {
        if (event.target.value !== "")
        dispacth(filter_courses_by_price(event.target.value))
    }

    function orderSelectHandler(event) {
        if (event.target.value !== "")
        dispacth(order_courses(event.target.value))
    }

    //component:
    return (
        <div className={style.bar1}>
            <p>Selecciona Lenguaje</p>
            <select onChange={languageSelectHandler}>
                <option value="">idioma/language</option>
                <option value="Español">Español</option>
                <option value="English">English</option>
            </select>

            <p>Selecciona Coste</p>
            <select onChange={priceSelectHandler}>
                <option value="">select price</option>
                <option value="true">Free/Gratis</option>
                <option value="false">Pagado/Payed</option>
            </select>

            <p>Ordenar Asc/Des </p>
            <select onChange={orderSelectHandler}>
                <option value="">Ordenar</option>
                <option value="ABC+">Nombre Ascendente</option>
                <option value="ABC-">Nombre Descendente</option>
            </select>
        </div>
    );
}

export default FilterBar; 