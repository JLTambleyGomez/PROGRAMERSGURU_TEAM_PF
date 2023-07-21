import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filter_courses_by_language, filter_courses_by_price, order_courses, get_courses_all, Dark_Mode } from "../../../Redux/actions";

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
    
    const modalRef = useRef(null);

    // Update the position of the filterModal on scroll
    useEffect(() => {
      const handleScroll = () => {
        if (sortModal && modalRef.current) {
          const { top } = modalRef.current.getBoundingClientRect();
          const offset = 20; // Adjust this value as needed to add some space between the modal and the top of the screen
  
          if (top <= offset) {
            // If the modal is at or above the offset, set its position to fixed
            modalRef.current.style.position = 'fixed';
            modalRef.current.style.top = `${offset}px`;
          } else {
            // Otherwise, set its position to relative to allow normal document flow
            modalRef.current.style.position = 'relative';
            modalRef.current.style.top = 'auto';
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [sortModal]);
  

    //life-cycles:
    useEffect(() => {
        console.log({ orden: orden, idioma: idioma, precio: price });
    }, [orden, idioma, price]);

    useEffect(() => {
        console.log(allCourses)
    }, [allCourses]);

    useEffect(() => {
        dispatch(Dark_Mode())
    }, [dark])

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
                <p>Orden</p>
                <select value={orden} onChange={handleSortChange}>
                    <option value="">Destacados</option>
                    <option value="Ascendente">Nombre Descendente</option>
                    <option value="Desendente">Nombre Ascendente</option>
                </select>
                <p>Filtros</p>
                <select value={idioma} onChange={handleLanguageChange}>
                    <option value="">Idioma</option>
                    <option value="Inglés">Cursos en Inglés</option>
                    <option value="Español">Cursos en Español</option>
                </select>
                <p>Acceso</p>
                <select value={price} onChange={handlePriceChange}>
                    <option value="">Precio</option>
                    <option value="true">Gratis</option>
                    <option value="false">De Pago</option>
                </select>

                <button onClick={handleFilterReset}>Mostrar Todos</button>
            </div>

        {/* RESPONSIVE */}
        <div className={s.reponsiveFilter}>
            <div className={`${s["responsive-component"]}`}>
                <button onClick={() => {setFilterModal(true)}}>
                    FILTRAR
                </button>
                <button onClick={() => {setSortModal(true)}}>
                    ORDENAR
                </button>
                <div>
                {/* {
                    filterModal && (
                        <div className={s.overlay} onClick={() => {setFilterModal(false)}}>
                            <div className={s.modal} onClick={(event) => {event.stopPropagation()}}>
                                <p>Filtros</p>
                                <select value={idioma} onChange={handleLanguageChange}>
                                    <option value="">Idioma</option>
                                    <option value="Inglés">Cursos en Inglés</option>
                                    <option value="Español">Cursos en Español</option>
                                </select>
                                <p>Acceso</p>
                                <select value={price} onChange={handlePriceChange}>
                                    <option value="">Acceso</option>
                                    <option value="true">Gratuito</option>
                                    <option value="false">Exclusivo</option>
                                </select>
                            </div>
                        </div>
                    )
                }
                {
                    sortModal && (
                        <div className={s.overlay} onClick={() => {setSortModal(false)}}>
                            <div className={s.modal} onClick={(event) => {event.stopPropagation()}}>
                                <p>Orden</p>
                                <select value={orden} onChange={handleSortChange}>
                                    <option value="">Destacados</option>
                                    <option value="Ascendente">Nombre Descendente</option>
                                    <option value="Desendente">Nombre Ascendente</option>
                                </select>
                            </div>                        
                        </div>
                    )
                } */}
                </div>
            </div>
        </div>
        </>
    );
}

export default FilterBar;