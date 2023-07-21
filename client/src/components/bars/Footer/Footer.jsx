import { useState, useEffect } from 'react';
import s from './Footer.module.css';

//_________________________module_________________________
function Footer () {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      // Add a slight delay to the footer animation for a smoother effect
      const delay = 500; // 500ms delay
      setTimeout(() => {
        setIsVisible(true);
      }, delay);
    }, []);

    return (
        <div className={`${s.footerContainer} ${isVisible ? s.visible : ''}`}>
            <p>Politica de la Web</p>
            <p>Sobre nosotros</p>
            <p>Contacto</p>
            <p>Trabaja con nosotros</p>
            <p>Donación</p>
        </div>
    )
}

export default Footer;