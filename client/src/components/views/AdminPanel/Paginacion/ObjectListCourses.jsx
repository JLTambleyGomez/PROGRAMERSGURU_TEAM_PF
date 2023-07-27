import styles from "../Tecnology.module.css";
import { useState } from "react";
import Paginacion from "./Paginacion";
import s from "./Courses.module.css";

export default function ObjectsListCourses({ objects, titulo, handleModificarCurso, handleDeleteCourse }) {
    const [currentPage, setCurrentPage] = useState(1);

    const ObjectsPerPage = 6;
    const numOfObjects = objects.length;
    const lastObj = currentPage * ObjectsPerPage;
    const firstObj = lastObj - ObjectsPerPage;

    return (
        <div className={s.paginacion}>
            <div className={s.titulo}>{titulo}</div>

    
            <div className={s.header}>
                <div className={s.id}>ID</div>
                <div className={s.title}>Titulo</div>
                <div className={s.rating}>Rating</div>
                <div className={s.date}>Fecha de lanzamiento</div>
                <div className={s.actions}>Acciónes</div>
            </div>

            <>
                {objects.slice(firstObj, lastObj).map((obj) => {
                    return (
                        <div key={obj.id} className={s.fila}>
                            <div key={obj.id}></div>
                                <div className={s.id}>{obj.id}</div>
                                <div className={s.title}>{obj.title}</div>
                                <div className={s.rating}>{obj.meanRating}</div>
                                <div className={s.date}>{obj.released}</div>
                                <div className={s.actions}>
                                    <button onClick={() => handleModificarCurso(obj.id)}className={styles.modificarButton}><svg xmlns="http://www.w3.org/2000/svg" className={styles.mod} width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 21v-4a4 4 0 1 1 4 4h-4"></path><path d="M21 3a16 16 0 0 0 -12.8 10.2"></path><path d="M21 3a16 16 0 0 1 -10.2 12.8"></path><path d="M10.6 9a9 9 0 0 1 4.4 4.4"></path>
                                        </svg></button>
                                    <button onClick={() => handleDeleteCourse(obj.id)}className={styles.deleteButton}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className={styles.bin} viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                        </svg></button>
                                </div>
                        </div>
                    );
                })}
            </>
            <Paginacion
                ObjectsPerPage={ObjectsPerPage}
                numOfObjects={numOfObjects}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
}