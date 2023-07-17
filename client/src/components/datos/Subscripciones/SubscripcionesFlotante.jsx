import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// import theme from "../../../theme/theme";
import s from "./SubscripcionesFlotante.module.css"

//_________________________module_________________________
function SubscripcionFlotante () {

    //global state:
    const dark = useSelector((state) => state.darkMode);

    //states:
    const [mostrarboton, setMostrarboton] = useState(true);
    const [navigateAux, setNavigateAux] = useState(false);

    //const:
    const navigate = useNavigate();

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const handleclosebutton = () => {
        setMostrarboton(false)
    }

    //life-cycles:
    useEffect(() => {
        setMostrarboton(true);
    },[])

    useEffect(() => {
        navigateAux && navigate("/pagosubscripcion");
    }, [navigateAux])

    //copmonent:
    return (
        <>
            {
                mostrarboton && (
                    <div className={`${s.component} ${s[theme("component")]}`} onClick={() => setNavigateAux(true)}>
                        <p>
                            Subscribete por tan solo 2 dólares
                        </p>
                        <p className={s.close} onClick={(event) => {handleclosebutton(); event.stopPropagation()}}>x</p>
                    </div>
                )
            }
        </>
    )
}


export default SubscripcionFlotante;