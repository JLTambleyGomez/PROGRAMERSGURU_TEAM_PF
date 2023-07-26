import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import styles from "./Tecnology.module.css"
import {get_tecnology, post_tecnology, delete_tecnology, clearMessage} from "../../../Redux/actions";
import {validateTecnology} from './validate'



const Tecnology = () => {

    //global state
    const tecnology = useSelector((state)=> state.tecnology)

    //estados locales
    const [input, setInput] =  useState("")
    const [errorTecnology, setErrorTecnology] =  useState("")


    //hooks
    const dispatch = useDispatch()

    //funciones:
    const handleInputChange = (event) => {
        const valueInput = event.target.value

        setInput(valueInput)
        setErrorTecnology(validateTecnology(valueInput))
    }

    const handleSubmitTecnology = async (event) => {
        event.preventDefault();
        await dispatch(post_tecnology({technology: input}))
        dispatch(get_tecnology())
        setInput("")
    }

    const handleDelete = async (id) => {
        await dispatch(delete_tecnology(id))
        dispatch(get_tecnology())
    }
    
    //life-cycles:
    useEffect(()=>{
        if(!tecnology.length) dispatch(get_tecnology())

        //posibilidad de eliminar la funcion de desmontaje y reemplazarla con el useEffect:
        return () => {
            dispatch(clearMessage());
        };
    }, [])

    useEffect(() => {
        (async () => {
            await new Promise(resolve => setTimeout(resolve, 5000));
            dispatch(clearMessage());
        })()
    }, [dispatch])


    //component:
    return (
        <div  className={styles.contenedor}>
            <h1 className={`${styles.h1}`}> Tecnologías</h1>
            <form className={`${styles.form}`}>
                <div>
                    <label htmlFor='name'>Nombre: </label>
                    <input name='name' value={input} onChange={handleInputChange} placeholder='Ingresa una tecnologia'/>
                </div>
                <button onClick={handleSubmitTecnology}>Añadir</button>
            </form>
             <div >
              <Table className={`${styles.Tabla} table table-striped table-bordered table-hover`}>
                <tbody >
                 <thead >
                   <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                   </tr>
                 </thead>
                     {tecnology.length && tecnology.map((tec, i) => (
                     <tr key={tec.id}>
                     <td>{tec.id}</td>
                     <td>{tec.name}</td>
                     <td>
                   <button onClick={() => handleDelete(tec.id) } className={`${styles.deleteButton}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" className={styles.bin} viewBox="0 0 16 16">
                             <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                          </svg></button>
                     </td>
                    </tr>
    ))}
  </tbody>
</Table>
</div>






        </div>
    )
}

export default Tecnology