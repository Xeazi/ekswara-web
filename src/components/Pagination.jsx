import React from "react";

export const Pagination = ({ eventsPerPage, totalEvents, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalEvents / eventsPerPage); i++) {
        pageNumbers.push(i);
    }
    if (pageNumbers.length <= 1) return null;

    return (
        <nav className="mt-10 mb-4">
        <ul className="flex justify-center items-center space-x-1 sm:space-x-2">
            <li>
            <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}>
                &lt;
            </button>
            </li>
            {pageNumbers.map((number) => (
            <li key={number}>
                <button
                onClick={() => paginate(number)}
                className={`px-3 py-2 leading-tight border border-gray-300 transition-colors ${
                    currentPage === number
                    ? "text-white bg-green-600 border-green-600 hover:bg-green-700 font-semibold"
                    : "text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700"
                } ${
                    pageNumbers.length > 5 &&
                    (number > currentPage + 2 || number < currentPage - 2) &&
                    number !== 1 &&
                    number !== pageNumbers.length
                    ? "hidden sm:inline-flex"
                    : "inline-flex"
                } rounded-md`} 
                >
                {number}
                </button>
            </li>
            ))}
            <li>
            <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
                className={`px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}>
                &gt;
            </button>
            </li>
        </ul>
        </nav>
    );
    };
