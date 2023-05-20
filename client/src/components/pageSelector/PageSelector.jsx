import React from 'react';
import "./pageSelector.scss"
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../store/slices/gameSessionSlice.js";

const PageSelector = () => {

    const {currentPage, totalPages} = useSelector((state) => state.gameSession)

    const dispatch = useDispatch();

    const handleClick = (page) => {
        dispatch(setPage(page));
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            dispatch(setPage(currentPage - 1));
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            dispatch(setPage(currentPage + 1));
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        const maxVisiblePages = 5;
        let startPage = currentPage - Math.floor(maxVisiblePages / 2);
        let endPage = currentPage + Math.floor(maxVisiblePages / 2);

        if (startPage <= 0) {
            startPage = 1;
            endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <li
                    key={i}
                    onClick={() => handleClick(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <div>
            <ul className="page-selector">
                <li onClick={handlePrevClick} className={currentPage === 1 ? 'disabled' : ''}>
                    Prev
                </li>
                {renderPageNumbers()}
                <li onClick={handleNextClick} className={currentPage === totalPages ? 'disabled' : ''}>
                    Next
                </li>
            </ul>
        </div>
    );
};

export default PageSelector;