import styles from "./LandingPage.module.css";
import { NavLink } from "react-router-dom";
import React, { useState, useEffect } from "react";
import LoginForm from "../../datos/LoginForm/LoginForm";
import SignFreeForm from "../../datos/LoginForm/SignFreeForm";
import { images } from "./images";

//_________________________module_________________________
function LandingPage() {
  //states:
  const [backgroundImage, setBackgroundImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className={styles.container}
      style={{ backgroundImage: `url(${images[backgroundImage]})` }}
    >
      <div className={styles.container1}>
        <p className={styles.p}>Acceso Gratuito</p>

        <NavLink className={styles.button} to="/HomePage">
          Ingresar
        </NavLink>
      </div>
      <h1 className={styles.h1}>BIENVENIDOS A PROGRAMERSGURU</h1>
      <div className={styles.container2}>
        <p className={styles.p}>Acceso para Suscriptores</p>

        <LoginForm />
      </div>
    </div>
  );
}

export default LandingPage;
