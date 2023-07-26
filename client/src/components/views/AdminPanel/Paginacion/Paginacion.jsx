import s from "./ObjectsList.module.css"

function Paginacion ({ numOfObjects, ObjectsPerPage, setCurrentPage, currentPage }) {
    
    const amountOfPages = Math.ceil(numOfObjects / ObjectsPerPage);
    const pageNums = [];
    for (let i = 1; i <= amountOfPages; i++) {
        pageNums.push(i);
    }

    const previous = (event) => {
        event.preventDefault()
        if (currentPage === 1) return 
        setCurrentPage(currentPage-1)
    } 

    const next = (event) => {
        event.preventDefault()
        if (currentPage === amountOfPages) return setCurrentPage(currentPage)
        console.log(currentPage)
        console.log(Number(+currentPage+1))

        setCurrentPage(+currentPage+1)
    }

    const specificPage = (event) => {
        event.preventDefault()
        setCurrentPage(event.target.value)
    }

    return (
        <nav className={s.pagination}>
            <li>
                <button  className={s.arrow} onClick={previous} disabled={+currentPage === 1}>
                    {"<"}
                </button >
                {pageNums.map((num) => (
                    <button
                        className={currentPage === num ? s.current : s.nocurrent}
                        onClick={specificPage}
                        key={num}
                        value={num}
                    >
                        {num}
                    </button>
                ))}
                <button className={s.arrow} onClick={next} disabled={+currentPage === +amountOfPages}>
                    {">"}
                </button>
            </li>
        </nav>
    );
}

export default Paginacion