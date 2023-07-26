import axios from "axios";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styles from "./PagoMercadoPago.module.css"

const PagoMercadopago = ({ reference, }) => {
    console.log(reference);
    initMercadoPago('TEST-85c02450-7173-4d7c-8ff0-0b7663fd6b8b');

    const [preferenceId, setPreferenceId] = useState(null);
    const [loading, setLoading] = useState(true); // Nuevo estado para el mensaje de carga
    const dispatch = useDispatch();

    const createMercadopagoReference = async () => {
        try {
            console.log(reference);
            const { data } = await axios.post("/Pagos/create_preference", reference);
            const id = data?.id;
            return id;
        } catch (error) {
            // Si hay un error, terminamos la carga
            setLoading(false);
        }
    };

    const handleBuy = async () => {
        const id = await createMercadopagoReference();
        if (id) {
            setPreferenceId(id);
        }
    };

    useEffect(() => {
        handleBuy();
    }, []);

    useEffect(() => {
        // Verificar si se obtuvo el ID de referencia para ocultar el mensaje de carga
        if (preferenceId) {
            setLoading(false);
        }
    }, [preferenceId]);

    return (
        <div>
            {loading ? (
                // Mostrar mensaje de carga mientras se espera la respuesta
                <p className={styles.carga}>Cargando método de pago...</p>
            ) : preferenceId ? (
                <div className={styles.component}>
                <Wallet initialization={{ preferenceId }} />
                </div>
            ) : null}
        </div>
    );
};

export default PagoMercadopago;
