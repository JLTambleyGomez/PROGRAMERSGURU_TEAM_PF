import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import s from './Footer.module.css';

//_________________________module_________________________
function Footer () {


    //STATES:
    const [isVisible, setIsVisible] = useState(false);
    const [token, setToken] = useState(false);


    //LIFE-CYCLES:
    useEffect(() => {
        setIsVisible(true);
        const token = localStorage.getItem("accessToken");
        token && setToken(true);
        return () => setIsVisible(false);
    }, [])
    


    //COMPONENT:
    return (
        <div className={`${s.component} ${isVisible ? s["component-blurIn"] : ""}`}>
            <div className={s.navContainer}>
                <div className={s.nav}>
                    <h3>Links útiles</h3>
                    <NavLink to="/">
                        <p>Regresa al incio</p>
                    </NavLink>
                    <NavLink to="/CoursePage">
                        <p>Explora todos los cursos</p>
                    </NavLink>
                    <NavLink to="/PagoSubscripcion">
                        <p>Todos nuestros planes</p>
                    </NavLink>
                    <NavLink to="/store">
                        Tienda
                    </NavLink>
                    {
                        token ? (
                            <NavLink to="/profile">
                                <p>Tu perfil</p>
                            </NavLink>
                        ) : (
                            <NavLink to="/IniciaSession">
                                <p>Unirse</p>
                            </NavLink>
                        )
                    }
                </div>
                <div className={s.nav}>
                    <h3>Ayuda</h3>
                    <NavLink to="/faq">
                        <p>Preguntas frecuentes</p>
                    </NavLink>
                    <NavLink to="/">
                        <p>Contacto</p>
                    </NavLink>
                    <NavLink to="/">
                        <p>Politica de la Web</p>
                    </NavLink>
                </div>
                <div className={s.nav}>
                    <h3>Nuestro equipo</h3>
                    <NavLink to="/">
                        <p>Donación</p>
                    </NavLink>
                    <NavLink to="/about">
                        <p>Sobre nosotros</p>
                    </NavLink>
                </div>
            </div>
            <div className={s.title}>
                Programmers Guru
            </div>
        </div>
    )
}

export default Footer;