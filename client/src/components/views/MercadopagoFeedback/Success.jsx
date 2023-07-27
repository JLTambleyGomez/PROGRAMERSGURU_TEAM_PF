import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getMercadopagoFeedback } from "../../../axiosRequests/axiosRequests";
import { get_User_By_Email, get_products_all } from "../../../Redux/actions";

import styles from "./Success.module.css";

//_________________________module_________________________
function Success() {
    const navigate = useNavigate();
    //global states:
    const cart = useSelector((state) => state.cart);

    //states:
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [error, setError] = useState('');

    //const:
    const location = useLocation();
    const dispatch = useDispatch();
    const searchParams = new URLSearchParams(location.search);
    const status = searchParams.get("status");
    console.log(status);

    //life-cycles:
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) navigate("/IniciaSession");
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const compraString = localStorage.getItem("cart"); // Obtener el contenido del carrito del almacenamiento local como una cadena de texto
                const compra = JSON.parse(compraString); // Convertir la cadena de texto a un arreglo de objetos
                const email = localStorage.getItem("email");
                await dispatch(get_User_By_Email(email));
                const searchParams = new URLSearchParams(location.search);
                const paymentId = searchParams.get("payment_id");
                const status = searchParams.get("status");
                const merchantOrderId = searchParams.get("merchant_order_id");

                const data = await getMercadopagoFeedback({
                    email,
                    paymentId,
                    status,
                    merchantOrderId,
                    compra,
                });

                await new Promise((resolve) => setTimeout(resolve, 2000));
                setPaymentInfo(data);
                console.log(paymentInfo); 
                localStorage.setItem("cart", "[]");
            } catch (error) {
                console.error(
                    "Error al obtener el recibo de Mercado Pago:",
                    error
                );
            }
        })();
        return () => {
            localStorage.setItem("cart", "[]");
            const email = localStorage.getItem("email");
            dispatch(get_User_By_Email(email));
        };
    }, []);
    
    useEffect(() => {
        if (location.state && location.state.error) setError(location.state.error);
    }, [location.state]);

    //component:
    return (
        <>
            {status === "approved" ? (
                <div className={styles.container}>
                    <div className={styles.container2}>
                        <div className={styles.imgcontainer}>
                            <img
                                className={styles.img}
                                src="https://seeklogo.com/images/M/mercado-pago-logo-52B7182205-seeklogo.com.png"
                                alt="mercadopago"
                            />
                        </div>
                    </div>
                    {paymentInfo && (
                        <div className={styles.detalles}>
                            <div className={styles.detalles2}>
                                <h1 className={styles.h1}>
                                    Se obtuvo el recibo de Mercado Pago
                                </h1>
                                <h3 className={styles.idtransaccion}>
                                    ID de la transacción: {paymentInfo.Payment}
                                </h3>
                                <NavLink
                                    className={styles.tohome}
                                    to="/HomePage"
                                >
                                    Ir a Home
                                </NavLink>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.container2}>
                        <div className={styles.imgcontainer}>
                            <img
                                className={styles.img}
                                src="https://seeklogo.com/images/M/mercado-pago-logo-52B7182205-seeklogo.com.png"
                                alt="mercadopago"
                            />
                            <p className={styles.x}>Error</p>
                        </div>
                    </div>
                    <div className={styles.detalles}>
                        <div className={styles.detalles2}>
                            <h1 className={styles.h1}>Pago Fallido!</h1>
                            <h3 className={styles.idtransaccion}>{error}</h3>
                            <NavLink className={styles.tohome} to="/HomePage">
                                Ir a Home
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Success;
