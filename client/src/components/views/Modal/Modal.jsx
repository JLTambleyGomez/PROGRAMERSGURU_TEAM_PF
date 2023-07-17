import { useState } from "react";

import styles from "./Modal.module.css";


//_________________________module_________________________
function Modal () {

    //states:
    const [modal, setModal] = useState(true);


    //functions:
    const handlebuttonModal = () => {
        setModal(!modal);
    };


    //component:
    return (
        <div>
            {
                modal && (
                    <div className={styles.container}>
                        <h1 className={styles.item}>Hola!</h1>
                        <button onClick={handlebuttonModal}>CERRAR</button>
                    </div>
                )
            }
        </div>
    );
};

export default Modal;
