import React, { useState } from 'react';
import styles from './PagoMetamask.module.css';
import {getEthvalue} from "../../../axiosRequests/axiosRequests"

const PagoMetamask = ({total}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [metamaskinstall, setMetamaskinstall] = useState(false);
  const UsdtValue = total; 
  console.log(total)

  const getEthValue = async (UsdtValue) => {

    const ethUSDTPrice = await getEthvalue();

    const usdtToEther = UsdtValue / ethUSDTPrice; 

    return usdtToEther;
  };

  // Costó mucho jaja XD
  const ethToWei = (ethValue) => {
    const weiValue = '0x' + (ethValue * Math.pow(10, 18)).toString(16);
    return weiValue;
  };

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
    setDefaultAccount(accountName);
  };


  const handlePayment = async () => {
    if (!defaultAccount) {
      setErrorMessage('Debes conectar tu billetera MetaMask antes de hacer un pago');
      return;
    }
  
    try {
      const ethValue = await getEthValue(UsdtValue);
      const extraPercentage = 0.01; // 1% adicional para protegernos de la fluctuación ... supongo que eso ayuda
      const adjustedEthValue = ethValue * (1 + extraPercentage); // Valor en ETH ajustado
  
      // Conversión de ETH a WEI
  
      const weiValue = ethToWei(adjustedEthValue);

      console.log('Valor en Eth:', adjustedEthValue);
      console.log('Valor en Wei:', weiValue);
  
      const transaction = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [
          {
            from: defaultAccount,
            to: '0x419168Bbf61FFa0Fd5d28409Ec214f42aB9dFD45',    
            value: weiValue, 
          },
        ],
      });

      console.log(transaction);
  
      setSuccessMessage('Pago exitoso');
    } catch (error) {
      console.error(error);
      setErrorMessage('Error al procesar el pago');
    }
  };

  return (
    <div className={styles.container}>
      <img
        onClick={connectionWallet}
        className={styles.img}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png"
        alt="newsBanner"
      />
      
      <div>
       
      </div>
      <div className={styles.paymentSection}>
        <p
          onClick={handlePayment}
          className={styles.paymentButton}
          disabled={!defaultAccount}
        >
          Pay with Metamask
        </p>
      </div>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default PagoMetamask;
