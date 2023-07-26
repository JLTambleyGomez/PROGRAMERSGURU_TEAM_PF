import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
// import styles from "./Payments.module.css";
import { getAllPayments } from "../../../axiosRequests/axiosRequests";

const Payment = () => {
    //estado local
    const [payment, setPayment] = useState([])
    console.log(payment);

    //hooks
    const dispatch = useDispatch();

    const getpayment = async () => {
        const payments = await getAllPayments()
        setPayment(payments)
    }
    useEffect(() => {
        getpayment()
        
    }, []);

    return (
        <>
            <h1>Pagos realizados: {payment.length}</h1>

            {!!payment.length &&
                payment.map((pay) =>
                    pay.User?.name ? (
                        <div key={pay.id}>
                            <p>Nombre: {pay?.User?.name}</p>
                            <p>Email: {pay?.User?.email}</p>
                            <p>Fecha: {pay?.date}</p>
                            <p>
                                Estado del pago:{" "}
                                {pay?.status === "fullfiled" ||
                                pay?.status === "approved"
                                    ? "Completado"
                                    : "Rechazado"}
                            </p>
                            <p>Total: {pay?.totalPrice}</p>
                        </div>
                    ) : null
                )}
        </>
    );
};

export default Payment;
