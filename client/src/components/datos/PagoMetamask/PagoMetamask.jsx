  import React, { useState, useEffect} from 'react';
  import styles from './PagoMetamask.module.css';
  import { getEthvalue } from '../../../axiosRequests/axiosRequests';
  import { useNavigate } from 'react-router-dom';
  import { useDispatch,useSelector } from 'react-redux';
  import {set_metamask_address} from "../../../Redux/actions"

  const PagoMetamask = ({ total }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);
    const defaultAccount = useSelector((state)=>state.metamaskaddress)
    const [successMessage, setSuccessMessage] = useState('');
    const [metamaskinstall, setMetamaskinstall] = useState(false);
    const UsdtValue = total;
    console.log(total);

    const getEthValue = async (UsdtValue) => {
      const ethUSDTPrice = await getEthvalue();
      const usdtToEther = UsdtValue / ethUSDTPrice;
      return usdtToEther;
    };

    const ethToWei = (ethValue) => {
      console.log(ethValue);
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
      dispatch(set_metamask_address(accountName));
    };

    const monitorTransaction = async (transactionHash) => {
      const apiUrl = 'https://api.etherscan.io/api';
      const apiKey = 'JHQ657SVFFNZGBNF4PAF4GS6KGYN46BCY8';    // pidan su propia apikey luego 

      try {
        const response = await fetch(`${apiUrl}?module=transaction&action=gettxreceiptstatus&txhash=${transactionHash}&apikey=${apiKey}`);
        const data = await response.json();
        console.log(data)
        if (data.status === '1') {
          // La transacción se ha confirmado en la cadena de bloques
          setSuccessMessage('Pago exitoso');
          navigate('/MetamaskSuccess', {
            state: {
              transaction: transactionHash,
            },
          });
        } else if (data.status === '0') {
          // La transacción aún está pendiente de confirmación
          setTimeout(() => {
            monitorTransaction(transactionHash);
          }, 3000); // Esperar 3 segundos antes de verificar nuevamente
        } else {
          // Ocurrió un error al obtener el estado de la transacción
          setErrorMessage('Error al monitorear la transacción');
        }
      } catch (error) {
        console.error(error);
        setErrorMessage('Error al monitorear la transacción');
      }
    };


  const handlePayment = async () => {
     
    try {
     
      const ethValue = await getEthValue(UsdtValue);
      const extraPercentage = 0.01;
      const adjustedEthValue = ethValue * (1 + extraPercentage);
      const weiValue = ethToWei(adjustedEthValue);
  
      console.log('Valor en Eth:', adjustedEthValue);
      console.log('Valor en Wei:', weiValue);
  
      let transaction;
      try {
        transaction = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: defaultAccount,
              to: '0x419168Bbf61FFa0Fd5d28409Ec214f42aB9dFD45',
              value: weiValue,
            },
          ],
        });
      } catch (error) {
        if (error.code === 4001 && error.message === 'MetaMask Tx Signature: User denied transaction signature.') {
          throw new Error('Transacción rechazada por el usuario');
        } else {
          throw error;
        }
      }
  
      console.log(transaction);
  
      // Monitorear el estado de la transacción
      monitorTransaction(transaction);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || 'Error al procesar el pago');
      navigate('/MetamaskFailure', {
        state: {
          error: error.message || 'Error al procesar el pago',
        },
      });
    }
  };
  
  
  useEffect(() => {
    connectionWallet()
}, [])

  const isPaymentDisabled = total < 10;

  return (
    <div onClick={connectionWallet} className={styles.container}>
      <img
        className={styles.img}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/512px-MetaMask_Fox.svg.png"
        alt="newsBanner"
      />

      <div></div>
      <div className={styles.paymentSection}>
        {isPaymentDisabled ? (
          <p className={styles.disabledPaymentButton}>Pago mínimo 10 USD con Metamask</p>
        ) : (
          <p onClick={handlePayment} className={styles.paymentButton} disabled={!defaultAccount}>
            Pay with Metamask
          </p>
        )}
      </div>
      {successMessage && <p className={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default PagoMetamask;