import React from 'react';
import styles from "./HomePage.module.css";
import Cards from '../../datos/Cards/Cards';

const HomePage = () => {

  const cursos = [{
      Title: "hola",
      Description: "un curso",
      Rating: 1,
      Free: true,
      Language: "java"
    }, {
      Title: "curso2",
      Description: "curso2Description",
      Rating: 10,
      Free: false,
      Language: "javascript"
    }
  ];

  return (
    <div>
      <h1 className={styles.h1}>Homepageok</h1>
      <Cards cursos={cursos} />
    </div>
  );
}

export default HomePage;
