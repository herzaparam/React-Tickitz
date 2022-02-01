import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../configs/redux/actions/user';
import MyNavbar from '../../components/module/navbar';
import style from './view.module.css';
import LoadingAnimation from '../../components/module/LoadingAnimation';
import Pagination from '../../components/module/Pagination';
import axios from 'axios';
import Swal from 'sweetalert2';

function ViewFilm() {
  const dispatch = useDispatch();
  const history = useHistory();

  // const { allFilms } = useSelector(state => state.movieReducer)
  const { user } = useSelector((state) => state.userReducer);
  const { loading } = useSelector((state) => state.movieReducer);

  const [currentPage, setCurrentPage] = useState(1);
  // console.log('haha', currentPage);
  const [allFilms, setAllFilms] = useState([]);
  const [totalFilms, setTotalFilms] = useState(0);
  const [category, setCategory] = useState('upcoming');

  useEffect(() => {
    // dispatch(getMovie())
    if (user.email === '') {
      dispatch(getUser());
    }
    axios
      .get(
        `${process.env.REACT_APP_GET_MOVIE_FREE_API}/${category}?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      )
      .then((res) => {
        setAllFilms(res.data.results);
        setTotalFilms(res.data.total_results);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          timer: 1000,
          showConfirmButton: false,
        });
      });
  }, [category, currentPage]);

  //   useEffect(() => {
  //     if (category !== '' || genre !== '') {
  //       axios
  //         .get(
  //           `${process.env.REACT_APP_API_TICKITZ}movies/all-sort/?category=${category}&genre=${genre}&page=1&perPage=50`
  //         )
  //         .then((res) => {
  //           setAllFilms(res.data.data);
  //         })
  //         .catch((err) => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops...',
  //             text: `cannot find flim with ${category} category and ${genre} genre`,
  //           });
  //         });
  //     }
  //   }, [category]);

  if (loading) {
    return <LoadingAnimation />;
  }
  const routeChangeById = (id) => {
    history.push(`/moviedetails/${id}`);
  };
  // const indexOfLastPost = currentPage * postPerPage;
  // const indexOfFirsPost = indexOfLastPost - postPerPage;
  // const currentFilm = allFilms?.slice(indexOfFirsPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <MyNavbar />
      <div className={style['sorting']}>
        <select
          className={style['inpt-category']}
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="upcoming">Upcoming</option>
          <option value="top_rated">Top Rated</option>
          <option value="popular">Popular</option>
          <option value="now_playing">Now Playing</option>
          <option value="latest">Latest</option>
        </select>
      </div>
      <div
        className={[['container'], ['bg-light'], style['card-container']].join(
          ' '
        )}
      >
        {allFilms?.map((item) => (
          <div className={`card ${style.cardFilm}`} key={item.id}>
            <img
              src={`${process.env.REACT_APP_BASE_URL_IMAGE}${item.poster_path}`}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
              <h5 className={style['card-title']}>
                {item.title?.length > 23
                  ? item.title.substring(0, 23) + '...'
                  : item.title}
              </h5>
              <p className={style['card-text']}>{item.genre}</p>
              <button
                className={style.button}
                onClick={(e) => routeChangeById(item.id)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <Pagination postPerPage={20} totalPost={totalFilms} paginate={paginate} currentPage={currentPage} />
    </div>
  );
}

export default ViewFilm;
