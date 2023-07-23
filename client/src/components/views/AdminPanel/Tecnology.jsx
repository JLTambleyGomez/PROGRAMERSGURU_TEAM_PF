import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
        return () => {
            dispatch(clearMessage());
        };
    }, [])


    //component:
    return (
        <div>
            <h1> tecnologias</h1>
            <form>
                <div>
                    <label htmlFor='name'>Nombre: </label>
                    <input name='name' value={input} onChange={handleInputChange} placeholder='Ingresa una tecnologia'/>
                </div>
                <button onClick={handleSubmitTecnology}>Añadir</button>
            </form>

            {!!tecnology.length && tecnology.map((tec, i) => {
                return(<div key={i}>
                    <button onClick={() => handleDelete(tec.id)}>X</button>
                    <p>{tec.name}</p>
                </div>)
            })}
        </div>
    )
}

export default Tecnology