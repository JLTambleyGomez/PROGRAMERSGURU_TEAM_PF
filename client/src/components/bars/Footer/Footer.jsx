import styles from './Footer.module.css';
import React from 'react';

//_________________________module_________________________
const Footer = () => {
    return(
        <div className={styles.informacion}>
            <p>Politica de la Web</p>
            <p>Sobre nosotros</p>
            <p>Contacto</p>
            <p>Trabaja con nosotros</p>
            <p>Donación</p>
        </div>
    )
}

export default Footer;