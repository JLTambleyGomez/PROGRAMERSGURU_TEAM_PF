import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { get_courses_by_id } from "../../../Redux/actions";

import styles from "./CoursesDetails.module.css";


//_________________________module_________________________
function CourseDetails () {
    
    const {id}= useParams();
    const course=useSelector((state)=>state.courseActual)
    const dispatch= useDispatch()

    
    
    async function getDetails(){
        dispatch(get_courses_by_id(id))
    }
    
    useEffect(()=>{
        getDetails();
     },[])

    //component:
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{course.title}</h1>
            <img src={course.imageURL} className={styles.imagen}/>
            <h2>About: {course.description}</h2>
            <h2>Ratings: {course.rating}</h2>
            <h3>Release date: {course.released}</h3>
            <h2>Categories:</h2>
                <ul>
                    {/*course.categories?.map((cat)=>{
                        return(
                            <li><h4>{cat}</h4></li>
                        )
                    })*/}
                </ul>
            <h4>Language: {course.language}</h4>
            <h2>Price: </h2>
                {
                    course.isFree === true ? (
                        <h3>This course is free</h3>
                    ) : (
                        <h3>This course requires payment</h3>
                    )
                }
            <h2>visitar: <a href={course.courseUrl}>entrar aquí</a></h2>
        </div>
    )
}

export default CourseDetails;