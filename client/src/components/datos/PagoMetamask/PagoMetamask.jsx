import React, { useEffect, useState } from 'react';
import {ethers} from "ethers"
import styles from "./PagoMetamask.module.css"





const PagoMetamask =()=>{
    const [errorMessage,setErrorMessage]= useState(null)
    const [defaulAccount, setDefaultAccount]= useState(null)

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
    }

 



    return(
        <div className={styles.container}  >
            <img onClick={connectionwallet}
            className={styles.img}
            src="https://forum.bubble.io/uploads/default/optimized/3X/9/4/9484da71ef3ee1881ae37a3cc8c75d529e4159ac_2_150x150.png"
            alt="newsBanner"
            
          /> 
          <div className={styles.txt}>
          {defaulAccount?  <p className={styles.conectada}>Conectada</p>:<p >Desconectada  </p>}
        </div>
            <h1>{errorMessage}</h1>
        </div>
    )
    }
export default PagoMetamask;
