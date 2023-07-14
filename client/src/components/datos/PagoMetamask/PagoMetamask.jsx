import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import  ModalMetamask  from '../../views/MetamaskAlert/MetamaskAlert';
import styles from './PagoMetamask.module.css';

const PagoMetamask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);

  const connectionWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_requestAccounts' })
        .then((result) => {
          accountChanged([result[0]]);
        })
        .catch((error) => {
          console.error(error);
          setErrorMessage('Error al conectar la billetera');
        });
    } else {
      setErrorMessage('Primero debes instalar la billetera Metamask');
    }
  };

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
  };

  return (
    <div className={styles.container}>
      <img
        onClick={connectionWallet}
        className={styles.img}
        src="https://forum.bubble.io/uploads/default/optimized/3X/9/4/9484da71ef3ee1881ae37a3cc8c75d529e4159ac_2_150x150.png"
        alt="newsBanner"
      />
      <div className={styles.txt}>
        {defaultAccount ? (
          <p className={styles.conectada}>Conectada  
          </p>
        ) : (
          <p>Desconectada</p>
        )}
     
      </div>   <p className={styles.walletid}>{defaultAccount}</p>  
      <div>{errorMessage && <ModalMetamask />}</div>
    </div>
  );
};

export default PagoMetamask;
