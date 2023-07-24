import React from "react";
import styles from "./GoogleButton.module.css";

function GoogleButton({ onClick }) {
  return (
    <button className={styles.button} type="button" onClick={onClick}>
      <div className={styles.iconWrapper}>
        <img
          className={styles.icon}
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="Google Icon"
        />
      </div>
      <p className={styles.btnText}><b>Sign in with Google</b></p>
    </button>
  );
}

export default GoogleButton;
