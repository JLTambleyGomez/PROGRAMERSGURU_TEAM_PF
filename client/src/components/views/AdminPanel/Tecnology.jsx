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
        <div  className={styles.tableContainer}>
            <h1> tecnologias</h1>
            <form>
                <div>
                    <label htmlFor='name'>Nombre: </label>
                    <input name='name' value={input} onChange={handleInputChange} placeholder='Ingresa una tecnologia'/>
                </div>
                <button onClick={handleSubmitTecnology}>Añadir</button>
            </form>

         <div >

            <Table striped bordered hover >
                
 
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
          <button onClick={() => handleDelete(tec.id)}>X</button>
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