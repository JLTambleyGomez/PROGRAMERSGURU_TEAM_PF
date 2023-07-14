import React, { useEffect, useState } from 'react';
import {ethers} from "ethers"
import styles from "./PagoMetamask.module.css"





const PagoMetamask =()=>{
    const [errorMessage,setErrorMessage]= useState(null)
    const [defaulAccount, setDefaultAccount]= useState(null)
    const [userBalance, setUserBalance] = useState(null);

const connectionwallet=()=> {
    if (window.ethereum){
        window.ethereum.request({method:"eth_requestAccounts"})
        .then( result=>{
            accountChanged([result[0]])})}
            else{
                setErrorMessage("Primero debes instalar Metamask wallet")
            }
        }
    const accountChanged=(accountName)=>{
        setDefaultAccount(accountName);
        getUserBalance(accountName)
    }

    const getUserBalance=(accountAddress)=>{
     window.ethereum.request({method:"eth_getBalance",params:[String(accountAddress),"lasted"]})
     .then(balance=>{
        setUserBalance(ethers.utils.formatEther(balance));
     })
    }



    return(
        <div className={styles.container}>
            <button onClick={connectionwallet}>CONECTA TU METAMASK </button>
            <h2>{userBalance}</h2> <p>{defaulAccount}</p>
            <p>{errorMessage}</p>
            <h1>conexión a metamask</h1>
        </div>
    )
    }
export default PagoMetamask;
