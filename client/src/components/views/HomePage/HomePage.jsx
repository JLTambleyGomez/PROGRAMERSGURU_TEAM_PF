import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../config/firebase-config";

import { Dark_Mode } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import {
    get_tecnology,
    get_courses_all,
    clearMessage,
    clearCourses,
    // get_User_By_Email,
} from "../../../Redux/actions";

import s from "./HomePage.module.css";
import CoursesPreview from "../../datos/CoursesPreview/CoursesPreview";
import CategorySection from "../../datos/CategorySection/CategorySection";
import SubscripcionesFlotante from "../../datos/Subscripciones/SubscripcionesFlotante";
import ModalBannedUser from '../ModalBannedUser/ModalBannedUser'
import Footer from "../../bars/Footer/Footer";

//_________________________module_________________________
function HomePage ( { storeRef, isAtBottom, docWidth } ) {

    //global state:
    const dark = useSelector((state) => state.darkMode);
    const allCourses = useSelector((state) => state.allCourses);
    const user = useSelector((state)=>state.user)

    //const:
    const dispatch = useDispatch();
    const latestCourses = Array.isArray(allCourses) ? allCourses.slice(-4) : [];

    //-------------------------------------------------------------------------
    // obtener el email
    // const email = localStorage.getItem("email")
    //-------------------------------------------------------------------------


    //life-cycles:
    useEffect(() => {
        const email = localStorage.getItem("email")
        dispatch(get_tecnology());
        dispatch(get_courses_all());

        dispatch(Dark_Mode())

        //--desmontado
        dispatch(Dark_Mode())
        return () => {
            dispatch(clearMessage());
            dispatch (clearCourses())
        };
    }, [dispatch]);

    useEffect(() => {
        dispatch(Dark_Mode())
    }, [dark])


    if(user.banned) return <ModalBannedUser />
    
    //component:
    return (
        <main className={`${s.component} ${s[theme("component")]}`}>
        {/* BANNER */}
            {/* <section className={`${s.sectionBanner}`}>
                <img
                    className={`${s.bannerImg}`}
                    src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg"
                    alt="mainBanner"
                />
                <h1 className={`${s.mainTitle} ${s[theme("mainTitle")]}`}>
                    PROGRAMMER'S GURU
                </h1>
            </section> */}
            <SubscripcionesFlotante/>
        {/* LAST COURSES */}
            <section className={`${s.sectionCourses}`}>
                <h1 className={`${s.coursesTitle} ${s[theme("coursesTitle")]}`}>
                    ÚLTIMOS CURSOS DEL MERCADO
                </h1>
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}} className={s.coursesPreviewContainer}>
                    {latestCourses.length > 0 ? (
                        <CoursesPreview courses={latestCourses} />
                    ) : (
                        <p className={s.cargando}>Cargando</p>
                    )}
                </div>
            </section>

            {/* <section className={`${s.sectionCategories}`}/>

                    <section className={`${s.sectionComments}`}>
                        <Comments/>
                    </section>

                    <section className={`${s.sectionFAQ}`}/> */}
            <section className={s.sectionCategories}>
                <CategorySection storeRef={storeRef}/>
            </section>
        {/* NEWS */}
        <section className={`${s.sectionNews}`}>
                <h1 className={`${s.newsTitle} ${s[theme("newsTitle")]}`}>NOTICIAS</h1>
                <div className={`${s.newsBanner}`}>
                    <h2 className={`${s[theme("text")]}`}>
                        Programación web desde casa: el nuevo curso gratis online basado en
                        inteligencia artificial
                    </h2>
                    {/* <div className={s.imgContainer}> */}
                        <img
                            className={`${s.newsImg}`}
                            src="https://www.cronista.com/files/image/525/525496/6446a76145585.jpg"
                            alt="newsBanner"
                        />
                    {/* </div> */}
                </div>
                <p className={`${s.newsDate} ${s[theme("text")]}`}>
                    Actualizado al 10 de mayo de 2023
                </p>
                <h2 className={`${s.newsText} ${s[theme("text")]}`}>
                    En un mundo en constante evolución tecnológica, es fundamental formar
                    a las nuevas generaciones para que sean parte de la transformación
                    digital. Comprometidos con esta realidad, desde la empresa Egg, edtech
                    de base científica que busca resolver la escasez de talento digital a
                    escala a través de tecnología y cooperación, relanzan su iniciativa de
                    formación accesible y de alta calidad. Con este enfoque invitan a
                    todas las personas de 15 años en adelante (sin límite de edad) a
                    cursar de forma gratuita su nuevo curso de Programación web desde
                    cero. El mismo tiene una duración de 3 semanas y busca que los
                    asistentes desarrollen las bases para comenzar su camino hacia la
                    industria tech. Los interesados en sumarse a esta propuesta, que
                    incluye certificado.
                </h2>
                <a
                    className={`${s.newsLink} ${s[theme("text")]}`}
                    href="https://eggcooperation.com/es-ar/programacion-desde-cero/?utm_source=freepress&utm_medium=argentina&utm_id=mayo&utm_term=nuevoPDC"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Link para visitar
                </a>
            </section>
            {
                docWidth < 750 ? (
                    <Footer/>
                ) : (
                    isAtBottom ? <Footer /> : null
                )
            }
        </main>
    );
}

export default HomePage;