import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styles from "./PagoSubscripcion.module.css";
import PagoMercadopago from "../../datos/PagoMercadoPago/PagoMercadoPago";
import PagoMetamask from "../../datos/PagoMetamask/PagoMetamask";
import { get_suscriptions } from "../../../Redux/actions";

//_________________________module_________________________
function PagoSubscripcion() {
  //redux
  const dispatch = useDispatch();
  const subscripciones = useSelector((state) => state.subscriptions);
  const token = localStorage.getItem("accessToken");

  //states:
  const [subscripcion, setSubscripcion] = useState(null);
  const [total, setTotal] = useState(0);
  const [MostrarPagos, setMostrarPagos] = useState(false);
  const [compra, setCompra] = useState({});

  const navigate = useNavigate();

  // Fetch subscriptions on component mount
  useEffect(() => {
    if (!token) navigate("/IniciaSession");
    if (!subscripciones || subscripciones.length === 0) {
      dispatch(get_suscriptions());
    }
  }, [dispatch, subscripciones, token, navigate]);

  //functions:
  const handleAddSubscripcion = (selectedSubscripcion) => {
    setMostrarPagos(false);
    setSubscripcion(selectedSubscripcion);
    setTotal(selectedSubscripcion.price);
  };

  const handlePagarButton = () => {
    if (subscripcion) {
      const referencia = {
        description: subscripcion.title,
        price: subscripcion.price,
        quantity: 1,
      };

      localStorage.setItem("cart", JSON.stringify([referencia]));
      setCompra(referencia);
      setMostrarPagos(true);
    }
  };

  //component:
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Subscríbete ya! y disfruta sin limitaciones</h1>
  
      {/* TIPOS DE SUSCRIPCION */}
      {subscripciones.map((subscripcion) => (
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
      ))}
  
      <div className={styles.total}>
        {/* RESUMEN */}
        <h1>TU ELECCIÓN:</h1>
        {subscripcion && (
          <div className={styles.totalcontainer}>
            <li className={styles.item}>{subscripcion.title}</li>
            <h1>Valor Total: $ {total}</h1>
          </div>
        )}
        {/* MEDIOS DE PAGO */}
        {subscripcion && (
          <p className={styles.boton} onClick={handlePagarButton}>
            <p className={styles.name}>ir a Pagar</p>
          </p>
        )}
        {MostrarPagos && (
          <div>
            <p>Escoge tu medio de Pago</p>
            {compra.description && <PagoMercadopago reference={compra} />}
            <PagoMetamask total={subscripcion.price} />
          </div>
        )}
      </div>
    </main>
  );}

export default PagoSubscripcion;
