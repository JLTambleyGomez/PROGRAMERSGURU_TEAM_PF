import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_products_all, post_Products, delete_Products,get_categories, post_categories, clearCourses, clearMessage, delete_categories, get_courses_all, post_course, delete_course } from "../../../Redux/actions";
import validate from "./validate";
import Categories from "./Categories";
import Courses from "./Courses"
import Products from "./Products"
import styles from "./AdminPanel.module.css";

//_________________________module_________________________
function AdminPanel () {

    //global state: 
    const message = useSelector((state) => state.message);
    const dark = useSelector((state) => state.darkMode);
    
    //const:
    const dispatch = useDispatch();

    const [showcategories,setshowcategories]= useState(false)
    const [showcursos,setshowcursos]= useState(false)
    const [showproducts, setshowproducts]=useState(false)


    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };


    const handleShowCategories = (event) =>{
        event.preventDefault();
        if (showcategories === false) setshowcategories(true);
        else setshowcategories(false);
    }

    const handleShowCursos = (event) =>{
        if (showcursos === false) setshowcursos(true);
        else setshowcursos(false);
    }

    const handleShowProducts = (event) =>{
      if (showproducts === false) setshowproducts(true);
      else setshowproducts(false);
    }

 

    //life-cycles:
    useEffect(() => {
        dispatch(clearMessage());
        dispatch(get_categories());
        dispatch(get_courses_all());
        dispatch(get_products_all());

        

        return () => {                // return ocupar para hacer algo en el desmontaje          
            dispatch(clearMessage()); // limpiar 
            dispatch(clearCourses()); 
        }
    }, [dispatch]);


      

    //component:
    return (
        <div className={`${styles.component} ${styles[theme("component")]}`} >

            <div className={styles.message}>Respuesta desde Servidor: {message}</div>

            <div className={styles.contain} >
            <div>
                <button className={`${styles.mainButton}`} onClick={handleShowCategories} >
                    <h1 className={`${styles.h1}`}>ADMINISTRAR CATEGORIAS</h1>
                </button>
                {showcategories&&(<Categories></Categories>)}

                <button className={`${styles.mainButton}`} onClick={handleShowCursos}>
                    <h1 className={styles.h1}>ADMINISTRAR CURSOS</h1>
                </button>
            </div>
            {showcursos && (
               <Courses></Courses>
            )}

              <div>
                <button className={`${styles.mainButton}`} onClick={handleShowProducts}>
                    <h1 className={styles.h1}>ADMINISTRAR PRODUCTOS</h1>
                </button>
                 </div>
                 {showproducts&& ( 
              <Products></Products>
            )}
              
              </div>
        </div>
    );
};

export default AdminPanel;


