import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_categories, get_courses_all, clearCourses, clearMessage, get_Favorites_Request } from "../../../Redux/actions";

import styles from "./HomePage.module.css";
import Cards from '../../datos/Cards/Cards';
import Comments from '../../datos/Comments/Comments';


//_________________________module_________________________
function HomePage() {

    //global state:
    const dark = useSelector((state) => state.darkMode);
    const courses = useSelector((state) => state.allCourses);

    //const:
    const dispatch = useDispatch();
    const latestCourses = Array.isArray(courses) ? courses.slice(-4) : [];

    //functions:
    const theme = (base, dark) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    //life-cycles:
    useEffect(() => {
        dispatch(get_categories());
        dispatch(get_courses_all());
        dispatch(get_Favorites_Request(1));

        return () => {
            dispatch(clearMessage());
        };
    }, [dispatch]);

    //component:
    return (
        <div className={`${styles.component} ${theme(styles.component, dark)}`}>
            <div>
                <p className={`${styles.logo}`}>
                <img className={styles.imgcat} src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg" alt="banner" />
                PROGRAMMER'S GURÚ
                </p>
            </div>
            <h1 className={`${styles.h1}`}>Últimos Cursos del Mercado</h1>
            <div>
                {latestCourses.length > 0 ? (
                <Cards courses={latestCourses} />
                ) : (
                <p>No hay cursos disponibles.</p>
                )}
            </div>
            <div className='categoriasMasBuscadas' />
            <div className='comentariosPorCurso'>
                {/* <Comments/> */}
            </div>
            <div className="preguntasMasFrequentes" />

            <div className={styles.news}>
                <h1 className={`${styles.span}`}>News</h1>
                <h2 className={`${styles.h2}`}>
                Programación web desde casa: el nuevo curso gratis online basado en inteligencia artificial
                <img className={styles.newsimg} src="https://www.cronista.com/files/image/525/525496/6446a76145585.jpg" alt="banner" />
                </h2>
                <p className={`${styles.p}`}>Actualizado el 10 de Mayo de 2023</p>
                <h2 className={`${styles.ul}`}>
                En un mundo en constante evolución tecnológica,
                es fundamental formar a las nuevas generaciones para que sean parte de la transformación digital.
                Comprometidos con esta realidad, desde la empresa Egg, edtech de base científica que busca resolver
                la escasez de talento digital a escala a través de tecnología y cooperación, relanzan su iniciativa
                de formación accesible y de alta calidad.
                Con este enfoque invitan a todas las personas de 15 años en adelante (sin límite de edad) a cursar
                de forma gratuita su nuevo curso de Programación web desde cero. El mismo tiene una duración de
                3 semanas y busca que los asistentes desarrollen las bases para comenzar su camino hacia la industria
                tech. Los interesados en sumarse a esta propuesta, que incluye certificado.
                </h2>
                <a className={`${styles.a}`} href="https://eggcooperation.com/es-ar/programacion-desde-cero/?utm_source=freepress&utm_medium=argentina&utm_id=mayo&utm_term=nuevoPDC" target="_blank" rel="noopener noreferrer">
                Link Para Visitar
                </a>
            </div>
        </div>
    );
}

export default HomePage;
