import React from 'react'

const Pagination = ({ prev, next, onPrevious, onNext }) => {
    return (
        <div className="d-flex justify-content-center mt-2">
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${!prev ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" aria-label="Previous" onClick={onPrevious}>
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li className={`page-item ${!next ? 'disabled' : ''}`}>
                        <a className="page-link" href="#" aria-label="Next" onClick={onNext}>
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination