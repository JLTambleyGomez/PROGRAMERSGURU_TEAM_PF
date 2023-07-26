import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { get_courses_all, clearMessage, clearCourses } from "../../../Redux/actions";
import theme from "../../../theme/theme";

import styles from "./CoursePage.module.css";
import CoursesCard from "../../datos/CoursesCard/CoursesCard";
import FilterBar from "../../bars/filterBar/FilterBar";
import Footer from "../../bars/Footer/Footer";

//_________________________module_________________________
function CoursePage ( { isAtBottom, docWidth } ) {


    //global states:
    const allCourses = useSelector((state) => state.courses)

    //states:
    const [isloading, setIsloading] = useState(true);

    //const:
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //life-cycles:
    useEffect(() => {
        // if (!allCourses.length) dispatch(get_courses_all());
        //--desmontado
        return () => { 
            dispatch(clearMessage());
            dispatch(clearCourses());
        };
    }, [dispatch]);

    useEffect(() => {
        // (async () => {
        //     setIsloading(true);
        //     setIsloading(false);
        // })()
        (async () => {
            setIsloading(true);
            if (!allCourses.length) await dispatch(get_courses_all());
            await new Promise(resolve => setTimeout(resolve, 1000));
            setIsloading(false);
        })()
    }, [allCourses])

    

    useEffect(() => {
        if (!isloading) {
          const targetElement = document.querySelector(`.${styles.mainBanner}`);
          if (targetElement) {
            scrollToElement(targetElement, 0.8);
        }
        }
      }, [isloading]);

      const scrollToElement = (element, duration) => {
        const targetPosition = element.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
    
        const animateScroll = currentTime => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const progress = Math.min(timeElapsed / (duration * 1000), 1);
          const easedProgress = easeInOutCubic(progress);
          const scrollY = startPosition + distance * easedProgress;
          window.scrollTo(0, scrollY);
    
          if (timeElapsed < duration * 1000) {
            requestAnimationFrame(animateScroll);
          }
        };
    
        const easeInOutCubic = t => {
          t /= 1 / 2;
          if (t < 1) return (1 / 2) * t * t * t;
          t -= 2;
          return (1 / 2) * (t * t * t + 2);
        };
    
        requestAnimationFrame(animateScroll);
      };

    //component:
    return (
        <main className = {`${styles.component} ${styles[theme("component")]}`}>
        {/* BANNER */}
            <div className={styles.mainBanner}>
                <h1>Explora todos nuestros cursos</h1>
            </div>

        {/* FILTROS */}
            <div className={styles.filterOrder}>
                <FilterBar/>
            </div>

        {/* CURSOS */}
            {
                <div className = {styles.cardComponent}>
                    {
                        isloading 
                        ? <h1 className={styles.cargando}>CARGANDO...</h1>
                        : <CoursesCard/>
                    }
                </div>
            }
            {
                docWidth < 750 ? (
                    <Footer/>
                ) : (
                    isAtBottom ? <Footer /> : null
                )
            }
        </main>
    )
}

export default CoursePage;