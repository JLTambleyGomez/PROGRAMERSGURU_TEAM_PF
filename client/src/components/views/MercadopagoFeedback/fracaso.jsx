import { useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get_User_By_Email } from "../../../Redux/actions"


//_________________________module_________________________
function MercadoPagoFailure () {


    //const:
    const navigate = useNavigate();
    const [error, setError] = useState('');
    
    //const:
    const location = useLocation();
    const dispatch = useDispatch();
    const email = sessionStorage.getItem("email");

    //life-cycles:
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken")
        if (!token) navigate("/IniciaSession")
    },[])


    useEffect(() => {
        dispatch(get_User_By_Email(email))
    }, [])

    useEffect(() => {
        if (location.state && location.state.error) setError(location.state.error);
    }, [location.state]);


    //component:
    return (
        <div className={styles.container}>
            <div className={styles.container2}>
                <div className={styles.imgcontainer}>
                    <img
                    className={styles.img}
                    src="https://seeklogo.com/images/M/mercado-pago-logo-52B7182205-seeklogo.com.png"
                    alt="mercadopago"
                    />
                    <p className={styles.x}>Error</p>
                </div>
            </div>
            <div className={styles.detalles}>
                <div className={styles.detalles2}>
                    <h1 className={styles.h1}>Pago Fallido!</h1>
                    <h3 className={styles.idtransaccion}>{error}</h3>
                    <NavLink className={styles.tohome} to="/HomePage">Ir a Home</NavLink>
                </div>
            </div>
        </div>
    );
};


export default MercadoPagoFailure;