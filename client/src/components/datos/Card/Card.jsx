import React from 'react';
import styles from "./Card.module.css";

const Card = ({ title, description, rating, free, language }) => {
  return (
    <div className={styles.cardContainer}>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.description}>{description}</h2>
      <h2 className={styles.rating}>{rating}</h2>
      {free === true ? (
        <h2 className={styles.free}>This course is free</h2>
      ) : (
        <h2 className={styles.payment}>This course requires payment</h2>
      )}
      <h2 className={styles.language}>{language}</h2>
    </div>
  );
};

export default Card;
