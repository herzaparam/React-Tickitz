import React from 'react';
import style from './pagination.module.css';

function Pagination({ postPerPage, totalPost, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }
  const slicing = () => {
      let firstIndex = 0;
      let lastIndex = 5;
    //   if(currentPage === lastIndex) {
    //     lastIndex = lastIndex + 5
    //     firstIndex = firstIndex + 5
    //   } 
    return pageNumbers?.slice(firstIndex, lastIndex);
  };
  const slicedPageNumber = slicing();

  return (
    <nav>
      <ul
        className={[
          ['justify-content-center'],
          ['pagination'],
          style['pagination-style'],
        ].join(' ')}
      >
        <li className="page-item">
          <button
            onClick={() => paginate(currentPage - 1)}
            className="page-link"
            disabled={currentPage === 1}
          >
            prev
          </button>
        </li>
        {slicedPageNumber?.map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number && 'active'}`}
          >
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={() => paginate(currentPage + 1)}
            className="page-link"
            disabled={currentPage === pageNumbers.length}
          >
            next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
