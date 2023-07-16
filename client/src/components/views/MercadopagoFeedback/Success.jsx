import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Success.module.css";
import {get_User_By_Email} from "../../../Redux/actions";

//_________________________module_________________________
function Success() {
  const location = useLocation();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const email = sessionStorage.getItem("email")
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(get_User_By_Email(email))
  }, [])

  useEffect(() => {
    async function getPayment() {
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

  return (
    <div className={styles.container}>
      <h1>Se obtuvo el recibo de Mercado Pago</h1>
      {paymentInfo && (
        <div>
          
          <p>Payment ID: {paymentInfo.Payment}</p>
          <p>Status: {paymentInfo.Status}</p>
          <p>Merchant Order ID: {paymentInfo.MerchantOrder}</p>
        </div>
      )}
    </div>
  );
}

export default Success;
