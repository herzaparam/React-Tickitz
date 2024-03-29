import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getUser } from '../../../configs/redux/actions/user';

import MyButton from '../../base/Button';
import { tickitzpurpleimg, searchlogo } from '../../../assets/image';
import style from './navbar.module.css';
import axios from 'axios';
import Swal from 'sweetalert2';

function MyNavbar({ isLoggedIn }) {
  let history = useHistory();
  const dispatch = useDispatch();
  const urlImg = process.env.REACT_APP_API_IMG;

  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [authLogin, setAuthLogin] = useState(isLoggedIn);
  const [allFilms, setAllfilms] = useState([]);

  const { user, role } = useSelector((state) => state.userReducer);
  // const { allFilms } = useSelector(state => state.movieReducer)

  const handleShowSearch = (e) => {
    e.preventDefault();
    setAllfilms([])
    setShowSearch(!showSearch);
  };

  const handleLogOut = (e) => {
    localStorage.removeItem('token');
    setAuthLogin(false);
    dispatch({ type: 'LOG_OUT' });
    history.push('/');
  };

  useEffect(() => {
    if (user.email === '') {
      dispatch(getUser());
    }
  }, []);
  useEffect(() => {
    if (searchTerm !== '') {
      axios
        .get(
          `${process.env.REACT_APP_SEARCH_MOVIE_FREE_API}?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
        )
        .then((res) => {
          setAllfilms(res.data.results);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            return allFilms;
          }
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            timer: 1000,
            showConfirmButton: false,
          });
        });
    }
  }, [searchTerm]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={tickitzpurpleimg} alt="" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/allmovies"
              >
                Movies
              </Link>
            </li>
            <li className={[['nav-item'], style['disabled']].join(' ')}>
              <button disabled={true}>Cinemas</button>
            </li>
            <li className={[['nav-item'], style['disabled']].join(' ')}>
              <button disabled={true}>Buy Ticket</button>
            </li>
          </ul>
          <div className="nav-item dropdown">
            <button className={style['btn-loc-disable']} disabled={true}>
              Location
            </button>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <Link className="dropdown-item" to="#">
                  Jakarta
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#">
                  Surabaya
                </Link>
              </li>
            </ul>
          </div>

          <form className={`d-flex `}>
            {showSearch ? (
              <div className={style.dropdown}>
                <div className={style.search}>
                  <input
                    className={`dropdown-header form-control me-2 ${style.inputSearch}`}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                    }}
                  />
                  <button
                    className="btn btn-outline-light"
                    type="submit"
                    onClick={handleShowSearch}
                  >
                    <img src={searchlogo} alt="" />
                  </button>
                </div>
                <div className={style.dropdownContent}>
                  {allFilms?.slice(0, 6).map((film, key) => {
                    return (
                      <div className={`${style.film}`} key={key}>
                        <img
                          src={`${process.env.REACT_APP_BASE_URL_IMAGE}${film.poster_path}`}
                          alt=""
                        />
                        <p>{film.original_title ?? ''}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <button
                className="btn btn-outline-light"
                type="submit"
                onClick={handleShowSearch}
              >
                <img src={searchlogo} alt="" />
              </button>
            )}
          </form>
          <div className="nav-item dropdown">
            {user.email === '' ? (
              <MyButton
                className="btn-order"
                title="Sign Up"
                onClick={(e) => history.push('/signup')}
              />
            ) : (
              <div>
                <button
                  className={`nav-link ${style.btnProfile}`}
                  to="#"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={`${urlImg}${user.image}`} alt="" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={() => {
                        history.push('/profile');
                      }}
                    >
                      Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      to="#"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;
