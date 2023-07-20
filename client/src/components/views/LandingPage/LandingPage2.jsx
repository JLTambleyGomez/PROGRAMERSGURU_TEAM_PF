import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage2.module.css';
import SignFreeForm from '../../datos/LoginForm/SignFreeForm';

const LandingPage2 = () => {
  const titleRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const indexRef = useRef(0); // Utiliza un useRef para mantener el valor del índice

  useEffect(() => {

    localStorage.setItem("sendedEmail", "0");

    const words = [
      'Bienvenido a',
      "PROGRAMMER'S GURU",
      'adéntrate',
      'al mundo',
      'de la programación',
      'los últimos',
      'cursos noticias',
      'y mucho más',
      'Clickea comenzar!',
    ];

    const interval = setInterval(() => {
      titleRef.current.textContent = words[indexRef.current];
      indexRef.current++;

      if (indexRef.current === words.length) {
        setShowButton(true);
        indexRef.current = words.length - 1;
      }
    }, 600);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
    setButtonClicked(true);
  };

  const handlecancelanimation = () => {
    setShowButton(true);

  };

 

  return (
    <div  className={styles.pagecontainer}>
      <div   onClick={handlecancelanimation}
 className={styles.fondo}>
        <h1 ref={titleRef} className={styles.title}></h1>
        <section className={`${styles.sectionBanner}`}>
          <img
            className={`${styles.bannerImg}`}
            src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg"
            alt="mainBanner"
          />
          <h2 className={`${styles.mainTitle} `}>PROGRAMMER'S GURU </h2>
        </section>
        {showButton && (
          <div className={styles.container}>
            {!buttonClicked && (
            <div>
            <button onClick={handleShowForm} className={styles.boton1}>
              Comenzar
            </button>
            </div>)}
            {showForm && (
              <>
                <SignFreeForm className={styles.boton} />
                <NavLink className={styles.boton} to="/HomePage">
                  Entrar sin Registrarme
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage2;
