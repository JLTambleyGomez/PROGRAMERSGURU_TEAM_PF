import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage2.module.css';
import SignFreeForm from '../../datos/LoginForm/SignFreeForm';

const LandingPage = () => {
  const titleRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
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

    let index = 0;
    const interval = setInterval(() => {
      titleRef.current.textContent = words[index];
      index++;
      if (index === words.length) {
        setShowButton(true);
        index = words.length - 1;
      }
    }, 600);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className={styles.pagecontainer}>
    <div className={styles.fondo}>
      <h1 ref={titleRef} className={styles.title}></h1>

      {showButton && (
        <div className={styles.container}>
          <button onClick={handleShowForm} className={styles.boton}>
            Comenzar
          </button>
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
    </div></div>
  );
};

export default LandingPage;
