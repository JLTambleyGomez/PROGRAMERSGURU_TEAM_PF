import { getAuth, signInWithPopup, signOut, GoogleAuthProvider,  onAuthStateChanged } from "firebase/auth";
import app from "../../../config/firebase";
import "firebase/auth";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch} from "react-redux";
import { getloged } from "../../../Redux/actions";
import validate from "./validate";

import styles from './LoginForm.module.css';

//_________________________module_________________________
function LoginForm () {
   const dispatch = useDispatch()
   const navigate = useNavigate();

    //states:
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const access = useSelector((state) => state.access)

    const [auth, setAuth] = useState(false);

    
    // useEffect(() => {
        //     const auth = getAuth(app);
        
        //     const unsubscribe = onAuthStateChanged(auth, (user) => {
            //       if (user) {
                //         setAuth(true);
                //         console.log(user);
                //       }
                //     });
                
                //     return () => unsubscribe();
                //   }, []);
                
                
        const loginWithGoogle = () => {
          const auth = getAuth(app);
          const provider = new GoogleAuthProvider();
          signInWithPopup(auth, provider)
         .then((userCred) => {
          console.log(userCred);
            if (userCred) {
                setAuth(true);
            } else {
                setAuth(false);
            }
        })
          .catch((error) => {
            console.log(error);
          });
      };

     
      

    const [userData, setUserData]=useState({
        email:"",
        password:"",
    })

    const [errors, setErrors] = useState({
        email:"",
        password:"",
    })

    //functions:
    const handleOnchange = (event) => {
        const {property, value} = event.target;
        setUserData({...userData, [property]: value});
        validate({...userData, [property]: value}, errors, setErrors);
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
        setShowButton(false);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setShowButton(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch(getloged(userData));
        access && navigate('/HomePage');
    };

    //component:
    return (
        <div className={styles.loginFormContainer}>
            {
                showButton && (
                    <button onClick={handleToggleForm} className={styles.openButton}>
                        Ingresar
                    </button>
                )
            }
            {
                showForm && (
                    <div className={styles.container}>
                    <div className={styles.form}>
                    {/* CLOSE FORM */}
                        <button onClick={handleCloseForm} className={styles.closeButton}>
                        <span className={styles.closeIcon}>x</span>
                        </button>
                    {/* FORM */}
                        <form onSubmit={handleSubmit}>
                            <h1 className={styles.title}>BIENVENIDO</h1>
                        {/* EMAIL */}
                            <label className={styles.label} htmlFor="email">Email</label>
                            <input onChange={handleOnchange}
                                className={styles.input}
                                name="email"
                                type="email"
                                placeholder="Ingresa Email"
                            />
                            { errors.username && <p className={styles.error}>{errors.username}</p> }

                        {/* PASSWORD */}
                            <label className={styles.label} htmlFor="password">Contraseña</label>
                            <div className={styles.password}>
                                <input onChange={handleOnchange}
                                    className={styles.input}
                                    name="password"
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Ingrese Password"
                                />
                            </div>
                        {/* TOGGLE PASSWORD VISIBILITY */}
                            <button className={styles.button} onClick={() => setPasswordVisible(!passwordVisible)}>
                            {passwordVisible ? "Hide Password" : "Show Password"}
                            </button>
                            { errors.password && <p className={styles.error}>{errors.password}</p> }

                            <p className={styles.recommendation}>Recomendamos usar una contraseña que incluya una combinación de letras mayúsculas y minúsculas, números y caracteres especiales para mayor seguridad.</p>

                        {/* SUBMIT */}
                            <button className={styles.button} type="submit">Submit</button>
                            <hr/>
                            {/* BOTON PARA INGRESAR CON GOOGLE */}

                            {auth ? (
                                navigate("/HomePage")) :

                                <button onClick ={loginWithGoogle}>Sign in with Google</button>
                            }
                        </form>
                    </div>
                    </div>
                )
            }
        </div>
    );
};

export default LoginForm;