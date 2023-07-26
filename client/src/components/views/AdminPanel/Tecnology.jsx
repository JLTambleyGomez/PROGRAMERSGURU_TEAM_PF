import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Table } from "react-bootstrap";
import styles from "./Tecnology.module.css";
import {
    get_tecnology,
    post_tecnology,
    delete_tecnology,
    clearMessage,
} from "../../../Redux/actions";
import { validateTecnology } from "./validate";
import ObjectsList from "./Paginacion/ObjectsList";

const Tecnology = () => {
    //global state
    //no sé si esta bien
    const tecnology = useSelector((state) => state.tecnology)

    //estados locales
    const [input, setInput] = useState("");
    const [errorTecnology, setErrorTecnology] = useState("");

    //hooks
    const dispatch = useDispatch();

    //funciones:
    const handleInputChange = (event) => {
        const valueInput = event.target.value;

        setInput(valueInput);
        setErrorTecnology(validateTecnology(valueInput));
    };

    const handleSubmitTecnology = async (event) => {
        event.preventDefault();
        await dispatch(post_tecnology({ technology: input }));
        dispatch(get_tecnology());
        setInput("");
    };

    const handleDelete = async (id) => {
        await dispatch(delete_tecnology(id));
        dispatch(get_tecnology());
    };

    //life-cycles:
    useEffect(() => {
        if (!tecnology.length) dispatch(get_tecnology());

        //posibilidad de eliminar la funcion de desmontaje y reemplazarla con el useEffect:
        return () => {
            dispatch(clearMessage());
        };
    }, []);

    useEffect(() => {
        (async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            dispatch(clearMessage());
        })();
    }, [dispatch]);

    //component:
    return (
        <div className={styles.contenedor}>
            <h1 className={`${styles.h1}`}> Tecnologías</h1>
            <form className={`${styles.form}`}>
                <div>
                    <label htmlFor="name">Nombre: </label>
                    <input
                        name="name"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Ingresa una tecnologia"
                    />
                </div>
                <button onClick={handleSubmitTecnology}>Añadir</button>
            </form>
            <div>
                <ObjectsList handleDelete={handleDelete} objects={tecnology} title={'Tecnologias'}/>

            </div>
        </div>
    );
};

export default Tecnology;
