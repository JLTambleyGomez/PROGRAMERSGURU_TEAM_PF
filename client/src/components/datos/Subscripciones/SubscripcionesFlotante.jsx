import s from "./SubscripcionesFlotante.module.css"
import { useState,useEffect } from "react"

//_________________________module_________________________
const SubscripcionFlotante = () => {

    //states:
    const [mostrarboton, setMostrarboton] = useState(false)

    //functions:
    const handleclosebutton=()=>{
        setMostrarboton(false)
    }

    //life-cycles:
    useEffect(()=>{
        setMostrarboton(true)
    },[])


    //copmonent:
    return (
        <div className={s.component}>
            Subscribete por tan solo 2 dólares
            <p onClick={handleclosebutton}>x</p>
        </div>
    )
}


export default SubscripcionFlotante;