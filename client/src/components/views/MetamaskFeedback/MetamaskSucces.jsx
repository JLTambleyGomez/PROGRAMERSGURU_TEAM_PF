import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MetamaskFeedback.module.css';
import { NavLink } from 'react-router-dom';

const MetaMaskSucces = () => {
  const location = useLocation();
  const [transaction, setTransaction] = useState('');

  useEffect(() => {
    if (location.state) {
      setTransaction(location.state.transaction);
    }
  }, [location.state]);

  return (
    <div className={styles.container}>
      <div className={styles.container2}>
        <div className={styles.imgcontainer}>
          <img
            className={styles.img}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png"
            alt="newsBanner"
          />
        </div>
      </div>
      <div className={styles.detalles}>
        <div className={styles.detalles2}>
          <h1 className={styles.h1}>Pago Exitoso!</h1>
          <h3 className={styles.idtransaccion}>ID de la transacción: {transaction}</h3>
          <NavLink className={styles.tohome} to="/HomePage">Ir a Home</NavLink>
        </div>
      </div>
    </div>
  );
};

export default MetaMaskSucces;
