import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_courses_by_id,clearCourses,clearMessage } from "../../../Redux/actions";
import axios from "axios";

import styles from "./CoursesDetails.module.css";


//_________________________module_________________________
function CourseDetails () {

    const dispatch= useDispatch()
    const course=useSelector((state)=>state.courseActual)
    const favorites= useSelector((state)=>state.favorites)
    const [isFav, setFav]= useState(false);
    let {id}= useParams();
    id=parseInt(id);


    async function getDetails(){
       
       dispatch(get_courses_by_id(id))
    }

    
    
    const postFavoritesRequest = async() => {
        const ids={idCourse:id, idUser:1}
        await axios.post("http://localhost:3001/favorite", ids)
        setFav(true)
    }
    const deleteFavoritesRequest = async() => {
        await axios.delete(`http://localhost:3001/favorite/${id}`);
        setFav(false)
    }

    useEffect(()=>{
        getDetails();
        favorites?.forEach((fav) => {
            console.log(fav)
      if (fav.id == id) {
         setFav(true); 
      }});
        return ()=>{  
                          // return ocupar para hacer algo en el desmontaje          
            dispatch(clearMessage()); // limpiar 
            dispatch(clearCourses()); }
     },[dispatch])

     
console.log(favorites)
console.log(isFav)

    //component:
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>{course.title}</h1>
            <img src={course.imageURL} className={styles.imagen}/>
         

            
        
           { isFav? (<button onClick={deleteFavoritesRequest}>Quitar de favoritos ❤️</button>)
         :(<button onClick={postFavoritesRequest}>Añadir a favoritos 🤍</button>)}

            <h2>visitar: <a href={course.courseUrl}>entrar aquí</a></h2>
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
           
        </div>
    )
}

export default CourseDetails;