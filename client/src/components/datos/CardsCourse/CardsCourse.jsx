import styles from "./CardsCourse.module.css";
import CardCourse from "../CardCourse/CardCourse";
import InfiniteScroll from "react-infinite-scroll-component"
import { useEffect, useState} from "react";

//_________________________module_________________________
function CardsCourse ( { allCourses } ) {
    console.log(allCourses)

 //scroll infinito
 const [newCourses, setNew]= useState([])
 const [noMore, setNoMore]= useState(true)
 const [turno, setTurno]= useState(1);
 let numPeticiones= Math.ceil(allCourses.length/3);
 
 console.log(newCourses)

 function addCards(){
     if(turno == numPeticiones){
        let inicio= (turno* 3)-3;
        let fin= allCourses.length-1;
        let showedCourses=allCourses.slice(inicio,fin);
        setNew([...newCourses, ...showedCourses])
        setNoMore(false)
        console.log(noMore)
        return
     }

    let inicio= (turno * 3)-3;
     let fin= (turno*3 )-1;
     let showedCourses=allCourses.slice(inicio,fin);
     
    setNew([...newCourses, ...showedCourses])
     setTurno(turno+1);
     console.log(turno)
   
     return
 }
 console.log(noMore)

 useEffect(()=>{
    if(allCourses.length){
        setTurno(1)
        setNew([]);
        setNoMore(true)
    addCards();
}
    //;
  
 },[allCourses])

    //component:
    return (
            <InfiniteScroll 
            dataLength={newCourses.length}
            next={addCards}
            hasMore={noMore}
            loader={<h4>Loading...</h4>}
            endMessage={
            <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
                </p>}
            className={styles.cardsCourseComponent}
               >
            {
                newCourses?.map((course, index) => {
                    return (
                        <CardCourse
                            key={index}
                            id={course.id}
                            title={course.title}
                            description={course.description}
                            meanRating={course.meanRating}
                            isFree={course.isFree}
                            language={course.language}
                            imageURL={course.imageURL}
                            courseUrl={course.courseUrl}
                            released ={course.released}
                        />
                    )
                })
            }
            </InfiniteScroll>
    )
}

export default CardsCourse;