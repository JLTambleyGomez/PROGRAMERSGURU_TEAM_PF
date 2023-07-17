import { useState } from "react";
import styles from "./LoginForm.module.css";
import validate from "./validate";
import styles from "./LoginForm.module.css";
import signInwithGoogle from "../../../user/signInWithGoogle";
import signIn from "../../../user/signIn";

//_________________________module_________________________
function LoginForm() {
  // const dispatch = useDispatch()
  //states:
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleOnchange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
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
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      {showButton && (
        <button onClick={handleToggleForm} className={styles.openButton}>
          Ingresar
        </button>
      )}
      {showForm && (
        <div className={styles.container}>
          <div className={styles.form}>
            <button onClick={handleCloseForm} className={styles.closeButton}>
              <span className={styles.closeIcon}>x</span>
            </button>
            <form onSubmit={handleSubmit}>
              <h1 className={styles.title}>BIENVENIDO</h1>
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

              <button onClick={() => setPasswordVisible(!passwordVisible)}>
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

              <button type="submit">Submit</button>

              <hr />
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
