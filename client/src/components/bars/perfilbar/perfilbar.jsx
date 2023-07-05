import React from "react";
import {useState} from "react";
import { NavLink } from "react-router-dom";

import "./perfilbar.css"

//_______________________.module___________________________
const PerfilBar = () => {

    const [modal, setModal] = useState(false)
    const [image,setimage] = useState("")

    const userimage = "https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664"


    const handlebuttonModal = () => {
      if (modal === true){
        setModal(false)
      } else{
        setModal(true)
      }
    }


  return  (
    <div className = "accountOptionsWrapper">
      {/* <button className = {styles.perfilbutton} onClick = {handlebuttonModal}>
        <img src = {Userimage} alt = "user image" className = {styles.image}/>
      </button> */}
      <div className = "accountOptionsImage">
        <img src = {userimage} alt = "user image" className = 'image'/>
      </div>

        {/* ALTERNATIVA PARA DESPLEGAR LA BARRA DE OPCIONES DE LA CUENTA */}

        <ul className = "accountOptionsList">
          <li>Account</li>
          <li>Courses</li>
          <li>Switch light/dark mode</li>
          <li>Sign out</li>
        </ul>

      {/* {
        modal && (
          <div className = {styles.container}>
          <div className={styles.bar1}>
            <button className={styles.myButton}>
              blabla
            </button>
            <button className={styles.myButton}>
              blabla
            </button>
            <button className={styles.myButton}>
              blabla
            </button>
            <button className={styles.myButton}>
              blabla
            </button> 
            <button className={styles.myButton}>
              blabla
            </button>
            <button onClick={handlebuttonModal}>
              CERRAR
            </button>
          </div>
  
          </div>
        )
      }*/}
    </div>
  )
};

export default PerfilBar;