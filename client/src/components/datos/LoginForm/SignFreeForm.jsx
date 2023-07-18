import { useState } from "react";
import validate from "./validate";
import styles from "./LoginForm.module.css";

import signIn from "../../../user/signIn";
import createUser from "../../../user/createUser";
import signInwithGoogle from "../../../user/signInWithGoogle";
import { get_User_By_Email } from "../../../Redux/actions";

//_________________________module_________________________
function SignFreeForm() {
  // const dispatch = useDispatch()
  //states:
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
    setShowForm(false);
    setShowButton(true);
  };

  const showPassword = (event) => {
    event.preventDefault()
    setPasswordVisible(!passwordVisible)
  } 

  const handleLogIn = (event) => {
    event.preventDefault();
    get_User_By_Email(userData.email)
    signIn(userData.email, userData.password)
  }
  const handleSignUp = (event) => {
    event.preventDefault();
    get_User_By_Email(userData.email)
    createUser(userData.email, userData.password)
  }

  const handleLoginWithGoogle = (event) => {
    event.preventDefault();
    signInwithGoogle()
  }

  //component:
  return (
    <div className={styles.loginFormContainer}>
      {showButton && (
        <p onClick={handleToggleForm} className={styles.boton}>
          Ingresar
        </p>
      )}
      {showForm && (
        <div className={styles.container}>
          <div className={styles.form}>
            {/* CLOSE FORM */}
            <button onClick={handleCloseForm} className={styles.closeButton}>
              <span className={styles.closeIcon}>x</span>
            </button>
            {/* FORM */}
            <form>
              <h1 className={styles.title}>BIENVENIDO</h1>
              {/* EMAIL */}
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input
                onChange={handleChange}
                className={styles.input}
                name="email"
                type="email"
                placeholder="Ingresa Email"
              />
              {errors.email && (
                <p className={styles.error}>{errors.email}</p>
              )}

              {/* PASSWORD */}
              <label className={styles.label} htmlFor="password">
                Contraseña
              </label>
              <div className={styles.password}>
                <input
                  onChange={handleChange}
                  className={styles.input}
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Ingrese Password"
                />
              </div>
              {/* TOGGLE PASSWORD VISIBILITY */}
              <button
                className={styles.button}
                onClick={showPassword}
              >
                {passwordVisible ? "Hide Password" : "Show Password"}
              </button>
              {errors.password && (
                <p className={styles.error}>{errors.password}</p>
              )}

              <p className={styles.recommendation}>
                Recomendamos usar una contraseña que incluya una combinación de
                letras mayúsculas y minúsculas, números y caracteres especiales
                para mayor seguridad.
              </p>

              {/* SUBMIT */}
              <button className={styles.button} type="submit" onClick={handleLogIn}>
                Acceder
              </button>
              <button className={styles.button} type="submit" onClick={handleSignUp} >
                Registrarme
              </button>
              <hr />
            </form>
              {/* BOTON PARA INGRESAR CON GOOGLE */}
              <button
                className={styles.button}
                type="submit"
                onClick={handleLoginWithGoogle}
              >
                Acceder con Google
              </button>
              {/* <GoogleButton onClick={signInwithGoogle}/> */}
          </div>
        </div>
      )}
    </div>
  );
}

export default SignFreeForm;
