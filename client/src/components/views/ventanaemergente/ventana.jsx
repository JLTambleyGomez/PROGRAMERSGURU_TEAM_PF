import React from "react";
import styles from "./ventana.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginForm from "../../datos/LoginForm/LoginForm";
import SubscriptionForm from "../../datos/SubscriptionForm/SubscriptionForm";
//_________________________module_________________________
const Modal = () => {
  const [modal, setModal] = useState(true);

  const navigate = useNavigate()

  const handlebuttonModal = () => {
    setModal(!modal);
    navigate('/HomePage')
  };

  return (
    <div>
  
      {modal && (
        <div className={styles.container}>
          <h1 className={styles.item}>Hola!</h1>
          <h2>Debes iniciar sesión para poder continuar</h2>
          <div className={styles.subscriptionButtons}>
            <LoginForm />
            <SubscriptionForm />
          </div>

          <button onClick={handlebuttonModal}>CERRAR</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
