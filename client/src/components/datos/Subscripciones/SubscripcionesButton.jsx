import styles from "./SubscripcionesButton.module.css"
import { NavLink } from "react-router-dom"
import { useNavigate } from "react-router-dom"
//_________________________module_________________________
const SubscripcionesButton =()=>{

   const  navigate = useNavigate()

   const handlenavigate = ()=>{
    navigate("/PagoSubscripcion")
   }


    return (

        <div className={styles.container}>
            <p onClick={handlenavigate} className={styles.botón}>Subscribete aquí</p>
        </div>
    )
}  


export default SubscripcionesButton



