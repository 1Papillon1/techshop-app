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
                <li className="pagination__item">
                    <a className="pagination__link pagination__link--first"
                    onClick={prevPage}
                    href="#">
                        Previous
                    </a>
                </li>
                {pageNumbers.map(pageNum => (
                    <li key={pageNum} 
                    className={`pagination__item ${currentPage == pageNum ? "active" : ""}`} >
                        <a onClick={() => (setCurrentPage(pageNum))} 
                            className="pagination__link"
                            href="#">
                            {pageNum}
                        </a>
                    </li>
                ))}
                <li className="pagination__item">
                    <a className="pagination__link pagination__link--last"
                    onClick={nextPage}
                    href="#">
                        Next
                    </a>
                </li>
            </ul>
            </nav>
        </div>
    )
}

export default Pagination;