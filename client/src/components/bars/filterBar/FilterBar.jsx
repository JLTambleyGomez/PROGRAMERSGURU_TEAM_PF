import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { filter_courses_by_language, filter_courses_by_price, order_courses, get_courses_all, Dark_Mode } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import s from "./FilterBar.module.css";

//_________________________module_________________________
function FilterBar() {

    //global states:
    const allCourses = useSelector((state) => state.allCourses);
    const dark = useSelector((state) => state.darkMode);

    //states:
    const [orden, setOrden] = useState("");
    const [idioma, setIdioma] = useState("");
    const [price, setPrice] = useState("");
    const [filterModal, setFilterModal] = useState(false);
    const [sortModal, setSortModal] = useState(false);


    //const:
    const dispatch = useDispatch();

    //functions:
    const resetFilters = () => {
        setOrden("");
        setIdioma("");
        setPrice("");
    };

    //_______________________________________
    const handleSortChange = async (event) => {
        const value = event.target.value;
        await setOrden(value);

        if (idioma === "" && price === "") {
            await dispatch(order_courses(value));
        }
        if (idioma !== "" && price !== "") {
            await dispatch(get_courses_all());
            await dispatch(filter_courses_by_language(idioma));
            await dispatch(filter_courses_by_price(price));
            await dispatch(order_courses(value));
        }
        if (idioma === "" && price !== "") {
            await dispatch(get_courses_all());
            await dispatch(filter_courses_by_price(price));
            await dispatch(order_courses(value));
        }
        if (idioma !== "" && price === "") {
            await dispatch(get_courses_all());
            await dispatch(filter_courses_by_language(idioma));
            await dispatch(order_courses(value));
        }
    };
    //_______________________________________
    const handleLanguageChange = async (event) => {
        const value = event.target.value;
      
        try {
            if (value === "") {
                    await dispatch(get_courses_all());
                    if (price) await dispatch(filter_courses_by_price(price))
                    if (orden) await dispatch(order_courses(orden));
                    await setIdioma(value);
            } else {
                if (value !== idioma) {
                    await dispatch(get_courses_all());
                    await setIdioma(value);
                }
                if (orden !== "" && value === "") {
                    await dispatch(order_courses(orden));
                }
                if (value === "" && orden === "" && price === "") {
                    await dispatch(get_courses_all());
                } else if (orden === "" && price === "") {
                    await dispatch(filter_courses_by_language(value));
                } else if (orden !== "" && price !== "") {
                    await dispatch(get_courses_all());
                    await dispatch(filter_courses_by_language(value));
                    await dispatch(filter_courses_by_price(price));
                    await dispatch(order_courses(orden));
                } else if (orden === "" && price !== "") {
                    await dispatch(get_courses_all());
                    await dispatch(filter_courses_by_language(value));
                    await dispatch(filter_courses_by_price(price));
                } else if (orden !== "" && price === "") {
                    await dispatch(get_courses_all());
                    await dispatch(filter_courses_by_language(value));
                    await dispatch(order_courses(orden));
                }
            }
        } catch (error) {
          // Manejar el error de forma adecuada (por ejemplo, mostrar un mensaje de error)
        }
    };
    //_______________________________________
    const handlePriceChange = async (event) => {
        const value = event.target.value;

        try {
            if (value === "") {
                    await dispatch(get_courses_all());
                    if (idioma) await dispatch(filter_courses_by_language(idioma))
                    if (orden) await dispatch(order_courses(orden));
                    await setPrice(value);
            } else {
                if (value !== price) {
                    await dispatch(get_courses_all());
                    await setPrice(value);
                }
                if (orden !== "" && value === "") {
                    await dispatch(order_courses(orden));
                }
                if (value === "" && orden === "" && price === "") {
                    await dispatch(get_courses_all());
                } else if (orden === "" && idioma === "") {
                    await dispatch(filter_courses_by_price(value));
                } else if (orden !== "" && idioma !== "") {
                    await dispatch(get_courses_all());
                    await dispatch(filter_courses_by_price(value));
                    await dispatch(filter_courses_by_language(idioma));
                    await dispatch(order_courses(orden));
                } else if (orden === "" && idioma !== "") {
                    await dispatch(get_courses_all());
                    await dispatch(filter_courses_by_price(value));
                    await dispatch(filter_courses_by_language(idioma));
                } else if (orden !== "" && idioma === "") {
                    await dispatch(get_courses_all());
                    await dispatch(filter_courses_by_price(value));
                    await dispatch(order_courses(orden));
                }
            }
        } catch (error) {
          // Manejar el error de forma adecuada (por ejemplo, mostrar un mensaje de error)
        }
    };

    const handleFilterReset = (event) => {
        event.preventDefault();
        dispatch(get_courses_all());
        resetFilters();
    };
  

    //life-cycles:
    useEffect(() => {
        console.log({ orden, idioma, price});
    }, [orden, idioma, price]);

    useEffect(() => {
        console.log(allCourses)
    }, [allCourses]);

    useEffect(() => {
        dispatch(Dark_Mode())
    }, [dark])

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth >= 700) {
            setFilterModal(false);
            setSortModal(false);
          }
        };
        window.addEventListener('resize', handleResize);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    useEffect(() => {
        const disableScroll = () => {
            document.body.style.overflow = 'hidden';
        };
        const enableScroll = () => {
            document.body.style.overflow = 'auto';
        };
        (filterModal || sortModal) ? disableScroll()
        : enableScroll()
    }, [filterModal, sortModal])

    


    //component:
    return (
        <>
            <div className={`${s.component}`}>
                <div className={s.optionSort}>
                    <label>ORDENAR POR:</label>
                    <select value={orden} onChange={handleSortChange}>
                        <option value="">Destacados</option>
                        <option value="Ascendente">Nombre Descendente (A-Z)</option>
                        <option value="Desendente">Nombre Ascendente (Z-A)</option>
                    </select>
                </div>
                <div className={s.optionFilter}>
                    <label>FILTROS:</label>
                    <span>
                        <select value={idioma} onChange={handleLanguageChange}>
                            <option value="">Idioma</option>
                            <option value="Inglés">Cursos en Inglés</option>
                            <option value="Español">Cursos en Español</option>
                        </select>
                        <select value={price} onChange={handlePriceChange}>
                            <option value="">Acceso</option>
                            <option value="true">Gratis</option>
                            <option value="false">De Pago</option>
                        </select>
                    </span>

                </div>

                <button className={s.button} onClick={handleFilterReset}>Mostrar Todos</button>
            </div>

        {/* RESPONSIVE */}
            <div className={`${s["responsive-component"]}`}>
                <button onClick={() => {setFilterModal(true)}}>
                    FILTRAR
                </button>
                <button onClick={() => {setSortModal(true)}}>
                    ORDENAR
                </button>
                {
                    filterModal && (
                        <div className={s.overlay} onClick={() => {setFilterModal(false)}}>
                            <div className={`${s.modal} ${s[theme("modal")]}`} onClick={(event) => {event.stopPropagation()}}>
                                <div className={s.modalDiv2}>

                                    <label>POR IDIOMA:</label>
                                    <select value={idioma} onChange={handleLanguageChange}>
                                        <option value="">Idioma</option>
                                        <option value="Inglés">Cursos en Inglés</option>
                                        <option value="Español">Cursos en Español</option>
                                    </select>
                                </div>
                                <div className={s.modalDiv2}>
                                    <label>POR ACCESO:</label>
                                    <select value={price} onChange={handlePriceChange}>
                                        <option value="">Acceso</option>
                                        <option value="true">Gratuito</option>
                                        <option value="false">Exclusivo</option>
                                    </select>
                                </div>
                                    <button style={{fontWeight: "bold"}} onClick={handleFilterReset}>MOSTRAR TODOS</button>
                            </div>
                        </div>
                    )
                }
                {
                    sortModal && (
                        <div className={s.overlay} onClick={() => {setSortModal(false)}}>
                            <div className={`${s.modal} ${s[theme("modal")]}`} onClick={(event) => {event.stopPropagation()}}>
                                <div className={s.modalDiv2}>
                                    <label>ORDENAR POR:</label>
                                    <select value={orden} onChange={handleSortChange}>
                                        <option value="">Destacados 
                                        </option>
                                        <option value="Ascendente">Nombre Ascendente (A-Z)</option>
                                        <option value="Desendente">Nombre Descendente (Z-A)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default FilterBar;