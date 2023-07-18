import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  get_categories,
  clearCourses,
  clearMessage,
  get_courses_all,
  post_course,
  delete_course,
  put_course
} from "../../../Redux/actions";
import styles from "./AdminPanel.module.css";

function Courses() {
  // global state:
  const categories = useSelector((state) => state.categories);
  const message = useSelector((state) => state.message);
  const dark = useSelector((state) => state.darkMode);
  const courses = useSelector((state) => state.allCourses);

  // const:
  const dispatch = useDispatch();

  // states:
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    imageURL: "",
    courseUrl: "",
    rating: 0,
    released: "",
    isFree: false,
    language: "",
    categories: [],
  });
  const [modificarCourse, setModificarCourse] = useState(false)

  //PARA PODER MODIFICAR EL CURSO
  const [modified, setModified] = useState(false)

  const [modifCourse, setModifCourse] = useState({
    title: "",
    description: "",
    imageURL: "",
    courseUrl: "",
    rating: 0,
    released: "",
    isFree: false,
    language: "",
    categories: []
  })

  // functions:
  const theme = (base) => {
    const suffix = dark ? "dark" : "light";
    return `${base}-${suffix}`;
  };

//DESPACHA LA ACTION PARA HACER EL PUT
  const handleCoursePut = (event) => {
    event.preventDefault();
    dispatch(put_course(modifCourse))
    dispatch(get_courses_all());

  }

  //modificar curso
  const handleModificarCurso  = (event) => {
    setModificarCourse(true)

  }


  const handleCourseChange = (event) => {
    const { name, value } = event.target;
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleCategorySelection = (event) => {
    const selectedCategories = Array.from(event.target.selectedOptions, (option) => ({
      id: option.value,
    }));
    setNewCourse((prevCourse) => ({
      ...prevCourse,
      categories: selectedCategories,
    }));
  };

  const handleDeleteCourse = async (id) => {
    try {
      await dispatch(delete_course(id));
      await dispatch(get_courses_all());
    } catch (error) {
      console.log("error");
    }
  };

  const handleCoursePost = (event) => {
    event.preventDefault();
    dispatch(post_course(newCourse))
      .then(() => {
        setNewCourse({
          title: "",
          description: "",
          imageURL: "",
          courseUrl: "",
          rating: 0,
          released: "",
          isFree: false,
          language: "",
          categories: [],
        });
        dispatch(get_courses_all());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // life-cycles:
  useEffect(() => {
    dispatch(clearMessage());
    dispatch(get_categories());
    dispatch(get_courses_all());

    return () => {
      dispatch(clearMessage());
      dispatch(clearCourses());
    };
  }, [dispatch]);

  // component:
  return (
    <div className={`${styles.component} ${styles[theme("component")]}`}>
      <div className={styles.contain}>
        <div>
        </div>
      
          <section className={`${styles.Panel}`}>
            <form className={`${styles.coursesForm}`}>
              <h2>Nuevo Curso</h2>
              <div className={`${styles.h1}`}>
                <label>Título:</label>
                <input type="text" name="title" value={newCourse.title} onChange={handleCourseChange} />
                {/* {modified ? (<div></div> : (<div></div>)} */}
                
              </div>

              <div className={`${styles.h1}`}>
                <label>Descripción:</label>
                <textarea name="description" value={newCourse.description} onChange={handleCourseChange} />
              </div>

              <div className={`${styles.h1}`}>
                <label>URL de la imagen:</label>
                <input type="text" name="imageURL" value={newCourse.imageURL} onChange={handleCourseChange} />
              </div>

              <div className={`${styles.h1}`}>
                <label>URL del curso:</label>
                <input type="text" name="courseUrl" value={newCourse.courseUrl} onChange={handleCourseChange} />
              </div>

              <div className={`${styles.h1}`}>
                <label>Rating:</label>
                <input type="number" name="rating" value={newCourse.rating} onChange={handleCourseChange} />
              </div>

              <div className={`${styles.h1}`}>
                <label>Fecha de lanzamiento:</label>
                <input type="date" name="released" value={newCourse.released} onChange={handleCourseChange} />
              </div>

              <div className={`${styles.h1}`}>
                <label>Es gratuito:</label>
                <input type="checkbox" name="isFree" checked={newCourse.isFree} onChange={handleCourseChange} />
              </div>

              <div className={`${styles.h1}`}>
                <label>Idioma:</label>
                <input type="text" name="language" value={newCourse.language} onChange={handleCourseChange} />
              </div>

              <div className={`${styles.h1}`}>
                <label>Categorías:</label>
                <select multiple name="categories" onChange={handleCategorySelection}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={handleCoursePost}>Postear curso</button>
            </form>

            <div className={`${styles.coursesContainer}`}>
              <h1>Courses</h1>
              <div className={`${styles.coursesBox}`}>
                {courses.map((course) => (
                    <div className={`${styles.course}`} key={course.id}>
                      <button onClick={handleModificarCurso}>Modificar Curso</button>
                      <p>ID: {course.id}</p> {course.title}
                      <p>Fecha De Lanzamiento {course.released} </p>
                      <button onClick={() => handleDeleteCourse(course.id)}>X</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

        <div></div>
      </div>
    </div>
  );
}

export default Courses;
