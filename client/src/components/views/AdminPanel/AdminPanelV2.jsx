import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    get_tecnology,
    get_products_all,
    get_categories,
    clearCourses,
    clearMessage,
    get_courses_all,
    get_suscriptions,
    get_User_By_Email,
} from "../../../Redux/actions";
import Categories from "./Categories";
import Courses from "./Courses";
import Products from "./Products";
import User from "./User";
import Subscriptions from "./Subscriptions";
import styles from "./AdminPanelV2.module.css";
import ModalAdminPanel from "../ModalAdminPanel/ModalAdminPanel";
import Tecnology from "./Tecnology";
import Payments from "./Payments";

//_________________________module_________________________
const AdminPanelV2 = () => {
    //global state:
    const message = useSelector((state) => state.message);
    const dark = useSelector((state) => state.darkMode);
    const user = useSelector((state) => state.user);

    //const:
    const dispatch = useDispatch();

    const [showcategories, setshowcategories] = useState(false);
    const [showcursos, setshowcursos] = useState(false);
    const [showproducts, setshowproducts] = useState(false);
    const [showUsers, setShowUsers] = useState(false);
    const [showSubscriptions, setShowSubscriptions] = useState(false);
    const [showTecnology, setShowTecnology] = useState(false);
    const [showPayment, setShowPayment] = useState(false);

    //functions:
    const theme = (base) => {
        const suffix = dark ? "dark" : "light";
        return `${base}-${suffix}`;
    };

    const handleShowTecnology = (event) => {
        event.preventDefault();
        setShowTecnology(!showTecnology);
        setshowcursos(false);
        setshowproducts(false);
        setShowUsers(false);
        setshowcategories(false);
        setShowSubscriptions(false);
        setShowPayment(false);
    };
    const handleShowPayment = (event) => {
        event.preventDefault();
        setShowPayment(!showPayment);
        setShowTecnology(false);
        setshowcursos(false);
        setshowproducts(false);
        setShowUsers(false);
        setshowcategories(false);
        setShowSubscriptions(false);
    };

    const handleShowCategories = (event) => {
        event.preventDefault();
        setshowcategories(!showcategories);
        setshowcursos(false);
        setshowproducts(false);
        setShowUsers(false);
        setShowSubscriptions(false);
        setShowTecnology(false);
        setShowPayment(false);
    };

    const handleShowCursos = (event) => {
        setshowcursos(!showcursos);
        setshowcategories(false);
        setshowproducts(false);
        setShowUsers(false);
        setShowSubscriptions(false);
        setShowTecnology(false);
        setShowPayment(false);
    };

    const handleShowProducts = (event) => {
        setshowproducts(!showproducts);
        setshowcategories(false);
        setshowcursos(false);
        setShowUsers(false);
        setShowSubscriptions(false);
        setShowTecnology(false);
        setShowPayment(false);
    };

    const handleShowUsers = (event) => {
        setShowUsers(!showUsers);
        setshowcategories(false);
        setshowcursos(false);
        setshowproducts(false);
        setShowSubscriptions(false);
        setShowTecnology(false);
        setShowPayment(false);
    };

    const handleShowSubscription = (event) => {
        setShowSubscriptions(!showSubscriptions);
        setshowcategories(false);
        setshowcursos(false);
        setshowproducts(false);
        setShowUsers(false);
        setShowTecnology(false);
        setShowPayment(false);
    };

    //life-cycles:
    useEffect(() => {
        const email = localStorage.getItem("email");
        if (!user?.email) dispatch(get_User_By_Email(email));
    }, []);

    useEffect(() => {
        get_tecnology, dispatch(clearMessage());
        dispatch(get_categories());
        dispatch(get_courses_all());
        dispatch(get_products_all());
        dispatch(get_suscriptions());
        dispatch(get_tecnology());
        return () => {
            // return ocupar para hacer algo en el desmontaje
            dispatch(clearMessage()); // limpiar
            dispatch(clearCourses());
        };
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            dispatch(clearMessage());
        })();
    }, [dispatch]);

    useEffect(() => {
        console.log(message);
    }, [message]);

    if (!user.admin) return <ModalAdminPanel />;

    //component:
    return (
        <main className={`${styles.component} ${styles[theme("component")]}`}>
            <div className={styles.message}>
                Respuesta desde Servidor: {message}
            </div>

            <div className={`${styles.content} ${styles[theme("content")]}`}>
                <div className={styles.options}>
                    <p className={styles.buton} onClick={handleShowCategories}>
                        <h1 className={styles.h1}>ADMINISTRAR CATEGORIAS</h1>
                    </p>
                    <p className={styles.buton} onClick={handleShowCursos}>
                        <h1 className={styles.h1}>ADMINISTRAR CURSOS</h1>
                    </p>
                    <p className={styles.buton} onClick={handleShowProducts}>
                        <h1 className={styles.h1}>ADMINISTRAR PRODUCTOS</h1>
                    </p>
                    <p className={styles.buton} onClick={handleShowUsers}>
                        <h1 className={styles.h1}>ADMINISTRAR USUARIOS</h1>
                    </p>
                    <p className={styles.buton} onClick={handleShowSubscription}>
                        <h1 className={styles.h1}> ADMINISTRAR SUSCRIPCIONES </h1>
                    </p>
                    <p className={styles.buton} onClick={handleShowTecnology} >
                        <h1 className={styles.h1}> ADMINISTRAR TECNOLOGIAS </h1>
                    </p>
                    <p className={styles.buton} onClick={handleShowPayment}>
                        <h1 className={styles.h1}>ADMINISTRAR PAGOS</h1>
                    </p>
                </div>

                <div className={styles.table}>
                    {showcategories && <Categories></Categories>}
                    {showcursos && <Courses></Courses>}
                    {showproducts && <Products></Products>}
                    {showUsers && <User></User>}
                    {showSubscriptions && <Subscriptions></Subscriptions>}
                    {showTecnology && <Tecnology />}
                    {showPayment && <Payments />}
                </div>
            </div>
        </main>
    );
};

export default AdminPanelV2;
