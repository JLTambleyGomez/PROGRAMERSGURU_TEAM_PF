import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Dark_Mode } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import s from "./SubscripcionesFlotante.module.css";

//_________________________module_________________________
function SubscripcionFlotante() {
    //states:
    const user = useSelector((state) => state.user);
    const dark = useSelector((state) => state.darkMode);
    const [mostrarboton, setMostrarboton] = useState(true);
    const [navigateAux, setNavigateAux] = useState(false);

    //const:
    const expirationDate = new Date(user?.expirationDate);
    const actualDate = new Date();
    const closeButton = "https://static.vecteezy.com/system/resources/thumbnails/009/344/496/small/x-transparent-free-png.png"
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //functions:
    const handleclosebutton = () => {
        setMostrarboton(false);
    };

    //life-cycles:
    useEffect(() => {
        setMostrarboton(true);
    }, []);

    useEffect(() => {
        navigateAux && navigate("/pagosubscripcion");
    }, [navigateAux]);

    useEffect(() => {
        dispatch(Dark_Mode());
    }, [dark]);

    //copmonent:
    return (
        <>
            {actualDate > expirationDate ? (
                <>
                    {mostrarboton && (
                        <div
                            className={`${s.component} ${
                                s[theme("component")]
                            }`}
                            onClick={() => setNavigateAux(true)}
                        >
                            <p>Subscribete por tan solo 2 dólares</p>
                            <img
                                src={closeButton} 
                                alt="close" 
                                className={s.close}
                                onClick={(event) => {
                                    handleclosebutton();
                                    event.stopPropagation();
                                }}
                            />
                            
                            {/* </p> */}
                        </div>
                    )}
                </>
            ) : null}
        </>
    );
}

export default SubscripcionFlotante;
