import { useState,useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import s from "./SubscripcionesFlotante.module.css"

//_________________________module_________________________
function SubscripcionFlotante () {

    //global state:
    const dark = useSelector((state) => state.darkMode)

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
                        <p>
                            Subscribete por tan solo 2 dólares
                        </p>
                        <p onClick={handleclosebutton}>x</p>
                    </div>
                )
            }
        </>
    )
}


export default SubscripcionFlotante;