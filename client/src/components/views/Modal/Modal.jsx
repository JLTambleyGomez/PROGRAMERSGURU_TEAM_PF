import React from "react";
import styles from "./Modal.module.css";

import { useState } from "react";

//_________________________module_________________________
const Modal = () => {
  const [modal, setModal] = useState(true);

  const handlebuttonModal = () => {
    setModal(!modal);
  };

  return (
    <div>
      {modal && (
        <div className={styles.container}>
          <h1 className={styles.item}>Hola!</h1>

          <button onClick={handlebuttonModal}>CERRAR</button>
        </div>
      )}
    </div>
  );
};

export default Modal;
