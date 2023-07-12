import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getloged } from "../../../Redux/actions";
import validate from "./validate";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";

//_________________________module_________________________
function LoginForm({signInwithGoogle, authorizedUser}) {
  const dispatch = useDispatch()
  //states:
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  //functions:
  const handleOnchange = (event) => {
    const { property, value } = event.target;
    setUserData({ ...userData, [property]: value });
    validate({ ...userData, [property]: value }, errors, setErrors);
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
    setShowButton(false);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setShowButton(true);
  };

  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault();

    //   dispatch(getloged(userData));
    // access && navigate("/HomePage");
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
                onChange={handleOnchange}
                className={styles.input}
                name="email"
                type="email"
                placeholder="Ingresa Email"
              />
              {errors.username && (
                <p className={styles.error}>{errors.username}</p>
              )}

              {/* PASSWORD */}
              <label className={styles.label} htmlFor="password">
                Contraseña
              </label>
              <div className={styles.password}>
                <input
                  onChange={handleOnchange}
                  className={styles.input}
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Ingrese Password"
                />
              </div>
              {/* TOGGLE PASSWORD VISIBILITY */}
              <button
                className={styles.button}
                onClick={() => setPasswordVisible(!passwordVisible)}
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
              <button className={styles.button} type="submit">
                Submit
              </button>
              <hr />
              {/* BOTON PARA INGRESAR CON GOOGLE */}
              <button
                className={styles.button}
                type="submit"
                onClick={signInwithGoogle}
              >
                Entrar con Google
              </button>
              {authorizedUser ? (
                <>
                  {authorizedUser && navigate("/HomePage")}
                  {/* <FetchData token={sessionStorage.getItem("accessToken")}/> */}
                </>
              ) : (
                ""
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
