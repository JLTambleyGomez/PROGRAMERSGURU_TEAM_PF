import React from "react";
import styles from "./MetamaskAlert.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


//_________________________module_________________________
function ModalMetamask () {

    //states:
    const [modal, setModal] = useState(true);

    //const:
    const navigate = useNavigate()

    //functions:
    const handlebuttonModal = () => {
        setModal(!modal);
        navigate('/HomePage')
    };

    //component:
    return (
        <div>
            {
                modal && (
                    <div className={styles.container}>
                        <h1 className={styles.item}></h1>
                        <h2>Descarga Metamask para pagar con Criptomonedas!</h2>
                        <div className={styles.subscriptionButtons}>
                            <a
                                href="https://metamask.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                            </a>
                        </div>
                        <button onClick={handlebuttonModal}>Cerrar</button>
                    </div>
                )
            }
        </div>
    );
};

export default ModalMetamask;
