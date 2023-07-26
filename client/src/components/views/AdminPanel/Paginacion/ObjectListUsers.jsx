import s from './Users.module.css'
import { useState } from "react";
import Paginacion from "./Paginacion";


function ObjectListUsers ({objects, hide_user,changeAdminUser}) {
    const [currentPage, setCurrentPage] = useState(1);
    
    
    const no = "https://www.svgrepo.com/show/421117/ban-banned-block.svg"
    const ok = "https://www.svgrepo.com/show/474927/ok.svg"
    const ObjectsPerPage = 6;
    const numOfObjects = objects.length;
    const lastObj = currentPage * ObjectsPerPage;
    const firstObj = lastObj - ObjectsPerPage;
    const sortedObjects = objects.sort((a,b) => a.email - b.email)

    return (
        <div className={s.component}>
        <div className={s.header}>
            <div className={s.picture}>Foto</div>
            <div className={s.name}>Nombre</div>
            <div className={s.email}>Email</div>
            <div className={s.admin}>Admin.</div>
            <div className={s.banned}>Oculto</div>
            <div className={s.actions}>Acciones</div>
        </div>
<>
                {sortedObjects?.slice(firstObj, lastObj).map((obj) => {
                    return (
                        <div key={obj.id} className={s.fila}>
                                <div className={s.picture}>
                                    <img src={obj.picture} alt="" />
                                </div>
                                <div className={s.name}>{obj.name}</div>
                                <div className={s.email}>{obj.email}</div>
                                <div className={s.admin}>{obj.admin ? <img src={ok} alt="no es admin" /> : <img src={no} alt="no es admin" />}</div>
                                <div className={s.banned}>{obj.banned ? <img src={ok} alt="baneado" /> : <img src={no} alt="no es admin" />}</div>

                                {!obj.admin && (
                                        <div className={s.actions}>
                                            <button onClick={() => hide_user(obj.email)}>
                                                {obj.banned ? "Desbanear" : "Banear"}
                                            </button>
                                            <button onClick={() => changeAdminUser(obj)}>
                                                Hacer Administrador
                                            </button>
                                          
                                        </div>
                                    )}
                                    {obj.admin && <p>Es un administrador!</p>}
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
       
    )
}

export default ObjectListUsers; 