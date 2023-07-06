import React from "react";
import {useState} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./perfilbar.css"

//_______________________.module___________________________
const PerfilBar = () => {

    const navigate = useNavigate()

    const userimage = "https://www.prensalibre.com/wp-content/uploads/2019/05/1467646262_522853_1467646344_noticia_normal.jpg?quality=82&w=664"

  return  (
    <div className = "accountOptionsWrapper">

      <div className = "accountOptionsImage">
        <img src = {userimage} alt = "user image" className = 'image'/>
      </div>

        <ul className = "accountOptionsList">
          <li onClick = {() => {navigate('/profile')}}>Account</li>
          <li onClick = {() => {navigate('/coursepage')}}>Courses</li>
          <li>Switch light/dark mode</li>
          <li onClick = {() => {navigate('/')}}>Sign out</li>
        </ul>

    </div>
  )
};

export default PerfilBar;