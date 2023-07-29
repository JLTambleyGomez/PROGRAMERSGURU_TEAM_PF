import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './LandingPage2.module.css';
import SignFreeForm from '../../datos/LoginForm/SignFreeForm';
import {clearUser} from "../../../Redux/actions";
import { useDispatch } from 'react-redux';


//_________________________module_________________________
const LandingPage2 = () => {
    
    
    //localstados
    const [showButton, setShowButton] = useState(false);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [showForm, setShowForm] = useState(false);
    
    //CONST:
    const dispatch = useDispatch();
    const titleRef = useRef(null);
    const indexRef = useRef(0); // Utiliza un useRef para mantener el valor del índice


    //LIFE-CYCLES:
    useEffect(() => {

        dispatch(clearUser())
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


    //COMPONENT:
    return (
        <main onClick={handlecancelanimation} className={styles.fondo}>
            <div className={styles.layer}/>

            <div className={styles.content}>
                <div className={styles.titleBanner}>
                    <h1 ref={titleRef} className={styles.title}></h1>

                    <section className={`${styles.sectionBanner}`}>
                        <img
                            className={`${styles.bannerImg}`}
                            src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg"
                            alt="mainBanner"
                        />
                        <h2 className={`${styles.mainTitle} `}>PROGRAMMER'S GURU</h2>
                    </section>
                </div>

                {
                    showButton && (
                        <div className={styles.container}>
                            {
                                !buttonClicked && (
                                    // <div>
                                        <button onClick={handleShowForm} className={styles.boton1}>
                                            <p>Comenzar</p>
                                        </button>
                                    // </div>
                                )
                            }
                            {
                                showForm && (
                                    <>
                                        <div className={styles.boton2Container}>
                                            <SignFreeForm />
                                        </div>
                                        <NavLink className={styles.boton1} to="/HomePage">
                                            <p className={styles.name}>Entrar sin Registrarme</p> 
                                        </NavLink>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </main>
    );
};

export default LandingPage2;
