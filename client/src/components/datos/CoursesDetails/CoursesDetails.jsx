import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./CoursesDetails.module.css";


//_________________________module_________________________
function CourseDetails () {

    //const [course, setCourse]=useState({})

    //const:
    const {id}= useParams();
    console.log(id); // debe ir en useEffect

    const ejemplo = { title:"mi curso", description:"con juegos de azar y mujercuelas", imageURL:"https://th.bing.com/th/id/R.cb2bd88e73f7f722a655968d8cc766be?rik=EhZLjZqFstGTIg&pid=ImgRaw&r=0", courseUrl:"https://www.youtube.com/",
        rating:100, released:"30 de febrero", isFree:false, language:"Spanish/Español", categories:["Java","C++"] }


    // //useEffect(()=>{
    //     //dispacth o axios directo para obtener el curso por medio del id 
    //     setCourse(curso)
    // },[])/

    //component:
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{ejemplo.title}</h1>
            <img src={ejemplo.imageURL} className={styles.imagen}/>
            <h2>About: {ejemplo.description}</h2>
            <h2>Ratings: {ejemplo.rating}</h2>
            <h3>Release date: {ejemplo.released}</h3>
            <h2>Categories:</h2>
                <ul>
                    {ejemplo.categories?.map((cat)=>{
                        return(
                            <li><h4>{cat}</h4></li>
                        )
                    })}
                </ul>
            <h4>Language: {ejemplo.language}</h4>
            <h2>Price: </h2>
                {
                    ejemplo.isFree === true ? (
                        <h3>This course is free</h3>
                    ) : (
                        <h3>This course requires payment</h3>
                    )
                }
            <h2>visitar: <a href={ejemplo.courseUrl}>entrar aquí</a></h2>
        </div>
    )
}

export default CourseDetails;