import { useState,useEffect } from "react"
import s from "./SubscripcionesFlotante.module.css"

//_________________________module_________________________
function SubscripcionFlotante () {

    //states:
    const [mostrarboton, setMostrarboton] = useState(true)

    //functions:
    const handleclosebutton=()=>{
        setMostrarboton(false)
    }

    //life-cycles:
    useEffect(() => {
        setMostrarboton(true)
    },[])

    //copmonent:
    return (
        <>
            {
                mostrarboton && (
                    <div className={s.component}>
                        <p>Subscribete por tan solo 2 dólares</p>
                        <button onClick={handleclosebutton}>x</button>
                    </div>
                )
            }
        </>
    )
}


export default SubscripcionFlotante;