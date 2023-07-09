import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import styles from "./LandingPage.module.css";
import LoginForm from "../../datos/LoginForm/LoginForm";


//_________________________module_________________________
function LandingPage () {

    //const:
    const [backgroundImage, setBackgroundImage] = useState(0);
    const images = [
        "https://www.startechup.com/wp-content/uploads/network-6511448_1280.jpg.webp",
        "https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.pexels.com/photos/2473183/pexels-photo-2473183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.unsplash.com/photo-1615889898166-b9ac0bdfbb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1589&q=80",
        
    ];

    //useEffect:
    useEffect(() => {
        const interval = setInterval(() => {
            setBackgroundImage(prevIndex => (prevIndex + 1) % images.length);
        }, 6000);

        return () => clearInterval(interval);
    }, [images.length]);

    //component:
    return (
        <div className={styles.container} style={{backgroundImage:`url(${images[backgroundImage]})`}}>
            <div className={styles.container1}>
                <p className={styles.pF}>Acceso Gratuito</p>
                <NavLink className={styles.button} to="/HomePage">Ingresar</NavLink>
            </div>
            <h1 className={styles.h1}>BIENVENIDOS A  <p className={styles.logo}> <img className={styles.imgcat} src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg" alt = "banner"/>
                 PROGRAMMER'S GURÚ</p>
</h1>

           
                <div className={styles.container2}>
                <p className={styles.pS}>Acceso Para Suscriptores</p>

                <LoginForm/>
            </div>
        </div>
    )
}

export default LandingPage ;