import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { initMercadoPago } from "@mercadopago/sdk-react";
import { Dark_Mode } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import styles from "./PagoSubscripcion.module.css"
import PagoMercadopago from "../../datos/PagoMercadoPago/PagoMercadoPago";
import PagoMetamask from "../../datos/PagoMetamask/PagoMetamask";


//_________________________module_________________________
function PagoSubscripcion () {


    //global states:
    const dark = useSelector((state) => state.darkMode);


    //states:
    const [subscripcion, setSubscripcion] = useState(null);
    const [total, setTotal] = useState(0);
    const [MostrarPagos, setMostrarPagos] = useState(false);
    const [compra, setCompra] = useState({});
    const [checkout, setCheckout] = useState(false);


    //const:
    const navigate = useNavigate();
    const dispatch = useDispatch();


    //functions:
    const handleAddSubscripcion = (selectedSubscripcion) => {
        setCheckout(true);
        setMostrarPagos(false);
        setSubscripcion(selectedSubscripcion);
        setTotal(selectedSubscripcion.cost);
    }

    const handlePagarButton = () => {
        const referencia = {
            description: subscripcion.name,
            price: subscripcion.cost,
            quantity: 1,
        }
        setCompra(referencia)
        setMostrarPagos(true)
    }


    //life-cycles:
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) navigate("/IniciaSession");
    }, [])

    useEffect(() => {
        dispatch(Dark_Mode());
    }, [dark])

    useEffect(() => {
        console.log({compra})
    }, [compra])

    useEffect(() => {
        console.log("test");
        (async () => {
            await initMercadoPago('TEST-74e77fab-e33b-4709-8aef-3cb739639cc5');
            console.log("it started")
        })()
    }, [])


    //component:
    return (
        <main className={`${styles.component} ${styles[theme("component")]}`}>
            <h1 className={styles.title}>Subscríbete ya! y disfruta sin limitaciones</h1>

            <div className={styles.content}>
                <div className={styles.options}>
                {/* TIPOS DE SUSCRIPCION */}
                    <div className={styles.product}>
                        <h3 className={styles.item}>Subscripción 3 meses</h3>
                        <p className={styles.description} >Por tan solo 6 dólares</p>
                        <p className={styles.buton} onClick={() => handleAddSubscripcion({ name: "Subscripción 3 meses", cost: 6 })}>Escoger</p>
                    </div>

                    <div className={styles.product}>
                        <h3 className={styles.item}>Subscripción 6 meses</h3>
                        <p className={styles.description}>Por tan solo 12 dólares</p>
                        <p  className={styles.buton} onClick={() => handleAddSubscripcion({ name: "Subscripción 6 meses", cost: 12 })}>Escoger</p>
                    </div>

                    <div className={styles.product}>
                        <h3 className={styles.item}>Subscripción 1 Año!</h3>
                        <p className={styles.description}>Oferta: por tan solo 20 dólares</p>
                        <p className={styles.buton} onClick={() => handleAddSubscripcion({ name: "Subscripción 1 Año", cost: 20 })}>Escoger</p>
                    </div>
                </div>

                {
                    checkout && (
                        <div className={styles.checkoutOverlay} onClick={() => setCheckout(false)}>
                            <div className={styles.checkout} onClick={(e) => e.stopPropagation()}>
                            {/* RESUMEN */}
                                <h1>TU ELECCIÓN:</h1>
                                {
                                    subscripcion && (
                                        <div className={styles.totalcontainer}>
                                            <p className={styles.item}>{subscripcion.name}</p>
                                            <h1>Valor Total: $ {total}</h1>
                                        </div>
                                    )
                                }
                            {/* MEDIOS DE PAGO */}
                                { !MostrarPagos && <p className={styles.pagar} onClick={handlePagarButton}>Mostrar opciones de pago</p> }
                                {
                                    MostrarPagos && (
                                        <div>
                                            <p>Escoge tu medio de Pago</p>
                                            {
                                                <PagoMercadopago reference={compra} />
                                            }
                                            <PagoMetamask total={subscripcion.cost} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }

            </div>
        </main>
    );
}

export default PagoSubscripcion;
