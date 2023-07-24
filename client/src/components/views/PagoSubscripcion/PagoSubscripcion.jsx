import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { initMercadoPago } from "@mercadopago/sdk-react";
import { Dark_Mode, get_suscriptions } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import styles from "./PagoSubscripcion.module.css"
import PagoMercadopago from "../../datos/PagoMercadoPago/PagoMercadoPago";
import PagoMetamask from "../../datos/PagoMetamask/PagoMetamask";


//_________________________module_________________________
function PagoSubscripcion () {


    //global states:
    const dark = useSelector((state) => state.darkMode);
    const subscripciones = useSelector((state) => state.subscriptions);

    //states:
    const [subscripcion, setSubscripcion] = useState(null);
    const [MostrarPagos, setMostrarPagos] = useState(false);
    const [checkout, setCheckout] = useState(false);
    const [compra, setCompra] = useState(null);


    //const:
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = localStorage.getItem("accessToken");

    //functions:
    const handleAddSubscripcion = (selectedSubscripcion) => {
        setCheckout(true);
        setMostrarPagos(false);
        setSubscripcion(selectedSubscripcion);
    }

    const handlePagarButton = () => {
      if (subscripcion) {
        const referencia = {
            description: subscripcion.title,
            price: subscripcion.price,
            quantity: 1,
        }
        // localStorage.setItem("cart", JSON.stringify([referencia]));
        setCompra(referencia);
        setMostrarPagos(true)
      }
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
        console.log("fafas")
        console.log(subscripciones)
    }, [])

    //component:
    return (
        <main className={`${styles.component} ${styles[theme("component")]}`}>
            <h1 className={styles.title}>Subscríbete ya! y disfruta sin limitaciones</h1>

            <div className={styles.content}>
                <div className={styles.options}>
                    {
                        subscripciones.map((subscripcion) => (
                            <div key={subscripcion.id} className={styles.product}>
                                <img src={subscripcion.image} alt={subscripcion.title} className={styles.productImage} />
                                <h3 className={styles.item}>{subscripcion.title}</h3>
                                <p>{subscripcion.type}</p>
                                <p>{subscripcion.description}</p>
                                <p className={styles.p}>Por tan solo {subscripcion.price} dólares</p>
                                <p className={styles.buton} onClick={() => handleAddSubscripcion(subscripcion)}>
                                    Escoger
                                </p>
                            </div>
                        ))
                    }
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
                                            <p className={styles.item}>{subscripcion.title}</p>
                                            <h1>Valor Total: $ {subscripcion.price}</h1>
                                        </div>
                                    )
                                }
                            {/* MEDIOS DE PAGO */}
                                { !MostrarPagos && <p className={styles.pagar} onClick={handlePagarButton}>Mostrar opciones de pago</p> }
                                {
                                    true && (
                                        <div>
                                            <p>Escoge tu medio de Pago</p>
                                            {
                                                <PagoMercadopago reference={compra} />
                                            }
                                            <PagoMetamask total={subscripcion.price} />
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