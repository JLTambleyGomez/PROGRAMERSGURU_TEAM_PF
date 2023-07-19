import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../config/firebase-config";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
    get_categories,
    get_courses_all,
    clearMessage,
    get_Favorites_Request,
    // get_User_By_Email,
} from "../../../Redux/actions";

import s from "./HomePage.module.css";
import CoursesPreview from "../../datos/CoursesPreview/CoursesPreview";
import Comments from "../../datos/Comments/Comments";
import SubscripcionesFlotante from "../../datos/Subscripciones/SubscripcionesFlotante";
//import axios from "axios";
//_________________________module_________________________
function HomePage () {

    //global state:
    const dark = useSelector((state) => state.darkMode);
    const allCourses = useSelector((state) => state.allCourses);
    //const:
    const dispatch = useDispatch();
    const latestCourses = Array.isArray(allCourses) ? allCourses.slice(-4) : [];

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    //-------------------------------------------------------------------------
    // obtener el email
    const email = localStorage.getItem("email")
    //-------------------------------------------------------------------------
    const sendEmail = async () => {
        const carta = {email: "calderon", message:"enviado"}
        await axios.post(`http://localhost:3001/user/sendEmail`, carta );
    };


    //life-cycles:
    useEffect(() => {
        // dispatch(get_User_By_Email(email))
        dispatch(get_categories());
        dispatch(get_courses_all());
        (async () => {
            await sendEmail();
        })()

        //--desmontado
        return () => {
            dispatch(clearMessage());
        };
    }, [dispatch]);


    //component:
    return (
        <main className={`${s.component} ${s[theme("component")]}`}>
        {/* BANNER */}
            <section className={`${s.sectionBanner}`}>
                <img
                    className={`${s.bannerImg}`}
                    src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg"
                    alt="mainBanner"
                />
                <h1 className={`${s.mainTitle} ${s[theme("mainTitle")]}`}>
                    PROGRAMMER'S GURU
                </h1>
            </section>
            <SubscripcionesFlotante/>
        {/* LAST COURSES */}
            <section className={`${s.sectionCourses}`}>
                <h1 className={`${s.coursesTitle} ${s[theme("coursesTitle")]}`}>
                    ÚLTIMOS CURSOS DEL MERCADO
                </h1>
                <div>
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

        {/* NEWS */}
            <section className={`${s.sectionNews}`}>
                <h1 className={`${s.newsTitle} ${s[theme("newsTitle")]}`}>NOTICIAS</h1>
                <span className={`${s.newsBanner}`}>
                <h2 className={`${s[theme("text")]}`}>
                    Programación web desde casa: el nuevo curso gratis online basado en
                    inteligencia artificial
                </h2>
                <img
                    className={`${s.newsImg}`}
                    src="https://www.cronista.com/files/image/525/525496/6446a76145585.jpg"
                    alt="newsBanner"
                />
                </span>
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
        </main>
    );
}

export default HomePage;
