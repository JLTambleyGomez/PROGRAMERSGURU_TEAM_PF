import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./CoursesDetails.module.css";

const CourseDetails = () => {
  //global states:
  const course = useSelector((state) => state.allCourses);
  const favorites = useSelector((state) => state.favorites);
  const dark = useSelector((state) => state.darkMode);

  //states:
  const [isFav, setFav] = useState(false);

  const { id } = useParams();
  console.log(id);

  //esto es para renderizar y dar funcion a un boton que agrege un favorito
  const postFavoritesRequest = async () => {
    const ids = { idCourse: id, idUser: 1 };
    await axios.post("http://localhost:3001/favorite", ids);
    setFav(true);
  };

  const deleteFavoritesRequest = async () => {
    await axios.delete(`http://localhost:3001/favorite/${id}`);
    setFav(false);
  };
  console.log(favorites);
  console.log(isFav);

  // optimize el código eliminando la función getDetails
  // y llamando directamente a
  // dispatch(get_courses_by_id(id)) dentro del useEffect.
  //life-cycles:
  useEffect(() => {
    getDetails();
    favorites?.forEach((fav) => {
      console.log(fav);
      if (fav.id == id) setFav(true);
    });
    return async () => {
      await dispatch(clearMessage());
      await dispatch(clearCourses());
      await dispatch(get_courses_all());
    };
  }, [dispatch]);

  // //useEffect(()=>{
  //     //dispacth o axios directo para obtener el curso por medio del id
  //     setCourse(curso)
  // },[])/

  //component:
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{ejemplo.title}</h1>
      <img src={ejemplo.imageURL} className={styles.imagen} />
      <h2>About: {ejemplo.description}</h2>
      <h2>Ratings: {ejemplo.rating}</h2>
      <h3>Release date: {ejemplo.released}</h3>
      <h2>Categories:</h2>
      <ul>
        {ejemplo.categories?.map((cat) => {
          return (
            <li>
              <h4>{cat}</h4>
            </li>
          );
        })}
      </ul>
      <h4>Language: {ejemplo.language}</h4>
      <h2>Price: </h2>
      {ejemplo.isFree === true ? (
        <h3>This course is free</h3>
      ) : (
        <h3>This course requires payment</h3>
      )}
      <h2>
        visitar: <a href={ejemplo.courseUrl}>entrar aquí</a>
      </h2>
    </div>
  );
};

export default CourseDetails;
