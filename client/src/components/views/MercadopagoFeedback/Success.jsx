import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Success.module.css";
import {get_User_By_Email} from "../../../Redux/actions";
import { NavLink } from "react-router-dom";

//_________________________module_________________________
function Success  () {

    //global states:
    const cart = useSelector((state) => state.cart)

    //states:
    const [paymentInfo, setPaymentInfo] = useState(null);

    //functions:
    const calculateTotal = () => {
        let total = 0;
        cart?.forEach((product) => {
            const productTotal = product.price * product.quantity;
            total += productTotal;
        });
        return total;
    };



    

    //const:
    const location = useLocation();
    const dispatch = useDispatch();
    const email = sessionStorage.getItem("email");

    //life-cycles:
    useEffect(() => {
        dispatch(get_User_By_Email(email));
        console.log("este es el carrito:" + " " + cart);
        console.log("este es el email:" + " " + email)
    }, [])

    useEffect(() => {

        async function getPayment () {
            try {
                const searchParams = new URLSearchParams(location.search);
                const paymentId = searchParams.get("payment_id");
                const status = searchParams.get("status");
                const merchantOrderId = searchParams.get("merchant_order_id");
                const { data } = await axios.get(
                    `http://localhost:3001/Mp/feedbackmp?payment_id=${paymentId}&status=${status}&merchant_order_id=${merchantOrderId}`
                );
                console.log(data)
                setPaymentInfo(data);
            } catch (error) {
                console.error("Error al obtener el recibo de Mercado Pago:", error);
            }
        }

        getPayment();
    }, []);

    //component:


    return (
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
                    <h1 className={styles.h1}>Se obtuvo el recibo de Mercado Pago</h1>
                    <h3 className={styles.idtransaccion}>ID de la transacción: {paymentInfo.Payment}</h3>
                    <NavLink className={styles.tohome} to="/HomePage">Ir a Home</NavLink>
                </div>
            </div>
            )}
        </div>
    );
};

export default Success;
