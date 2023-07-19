import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { get_products_all,get_categories, clearCourses, clearMessage, get_courses_all } from "../../../Redux/actions";
import Categories from "./Categories";
import Courses from "./Courses"
import Products from "./Products"
import User from './User'
import Subscriptions from './Subscriptions'
import styles from "./AdminPanel.module.css";

//_________________________module_________________________
const  AdminPanel =() =>{

    //global state: 
    const message = useSelector((state) => state.message);
    const dark = useSelector((state) => state.darkMode);
    
    //const:
    const dispatch = useDispatch();

    const [showcategories,setshowcategories]= useState(false)
    const [showcursos,setshowcursos]= useState(false)
    const [showproducts, setshowproducts]=useState(false)
    const [showUsers,setShowUsers] = useState(false)
    const [showSubscriptions,setShowSubscriptions] = useState(false)


    //functions:
    const theme = (base) => {
        const suffix = dark ? 'dark' : 'light';
        return `${base}-${suffix}`;
    };

    const handleShowCategories = (event) => {
        event.preventDefault();
        setshowcategories(!showcategories);
        setshowcursos(false);
        setshowproducts(false);
        setShowUsers(false);
        setShowSubscriptions(false);
      }
      
      const handleShowCursos = (event) => {
        setshowcursos(!showcursos);
        setshowcategories(false);
        setshowproducts(false);
        setShowUsers(false);
        setShowSubscriptions(false);
      }
      
      const handleShowProducts = (event) => {
        setshowproducts(!showproducts);
        setshowcategories(false);
        setshowcursos(false);
        setShowUsers(false);
        setShowSubscriptions(false);
      }
      
      const handleShowUsers = (event) => {
        setShowUsers(!showUsers);
        setshowcategories(false);
        setshowcursos(false);
        setshowproducts(false);
        setShowSubscriptions(false);
      }
      
      const handleShowSubscription = (event) => {
        setShowSubscriptions(!showSubscriptions);
        setshowcategories(false);
        setshowcursos(false);
        setshowproducts(false);
        setShowUsers(false);
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

            <div>
                <button className={styles.buton} onClick={handleShowCategories} >
                    <h1 className={styles.h1} >ADMINISTRAR CATEGORIAS</h1>
                </button>
                {showcategories&&(<Categories></Categories>)}
            
            <div/>

            <div>   
        
          <button className={styles.buton} onClick={handleShowCursos}>
                    <h1 className={styles.h1}>ADMINISTRAR CURSOS</h1>
                </button>
                {showcursos && (
               <Courses></Courses>
            )}</div>
            

              <div>
                <button className={styles.buton} onClick={handleShowProducts}>
                    <h1 className={styles.h1}>ADMINISTRAR PRODUCTOS</h1>
                </button>
                 {showproducts&& ( 
              <Products></Products>
            )}
              </div>

              <div>
                <button  className={styles.buton} onClick={handleShowUsers}>
                    <h1 className={styles.h1}>ADMINISTRAR USUARIOS</h1>
                </button>
                {showUsers && (<User></User>)}
              </div>

              <div>
                <button className={styles.buton} onClick={handleShowSubscription}>
                    <h1 className={styles.h1}>ADMINISTRAR SUSCRIPCIONES</h1>
                </button>
                {showSubscriptions && (<Subscriptions></Subscriptions>)}
              </div>
              </div>
        </div>
    );
};

export default AdminPanel;


