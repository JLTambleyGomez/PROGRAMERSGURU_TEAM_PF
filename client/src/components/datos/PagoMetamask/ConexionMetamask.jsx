import React, { useState } from 'react';
import styles from './ConexionMetamask.module.css';
import { useDispatch,useSelector } from 'react-redux';
import {set_metamask_address} from "../../../Redux/actions"

import axios from 'axios';

const ConexionMetamask = () => {
 const dispatch = useDispatch()
  const [errorMessage, setErrorMessage] = useState(null);
  const [metamaskinstall, setMetamaskinstall] = useState(false);
  const defaultAccount = useSelector((state)=>state.metamaskaddress)

  const connectionWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        accountChanged(accounts[0]);
      } catch (error) {
        console.error(error);
        setErrorMessage('Error al conectar la billetera');
      }
    } else {
      setMetamaskinstall(true);
    }
  };

  const accountChanged = (accountName) => {
    dispatch(set_metamask_address(accountName));

  
  };

  return (
    <div className={styles.container}>
      <img
        onClick={connectionWallet}
        className={styles.img}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png"
        alt="newsBanner"
      />
      <div className={styles.txt}>
        {defaultAccount ? (
          <p className={styles.conectada}>Conectada</p>
        ) : (
          <p>Desconectada</p>
        )}
        {errorMessage && <p>{errorMessage}</p>}
        
      </div>
      <p className={styles.walletid}>{defaultAccount}</p>
    </div>
  );
};

export default ConexionMetamask;
