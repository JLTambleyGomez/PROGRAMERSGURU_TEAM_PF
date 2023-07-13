import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getloged } from "../../../Redux/actions";
import validate from "./validate";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

//_________________________module_________________________
function SignFreeForm({signInwithGoogle, authorizedUser, signIn, createUser}) {
  // const dispatch = useDispatch()
  //states:
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const [alreadySignedUp, setAlreadySignedUp] = useState(false)
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

  const setState = (event) => {
    if (event.target.name === "signUp") {
      setAlreadySignedUp(false)
    } else {
      setAlreadySignedUp(true)
    }
  }

  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault();
    if (alreadySignedUp) {
      signIn(userData.email, userData.password)
    } else {
      createUser(userData.email, userData.password)
    }
  };

  //component:
  return (
    <div className={styles.loginFormContainer}>
      {showButton && (
        <button onClick={handleToggleForm} className={styles.openButton}>
          Ingresar
        </button>
      )}
      {showForm && (
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
              <button className={styles.button} type="submit" name="logIn" onClick={setState}>
                Acceder
              </button>
              <button className={styles.button} type="submit" name="signUp" onClick={setState}>
                Registrarme
              </button>
              <hr />
            </form>
              {/* BOTON PARA INGRESAR CON GOOGLE */}
              <button
                className={styles.button}
                type="submit"
                onClick={signInwithGoogle}
              >
                Acceder con Google
              </button>
              {authorizedUser ? (
                <>
                  {authorizedUser && navigate("/HomePage")}
                </>
              ) : (
                ""
              )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SignFreeForm;
