import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ventana.module.css";
// import SignFreeForm from "../../datos/LoginForm/SignFreeForm";
// import LoginForm from "../../datos/LoginForm/LoginForm";
import SubscriptionForm from "../../datos/SubscriptionForm/SubscriptionForm";
import SignFreeForm2 from "../../datos/LoginForm/SignFreeForm2";

//_________________________module_________________________
const Modal = () => {
    //states:
    const [modal, setModal] = useState(true);

    //const:
    const navigate = useNavigate();

    //functions:
    const handlebuttonModal = () => {
        setModal(!modal);
        navigate("/HomePage");
    };

    //component:
    return (
        <div>
            {modal && (
                <div className={styles.container}>
                    <h1 className={styles.item}>Hola!</h1>
                    <h2>Debes iniciar sesión para poder continuar</h2>
                    <div className={styles.subscriptionButtons}></div>
                    <SignFreeForm2 />

                    <button className={styles.boton} onClick={handlebuttonModal}>CERRAR</button>
                </div>
            )}
        </div>
    );
};

export default Modal;
