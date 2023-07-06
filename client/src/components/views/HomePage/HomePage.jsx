import React from 'react';
import styles from "./HomePage.module.css";
import Cards from '../../datos/Cards/Cards';
import { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux'

const HomePage = () => {

  const courses= useSelector((state)=> state.courses)
  const dispatch= useDispatch()
  

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 3;

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
        {
          pageNumberCourses.map((number, index) => {
            return (
              <button key={index} className={styles.paginationbutton} onClick={() => { paginate(number) }}>
                <div >
                  {number}
                </div>
              </button>
            )
          })
        }

      </div>
      <Cards courses = {currentAllCourses} /> 
    </div>
  );
}

export default HomePage;