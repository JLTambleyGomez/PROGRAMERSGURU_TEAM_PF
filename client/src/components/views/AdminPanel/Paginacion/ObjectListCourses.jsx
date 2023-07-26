import styles from "../Tecnology.module.css";
import { useState } from "react";
import Paginacion from "./Paginacion";
import s from "./ObjectsList.module.css";

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
                <div className={s.title}>Rating</div>
                <div className={s.title}>Fecha de lanzamiento</div>
                <div className={s.title}>Acciónes</div>
            </div>

            <div>
                {objects.slice(firstObj, lastObj).map((obj) => {
                    return (
                        <div key={obj.id} className={s.fila}>
                            <div key={obj.id}>
                                <div >{obj.id}</div>
                                <div >{obj.title}</div>
                                <div className={s.id}>{obj.meanRating}</div>
                                <div className={s.id}>{obj.released}</div>
                                <button onClick={() =>handleModificarCurso(obj.id)}>Modificar</button>
                                <button onClick={() =>handleDeleteCourse(obj.id)}>Eliminar</button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <Paginacion
                ObjectsPerPage={ObjectsPerPage}
                numOfObjects={numOfObjects}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </div>
    );
}