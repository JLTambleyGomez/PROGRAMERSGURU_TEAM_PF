
function ObjectListUsers ({objects, name}) {
    return (
        <div>
        <div>
            <div>Nombre</div>
            <div>Email</div>
            <div>Banneado</div>
            <div>Administrador</div>
            <div>Dirección</div>
            <div></div>
            <div></div>
            <div></div>
        </div>
<div>
                {objects.slice(firstObj, lastObj).map((obj) => {
                    return (
                        <div key={obj.id}>
                            <div >
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
       
    )
}

export default ObjectListUsers; 