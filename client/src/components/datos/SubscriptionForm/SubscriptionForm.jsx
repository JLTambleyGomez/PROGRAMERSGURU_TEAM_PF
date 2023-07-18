import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./SubscriptionForm.module.css";
import validation from "./validation";
// import { getloged } from "../../../Redux/actions";
import { useNavigate } from "react-router-dom";

const SubscriptionForm = () => {
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const access = useSelector((state) => state.access);

  const [inputData, setInputData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseForm = () => {
    setShowForm(false);
    setShowButton(true);
  };
  const handleToggleForm = () => {
    setShowForm(!showForm);
    setShowButton(false);
  };

  const handleInputChange = (event) => {
    const valueInput = event.target.value;
    const nameInput = event.target.name;

    setInputData({ ...inputData, [nameInput]: valueInput });
    setError(validation({ ...inputData, [nameInput]: valueInput }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // dispatch(getloged(inputData));
    access && setShowForm(false);
  };

  return (
    <div className={styles.loginFormContainer}>
      {showButton && (
        <button onClick={handleToggleForm} className={styles.openButton}>
          Suscribite
        </button>
      )}
      {showForm && (
        <div className={styles.container}>
          <div className={styles.form}>
            {/* boton para cerrar */}
            <button onClick={handleCloseForm} className={styles.closeButton}>
              <span>x</span>
            </button>
            {/* formulario */}
            <form>
              <h1>Suscribite</h1>
              <label className={styles.label} htmlFor="name">
                Nombre de usuario:
              </label>
              <input
                className={styles.input}
                name="name"
                onChange={handleInputChange}
                value={inputData.name}
                placeholder="Ingrese el nombre de usuario.."
              ></input>
              {error.name && <p className={styles.error}>{error.name}</p>}
              <label className={styles.label}>Username:</label>
              <input
                className={styles.input}
                placeholder="Ingresa un username.."
                onChange={handleInputChange}
                value={inputData.username}
                name="username"
              ></input>
              {error.username && (
                <p className={styles.error}>{error.username}</p>
              )}
              <label className={styles.label} htmlFor="email">
                Email:
              </label>
              <input
                className={styles.input}
                name="email"
                onChange={handleInputChange}
                value={inputData.email}
                placeholder="Ingrese un email.."
              ></input>
              {error.email && <p className={styles.error}>{error.email}</p>}
              <label className={styles.label} htmlFor="password">
                Contraseña:
              </label>
              <input
                className={styles.input}
                name="password"
                onChange={handleInputChange}
                value={inputData.password}
                placeholder="Ingrese una contraseña.."
              ></input>
              {error.password && (
                <p className={styles.error}>{error.password}</p>
              )}
              <button className={styles.button} onClick={handleSubmit}>
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionForm;
