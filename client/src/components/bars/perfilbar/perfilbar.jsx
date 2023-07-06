import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dark_Mode } from "../../../Redux/actions";

import "./perfilbar.css";

const PerfilBar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const userimage =
    "https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664";

  const handleDarkMode = () => {
    dispatch(Dark_Mode(!darkMode));
  };

  return (
    <div className="accountOptionsWrapper">
      <div className="accountOptionsImage">
        <img src={userimage} alt="user image" className="image" />
      </div>

      <ul className="accountOptionsList">
        <li onClick={() => { /* acciones para Account */ }}>Account</li>
        <li onClick={() => { /* acciones para Courses */ }}>Courses</li>
        <button onClick={handleDarkMode}>
          Switch {darkMode ? "light" : "dark"} mode
        </button>
        <li onClick={() => { /* acciones para Sign out */ }}>Sign out</li>
      </ul>
    </div>
  );
};

export default PerfilBar;
