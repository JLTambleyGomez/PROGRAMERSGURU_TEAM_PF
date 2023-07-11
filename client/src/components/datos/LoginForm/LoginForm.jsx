// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import app from "../../../config/firebase";
// import "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getloged } from "../../../Redux/actions";
import validate from "./validate";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import "../../../config/firebase-config";

import styles from "./LoginForm.module.css";

//_________________________module_________________________
function LoginForm() {
  const dispatch = useDispatch();

  //states:
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showButton, setShowButton] = useState(true);
  // const [auth, setAuth] = useState(false);
  //   const access = useSelector((state) => state.access)

  // const loginWithGoogle = () => {
  //     const auth = getAuth(app);
  //     const provider = new GoogleAuthProvider();

  //     signInWithPopup(auth, provider)
  //       .then((userCred) => {
  //         console.log(userCred);
  //         if (userCred) {
  //           setAuth(true);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  //----------------------------------------------------
  const [authorizedUser, setAuthorizedUser] = useState(
    false || sessionStorage.getItem("accessToken")
  );
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const auth = getAuth();

  function signInwithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if (user) {
          user.getIdToken().then((tkn) => {
            // set access token in session storage
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return [errorCode, errorMessage, email, credential];
      });
  }
  const navigate = useNavigate();
  function logoutUser() {
    signOut(auth)
      .then(() => {
        // clear session storage
        sessionStorage.clear();
        setAuthorizedUser(false);
        // window.location.replace("/");
        navigate("/");
        alert("Logged Out Successfully");
      })
      .catch((error) => {
        // An error happened.
        alert(error);
      });
  }
  //-----------------------------------------------------------
  const [userData, setUserData] = useState({
    id: "",
    name: "",
    nickName: "",
    image: "",
    email: "",
    password: "",
  });
  const fetchData = async (token) => {
    const response = await axios.get("http://localhost:3001/loginWithGoogle", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { user_id, name, picture, email } = response.data.userData;
    setUserData({
      ...userData,
      id: user_id,
      name: name,
      nickName: name.split(" ")[0],
      image: picture,
      email: email,
      password: token,
    });
    console.log(email);
  };
  let token = sessionStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, []);

  //-------------------------------------------------------------------
  //   const [userData, setUserData] = useState({
  //     email: "",
  //     password: "",
  //   });

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

  const handleSubmit = (event) => {
      event.preventDefault();

      dispatch(getloged(userData));
      access && navigate('/HomePage');
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
              <button className={styles.button} type="submit" onClick={signInwithGoogle}>
                Entrar con Google
              </button>
              {authorizedUser && navigate("/HomePage")}
              {/* {auth ? (
                                navigate("/HomePage")) : 
                                
                                <button onClick ={loginWithGoogle}>Sign in with Google</button>
                            } */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
