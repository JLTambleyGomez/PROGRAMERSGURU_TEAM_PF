import React from "react";
import styles from "./Modal.module.css"
import{useState} from "react"

const Modal = () => {
    const [modal, setModal]= useState(false)


    const handlebuttonModal =()=>{
      if(modal === true){
        setModal(false)
      }else{
      setModal(true)
      }
    }
  return  (
    <div>
        <button onClick={handlebuttonModal}>ABRIR FORM</button>
    {modal&& <div className = {styles.container}>
  <h1 className = {styles.item}>Hello Modal</h1>
  <button onClick={handlebuttonModal}>CERRAR</button>
  </div>}
    
  </div>
)
};

export default Modal;