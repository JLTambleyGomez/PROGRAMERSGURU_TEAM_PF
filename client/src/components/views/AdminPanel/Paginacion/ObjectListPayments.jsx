import styles from "../Tecnology.module.css";
import { useState } from "react";
import Paginacion from "./Paginacion";
import s from "./Payments.module.css";

export default function ObjectsListPayments({ objects, titulo }) {
    const [currentPage, setCurrentPage] = useState(1);

    const filteredObjects = objects.filter(obj => obj?.User).sort((a,b)=> {
        const date_a = new Date(a.date)
        const date_b = new Date(b.date)
        return date_b - date_a
    })
    const ObjectsPerPage = 6;
    const numOfObjects = objects.length;
    const lastObj = currentPage * ObjectsPerPage;
    const firstObj = lastObj - ObjectsPerPage;

    return (
        <div className={s.paginacion}>
            <div className={s.titulo}>{titulo}</div>

            <div className={s.header}>
                <div className={s.title}>Nombre</div>
                <div className={s.email}>Email</div>
                <div className={s.date}>Fecha</div>
                <div className={s.status}>Estado</div>
                <div className={s.total}>Total</div>
            </div>

            <>
                {Array.isArray(filteredObjects) && filteredObjects?.slice(firstObj, lastObj).map((obj) => {
                    return (
                        <>{obj?.User?.name ?
                        (<div key={obj.id} className={s.fila}>
                            <div key={obj.id} className={s.fila}>
                                <div className={s.title}>{obj?.User?.name}</div>
                                <div className={s.email}>{obj?.User?.email}</div>
                                <div className={s.date}>{obj?.date}</div>
                                <div className={s.status}>
                                    {obj?.status === "fullfiled" ||
                                    obj?.status === "approved"
                                        ? "Completado"
                                        : "Rechazado"}
                                </div>
                                <div className={s.total}>${obj?.totalPrice}</div>
                            </div>
                        </div>)
                        : null
                        }</>
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
