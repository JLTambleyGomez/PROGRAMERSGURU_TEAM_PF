import React from "react";
import styles from "./perfilbar.module.css"
import{useState} from "react"

const PerfilBar = () => {
    const [modal, setModal]= useState(false)
    const [image,setimage]=useState("")
    


    
    const Userimage="https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664"


    const handlebuttonModal =()=>{
      if(modal === true){
        setModal(false)
      }else{
      setModal(true)
      }
    }
  return  (
    <div>
        <button className={styles.perfilbutton}   onClick={handlebuttonModal}>
        <img src={Userimage} alt="sample45" className={styles.image}/>

        </button>
    {modal&& <div className = {styles.container}>
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
        <button onClick={handlebuttonModal}>CERRAR</button>
         </div>
  
  </div>}
    
  </div>
)
};

export default PerfilBar;