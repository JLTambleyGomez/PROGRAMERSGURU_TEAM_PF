import React from 'react';
import styles from "./HomePage.module.css";
import Cards from '../../datos/Cards/Cards';
import { useState, useEffect } from 'react';

const HomePage = () => {


  const courses = [
    {
      title: "Introducción a la programación",
      description: "Aprende los conceptos básicos de la programación",
      rating: 4.5,
      free: true,
      language: "Español"
    },
    {
      title: "Web Development 101",
      description: "Learn the fundamentals of web development",
      rating: 4.2,
      free: false,
      language: "English"
    },
    {
      title: "Data Science for Beginners",
      description: "Get started with data science and analytics",
      rating: 4.7,
      free: true,
      language: "English"
    },
    {
      title: "Aprende Photoshop desde cero",
      description: "Descubre cómo utilizar Photoshop para editar imágenes",
      rating: 4.1,
      free: true,
      language: "Español"
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Learn the basics of machine learning algorithms",
      rating: 4.3,
      free: false,
      language: "English"
    },
    {
      title: "Desarrollo de aplicaciones móviles",
      description: "Aprende a crear aplicaciones móviles para Android e iOS",
      rating: 4.6,
      free: true,
      language: "Español"
    },
    {
      title: "Introduction to Data Analytics",
      description: "Learn the foundations of data analytics",
      rating: 4.4,
      free: true,
      language: "English"
    },
    {
      title: "Diseño de interfaces de usuario",
      description: "Aprende a diseñar interfaces de usuario atractivas",
      rating: 4.2,
      free: false,
      language: "Español"
    },
    {
      title: "Python for Data Science",
      description: "Master Python programming for data analysis",
      rating: 4.8,
      free: true,
      language: "English"
    },
    {
      title: "Fundamentos de desarrollo web",
      description: "Aprende los fundamentos del desarrollo web",
      rating: 4.2,
      free: true,
      language: "Español"
    },
    {
      title: "JavaScript avanzado",
      description: "Domina los conceptos avanzados de JavaScript",
      rating: 4.5,
      free: false,
      language: "Español"
    },
    {
      title: "Data Visualization with D3.js",
      description: "Create interactive data visualizations with D3.js",
      rating: 4.7,
      free: true,
      language: "English"
    },
    {
      title: "Programación orientada a objetos",
      description: "Aprende los principios de la programación orientada a objetos",
      rating: 4.3,
      free: true,
      language: "Español"
    },
    {
      title: "Front-End Web Development",
      description: "Build modern and responsive websites",
      rating: 4.6,
      free: false,
      language: "English"
    },
    {
      title: "Introducción a la inteligencia artificial",
      description: "Descubre los conceptos básicos de la inteligencia artificial",
      rating: 4.1,
      free: true,
      language: "Español"
    },
    {
      title: "Android App Development",
      description: "Create Android apps using Java and Kotlin",
      rating: 4.5,
      free: true,
      language: "English"
    },
    {
      title: "Desarrollo de videojuegos con Unity",
      description: "Aprende a crear videojuegos utilizando Unity",
      rating: 4.4,
      free: false,
      language: "Español"
    },
    {
      title: "Introduction to Artificial Neural Networks",
      description: "Understand the basics of artificial neural networks",
      rating: 4.3,
      free: true,
      language: "English"
    },
    {
      title: "Programación en C++",
      description: "Aprende a programar en C++ desde cero",
      rating: 4.2,
      free: true,
      language: "Español"
    },
    {
      title: "Responsive Web Design",
      description: "Create mobile-friendly and responsive websites",
      rating: 4.7,
      free: false,
      language: "English"
    }
  ];

  /*const [currentPage, setCurrentPage] = useState([]);
  const [actualPage, setActualPage] = useState(1);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(courses.length / itemsPerPage);

  useEffect(() => {
    const startIndex = (actualPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentPage(courses.slice(startIndex, endIndex));
  }, [courses, actualPage]);
  
  const handlePageChange = (page) => {
    setActualPage(page);
  };*/

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirtCourse = indexOfLastCourse - coursesPerPage;
  const currentAllCourses = courses.slice(indexOfFirtCourse, indexOfLastCourse);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber); 
  }

  const pageNumberCourses = [];
  for (let i = 1; i <= Math.ceil(courses.length / coursesPerPage); i++) {
    pageNumberCourses.push(i);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Homepage</h1>
      <div className={styles.pagination}>
        {/* {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                className={index + 1 === actualPage ? styles.activePage : ''}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))} */}
        {
          pageNumberCourses.map((number, index) => {
            return (
              <button key={index} className='pageBox' onClick={() => { paginate(number) }}>
                <div>
                  {number}
                </div>
              </button>
            )
          })
        }

      </div>
      <Cards courses = {currentAllCourses} /> {/*courses = {currentPage} */}
    </div>
  );
}

export default HomePage;