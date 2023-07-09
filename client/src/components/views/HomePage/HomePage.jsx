import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_categories, get_courses_all, clearCourses, clearMessage, get_Favorites_Request } from "../../../Redux/actions";
import styles from "./HomePage.module.css";
import Cards from '../../datos/Cards/Cards';
import Comments from '../../datos/Comments/Comments';

//_________________________module_________________________
function HomePage () {

  //const:
  const courses = useSelector((state) => state.courses)
  const dispatch = useDispatch()
  const latestCourses = courses.slice(-4);

  //states:    
  const darkmode = useSelector((state) => state.darkMode);


  const [elementClasses, setElementClasses] = useState({
    h1: "h1light",
    input: "inputlight",
    button: "buttonlight",
    buttoncontainer: "buttoncontainerlight",
    container: "containerslight",
    label: "labellight",
    a: "alight",
    p: "plight",
    div: "divlight",
    span: "spanlight",
    form: "formlight",
    hr: "hrlight",
    error: "errorlight",
    success: "successlight",
    link: "linklight",
    ul: "ullight",
    h2: "h2light",
    logo: "logolight",
  });

  useEffect(() => {
    const updatedElementClasses = {};

    Object.keys(elementClasses).forEach((key) => {
      updatedElementClasses[key] = `${key}${darkmode ? "dark" : "light"}`;
    });

    setElementClasses(updatedElementClasses);
  }, [darkmode]);

  //functions:


  //life-cycles:
  useEffect(() => {
    try {
      dispatch(get_categories());
      dispatch(get_courses_all());
      dispatch(get_Favorites_Request(1))
    } catch (error) {
      // Ignorar errores y no hacer nada
    }

    return () => { // return ocupar para hacer algo en el desmontaje
      try {
        dispatch(clearMessage()); // limpiar
        dispatch(clearCourses());
      } catch (error) {
        // Ignorar errores y no hacer nada
      }
    }
  }, [dispatch]);


  //component:
  return (
    <div className={`${styles.container} ${styles[elementClasses.container]}`}>
      <div>
        <p className={`${styles.logo} ${styles[elementClasses.logo]}`}><img className={styles.imgcat} src="https://storage.googleapis.com/pai-images/7dd87a726d554d02a57f5e2267ae7393.jpeg" alt="banner" />
          PROGRAMMER'S GURÚ</p>
      </div>
      <h1 className={`${styles.h1} ${styles[elementClasses.h1]}`}>Ultimos Cursos del Mercado</h1>
      <div>
      {Array.isArray(courses) ? (
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
        <h1 className={`${styles.span} ${styles[elementClasses.span]}`}>News</h1>
        <h2 className={`${styles.h2} ${styles[elementClasses.h2]}`}>Programación web desde casa: el nuevo curso gratis online basado en inteligencia artificial   <img className={styles.newsimg} src="https://www.cronista.com/files/image/525/525496/6446a76145585.jpg" alt="banner" /></h2>

        <p className={`${styles.p} ${styles[elementClasses.p]}`}>Actualizado el 10 de Mayo de 2023</p>
        <h2 className={`${styles.ul} ${styles[elementClasses.ul]}`}>En un mundo en constante evolución tecnológica,
          es fundamental formar a las nuevas generaciones para que sean parte de la transformación digital.
                 Comprometidos con esta realidad, desde la empresa Egg, edtech de base científica que busca resolver
                  la escasez de talento digital a escala a través de tecnología y cooperación, relanzan su iniciativa
                  de formación accesible y de alta calidad.
                Con este enfoque invitan a todas las personas de 15 años en adelante (sin límite de edad) a cursar
                 de forma gratuita su nuevo curso de Programación web desde cero. El mismo tiene una duración de
                 3 semanas y busca que los asistentes desarrollen las bases para comenzar su camino hacia la industria
                 tech. Los interesados en sumarse a esta propuesta, que incluye certificado.
               </h2>
        <a className={`${styles.a} ${styles[elementClasses.a]}`}
          href="https://eggcooperation.com/es-ar/programacion-desde-cero/?utm_source=freepress&utm_medium=argentina&utm_id=mayo&utm_term=nuevoPDC"
          target="_blank" rel="noopener noreferrer">Link Para Visitar </a>

      </div>


    </div>
  );
}

export default HomePage;
