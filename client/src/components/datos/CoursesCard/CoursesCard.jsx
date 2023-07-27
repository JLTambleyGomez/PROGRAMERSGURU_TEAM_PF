import s from "./CoursesCard.module.css";
import CourseCard from "../CourseCard/CourseCard";
import { useEffect, useState, useRef } from "react";
import { useSelector,useDispatch} from "react-redux";
import theme from "../../../theme/theme";

//_________________________module_________________________
function CoursesCard () {
 
    //global state:
    const allCourses = useSelector((state) => state.courses) ? useSelector((state) => state.courses) : [];

    //states:
    const [currentPage, setCurrentPage] = useState(1);

    const coursesPerPage = 6
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentAllCourses = allCourses.slice(indexOfFirstCourse, indexOfLastCourse);
    // indice:
    const pageNumbers = [];
    (() => {
        for (let i = 1; i <= Math.ceil(allCourses.length / coursesPerPage); i++) {
            pageNumbers.push(i);
        }
    })()

    //life-cycles:
    useEffect(() => {
        //retorna a la pagina 1 cada vez que se actualiza el array.
        if (allCourses.length < coursesPerPage) setCurrentPage(1);


    }, [allCourses])

// ____________________

    //scroll infinito
    // const allCourses= useSelector((state)=>state.courses);

    // const [More, setMore]= useState(true)
    // const [turno, setTurno]= useState(1); // tal vez cambiar a 0?
    // const [newCourses, setNew]= useState([])
    // let numPeticiones = Math.ceil(allCourses.length/6);


    // function addMore(){
    //     if(turno <= numPeticiones) {
    //         addCards()
    //         setMore(true);
    //         setTurno(turno+1);
    //         console.log("ta bien")
    //     }else if(turno > numPeticiones){
    //         setMore(false)
    //         console.log(More)
    //         console.log("mal");
    //     }
    // }

    // function addCards(){
    //     if(turno == numPeticiones){
    //         let inicio= (turno* 6)-6;
    //         let fin= allCourses.length;
    //         let showedCourses=allCourses.slice(inicio,fin);
    //         setNew([...newCourses, ...showedCourses])
    //         console.log("ultimo add")
    //         return
    //     }
    //       let inicio= (turno * 6)-6;
    //       let fin= (turno* 6 );
    //       let showedCourses=allCourses.slice(inicio,fin);

    //     setNew([...newCourses, ...showedCourses])
        
    //     console.log("siguietne")//2
    //     console.log(newCourses)
    //     return
    // }

    // console.log(turno)//1
    // console.log(More)


    //life-cycles:
    // useEffect(()=>{
    //     if(allCourses.length){
    //         console.log("inicio");
    //         addMore();
    // }},[])

    // useEffect(()=>{
    //     if(newCourses.length){
    //         setMore(true)
    //         allCourses.length && setNew([...allCourses.slice((turno * 6)-6,(turno*6 ))]);
    //         setTurno(1);
    //         console.log("useefce")
    //     }
    // }, [allCourses])


    // const uniqueCourses = Array.from(new Set(newCourses.map((course) => course.id)))
    // .map((id) => newCourses.find((course) => course.id === id));
//____________

    //component:
    return (
        <div>
            <div className={s.paginado}>
                <h2>Cursos encontrados : {allCourses.length}</h2>
            </div>
            <div className={s.coursesBox}>
                {
                    currentAllCourses ? currentAllCourses.map((course, index) => {
                        return (
                            <CourseCard
                                key={index}
                                id={course?.id}
                                title={course?.title}
                                meanRating={course?.meanRating}
                                isFree={course?.isFree}
                                language={course?.language}
                                courseUrl={course?.courseURL}
                                released={course?.released}
                                description={course?.description}
                                imageURL={course?.imageURL}
                            />
                        )
                    }) : (
                        <p>REGISTRATE</p>
                    )
                }
            {/* <InfiniteScroll 
                dataLength={uniqueCourses.length}
                next={addMore}
                hasMore={More}
                loader={<h6>Loading...</h6>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Eso es todo amigos!</b>
                    </p>}
                className={s.component}
                >
                {
                    uniqueCourses.map((course, index) => {
                        return (
                            <CourseCard
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

                </InfiniteScroll> */}
                
            </div>
            <div className={`${s.paginado} ${s[theme("paginado")]}`}>
                {
                    pageNumbers.map((number, index) => {
                        return (
                            <a key = {index} href = '#!' onClick = {() => {setCurrentPage(number)}}>
                                <div className={s.numberBox}>
                                    {number}
                                </div>
                            </a>
                        )
                    })
                }

            </div>
        </div>
    )
}

export default CoursesCard;