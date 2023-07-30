import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { get_User_By_Email } from "../../../Redux/actions";
import validate from "./validate";

import styles from "./LoginForm.module.css";
import signIn from "../../../user/signIn";
import createUser from "../../../user/createUser";
import signInwithGoogle from "../../../user/signInWithGoogle";
import GoogleButton from "./GoogleButton"
import ModalBannedUser from "../../views/ModalBannedUser/ModalBannedUser";

//_________________________module_________________________
function SignFreeForm () {

    //global states:
    const user = useSelector((state) => state.user);


    //states:
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [accessButton, setAccessButton] = useState(false);
    const [modal, setModal] = useState(false)
    const [passwordButton, setPassworButton] = useState(false);
    const [focus, setFocus] = useState({
        email: false,
        password: false
    });

    const [userData, setUserData] = useState({
        email: " ",
        password: " ",
    });
    const [errors, setErrors] = useState({
        email: " ",
        password: " ",
    });

    //functions:
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData({ ...userData, [name]: value });
        validate({ ...userData, [name]: value }, errors, setErrors);
    };

    const handleToggleForm = () => {
        setShowForm(!showForm);
        setShowButton(false);
    };

    const handleCloseForm = () => {
        setErrors({
            email: " ",
            password: " ",
        })
        setShowForm(false);
        setShowButton(true);
    };

    const showPassword = (event) => {
        event.preventDefault();
        setPasswordVisible(!passwordVisible);
    };

// usar async y dispatch:
    const handleLogIn = (event) => {
        event.preventDefault();
        get_User_By_Email(userData.email);
        if (user?.banned) {
            return setModal(true)
        } else signIn(userData.email, userData.password);
    };

// usar async y dispatch:
    const handleSignUp = (event) => {
        event.preventDefault();
        get_User_By_Email(userData.email);
        createUser(userData.email, userData.password);
    };

    const handleLoginWithGoogle = (event) => {
        event.preventDefault();
        signInwithGoogle();
    };

    //LIFE-CYCLES:
    useEffect(() => {
        (!errors.email && !errors.password)
        ? setAccessButton(true)
        : setAccessButton(false);
    }, [errors]);

    useEffect(() => {
        if (userData.password !== " ") {
            userData.password != ""
            ? setPassworButton(true)
            : setPassworButton(false)
        }
    }, [userData])


    //component:
    return (
        <div className={styles.loginFormContainer}>
            {
                showButton && (
                    <button onClick={handleToggleForm} className={styles.boton1}>
                        <p>
                            Ingresar
                        </p>
                    </button>
                )
            }
            {
                showForm && (
                    <div className={styles.container} onClick={handleCloseForm}>
                        <div className={styles.form} onClick={(event) => event.stopPropagation()}>
                        {/* CLOSE FORM */}
                            <button
                                onClick={handleCloseForm}
                                className={styles.closeButton}
                            >
                                <span className={styles.closeIcon}>x</span>
                            </button>
                        {/* FORM */}
                            <form>
                                <h1 className={styles.title}>BIENVENIDO</h1>
                        {/* EMAIL */}
                                <label className={styles.label} name="email" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={handleChange}
                                    className={`
                                        ${styles.input} 
                                        ${focus.email ? styles.focused : ""} 
                                        ${errors.email !== " " && errors.email ? styles.errorIn : ""}`}
                                    onFocus={() => setFocus({...focus, email: true })}
                                    onBlur={() => setFocus({...focus, email: false })}
                                    placeholder="Ingresa tu email"
                                />
                                {
                                    errors.email && (
                                        <p className={styles.error}>{errors.email}</p>
                                    )
                                }

                        {/* PASSWORD */}
                                <label style={{marginTop: "30px"}} className={styles.label} htmlFor="password">
                                    Contraseña
                                </label>
                                <div className={styles.password}>
                                    <input
                                        id="password"
                                        name="password"
                                        type={passwordVisible ? "text" : "password"}
                                        onChange={handleChange}
                                        className={`
                                            ${styles.input} 
                                            ${focus.password ? styles.focused : ""} 
                                            ${errors.password !== " " && errors.password ? styles.errorIn : ""}`}
                                        onFocus={() => setFocus({...focus, password: true })}
                                        onBlur={() => setFocus({...focus, password: false })}
                                        placeholder="Ingresa tu contraseña"
                                    />
                                </div>
                        {/* TOGGLE PASSWORD VISIBILITY */}
                                {
                                    passwordButton && (
                                        <button
                                            style={{marginBottom: "3%"}}
                                            className={styles.button}
                                            onClick={showPassword}
                                        >
                                            {
                                                passwordVisible
                                                ? "Mostrar contraseña"
                                                : "Ocultar contraseña"
                                            }
                                        </button>
                                    )
                                }
                                {
                                    errors.password && (
                                        <p className={styles.error}>
                                            {errors.password}
                                        </p>
                                    )
                                }

                                <p className={styles.recommendation}>
                                    Recomendamos usar una contraseña que incluya una
                                    combinación de letras mayúsculas y minúsculas,
                                    números y caracteres especiales para mayor
                                    seguridad.
                                </p>

                        {/* SUBMIT */}
                            <div className={styles.options}>
                                <button
                                    // disabled={accessButton}
                                    className={`${styles.boton2} ${
                                        !accessButton ? styles.buttonDisabled : ""
                                    }`}
                                    disabled={!accessButton ? true : false}
                                    type="submit"
                                    onClick={handleLogIn}
                                >
                                    Acceder
                                </button>
                                <button
                                    className={`${styles.boton2} ${
                                        !accessButton ? styles.buttonDisabled : ""
                                    }`}
                                    disabled={!accessButton ? true : false}
                                    type="submit"
                                    onClick={handleSignUp}
                                >
                                    Registrarme
                                </button>
                            </div>
                                <hr />
                            </form>
                            <GoogleButton onClick={handleLoginWithGoogle}/>
                        </div>
                        {
                            modal && <ModalBannedUser/>
                        }
                    </div>
                )
            }
        </div>
    );
}

export default SignFreeForm;
