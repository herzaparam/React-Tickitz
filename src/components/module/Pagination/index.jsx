import React from 'react';
import style from './pagination.module.css';

let firstIndex = 0;
let lastIndex = 5;
function Pagination({ postPerPage, totalPost, paginate, currentPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }
  const changePage = (_number, _btn) => {
    if (_btn === 'number') {
      if (_number === lastIndex) {
        firstIndex = firstIndex + 3;
        lastIndex = lastIndex + 3;
      } else if (_number === firstIndex + 1 && firstIndex !== 0) {
        firstIndex = firstIndex - 3;
        lastIndex = lastIndex - 3;
      }
    } else if (_btn === 'prev') {
      if (_number === firstIndex && firstIndex !== 0) {
        firstIndex = firstIndex - 4;
        lastIndex = lastIndex - 4;
      }
    } else if (_btn === 'next') {
      if (_number > lastIndex) {
        firstIndex = firstIndex + 4;
        lastIndex = lastIndex + 4;
      }
    }
  };

  const reset = (val) => {
    if (val === 'reset') {
      firstIndex = firstIndex - firstIndex;
      lastIndex = lastIndex - lastIndex + 5;
      paginate(1);
    } else if (val === 'forward') {
      firstIndex = pageNumbers.at(-1) - 5;
      lastIndex = pageNumbers.at(-1);
      paginate(pageNumbers.at(-1));
    }
  };

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
            onClick={() => {
              paginate(currentPage - 1);
              changePage(currentPage - 1, 'prev');
            }}
            className="page-link"
            disabled={currentPage === 1}
          >
            prev
          </button>
        </li>
        {firstIndex >= 4 * 2 && (
          <li className="page-item">
            <button
              onClick={() => reset('reset')}
              className="page-link"
              disabled={currentPage === 1}
            >
              ...
            </button>
          </li>
        )}
        {pageNumbers?.slice(firstIndex, lastIndex).map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number && 'active'}`}
          >
            <button
              onClick={() => {
                paginate(number);
                changePage(number, 'number');
              }}
              className="page-link"
            >
              {number}
            </button>
          </li>
        ))}
        {lastIndex < pageNumbers.at(-1) && (
          <li className="page-item">
            <button
              onClick={() => reset('forward')}
              className="page-link"
              disabled={currentPage === pageNumbers.length}
            >
              ...
            </button>
          </li>
        )}
        <li className="page-item">
          <button
            onClick={() => {
              paginate(currentPage + 1);
              changePage(currentPage + 1, 'next');
            }}
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
