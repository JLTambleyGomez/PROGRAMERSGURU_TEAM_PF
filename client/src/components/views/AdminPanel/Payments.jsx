import React, { useEffect, useState } from "react";
import styles from "./Paginacion/Payments.module.css";
import s from "./Tecnology.module.css";
import { getAllPayments } from "../../../axiosRequests/axiosRequests";
import ObjectListPayments from "./Paginacion/ObjectListPayments";

const Payment = () => {
    //estado local
    const [allPayments, setAllPayments] = useState([])


    const getpayment = async () => {
        const payments = await getAllPayments()
        setAllPayments(payments)
    }
    useEffect(() => {
        getpayment()
        
    }, []);

    return (
        <div className={s.contenedor}>
            <h1 className={`${s.h1}`}>Órdenes de Pagos</h1>
            {/* <h1>Pagos realizados: {allPayments.length}</h1> */}
            <ObjectListPayments objects={allPayments}/>
            
        </div>
    );
};

export default Payment;

{/* <h1>Pagos realizados: {payment.length}</h1>

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
    )} */}