import React from "react";

function Pagination({ nPages, currentPage, setCurrentPage}) {
    
    // arrays
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    // functions
    const nextPage = () => {
        if (currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if (currentPage !== nPages) 
            setCurrentPage(currentPage - 1)
    }

    return (
        <div className='pagination'>
            <nav className="paginationWrapper">
            <ul className="pagination__list">

                {currentPage > pageNumbers[1] ? 
                (
                    <>
                    <li className="pagination__item">
                        <a className="pagination__link pagination__link--first"
                        onClick={prevPage}
                        href="#">
                            Previous
                        </a>
                    </li>

                    <li key={pageNumbers[0]} 
                    className={`pagination__item`} >
                        <a onClick={() => (setCurrentPage(pageNumbers[0]))} 
                            className={`pagination__link`}
                            href="#">
                            {pageNumbers[0]}
                        </a>
                    </li>

                    {pageNumbers.length >= 5 && currentPage !== 1 && (
                    <li className="pagination__item">
                        <a className="pagination__link pagination__link--first"
                        >
                            ...
                        </a>
                    </li>
                    )}
                </>
                ) : 
                (
                    <li className="pagination__item">
                        <a className="pagination__link pagination__link--first"
                        onClick={prevPage}
                        href="#">
                            Previous
                        </a>
                    </li>
                )
                }


                {pageNumbers.slice(
                    
                    
                    
                    (currentPage < 2 ? currentPage-1 : currentPage-2),

                    (currentPage > (pageNumbers.length-2) ? currentPage : currentPage+1)
                    
                    
                    
                    ).map(pageNum => (
                    
                    <li key={pageNum} 
                    className={`pagination__item ${currentPage == pageNum ? "active" : ""}`} >
                        <a onClick={() => (setCurrentPage(pageNum))} 
                            className={`pagination__link ${currentPage == pageNum ? "pagination__link--active" : "pagination__link"}`}
                            href="#">
                            {pageNum}
                        </a>
                    </li>
                ))}
                {currentPage !== pageNumbers.length ? 
                (
                    <>
                    {currentPage <= pageNumbers.length-3 && (
                    <li className="pagination__item">
                        <a className="pagination__link pagination__link--last"
                        >
                            ...
                        </a>
                    </li>
                    )
                    }
                    <li key={pageNumbers.length} 
                    className={`pagination__item`} >
                        <a onClick={() => (setCurrentPage(pageNumbers.length))} 
                            className={`pagination__link`}
                            href="#">
                            {pageNumbers.length}
                        </a>
                    </li>
                    <li className="pagination__item">
                    <a className="pagination__link pagination__link--last"
                    onClick={nextPage}
                    href="#">
                        Next
                    </a>
                    </li>
                    </>
                ) : (
                    <li className="pagination__item">
                    <a className="pagination__link pagination__link--last"
                    onClick={nextPage}
                    href="#">
                        Next
                    </a>
                    </li>
                )
                }

                
            </ul>
            </nav>
        </div>
    )
}

export default Pagination;