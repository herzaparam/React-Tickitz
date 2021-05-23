import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMovie } from '../../configs/redux/actions/movie'
import { getUser } from '../../configs/redux/actions/user'
import MyNavbar from '../../components/module/navbar'
import style from './view.module.css'
import LoadingAnimation from '../../components/module/LoadingAnimation'
import Pagination from '../../components/module/Pagination'
import axios from 'axios'
import Swal from 'sweetalert2'

function ViewFilm() {
    const dispatch = useDispatch();
    const history = useHistory();

    // const { allFilms } = useSelector(state => state.movieReducer)
    const { user, isLoggedIn } = useSelector(state => state.userReducer)
    const { loading } = useSelector(state => state.movieReducer)

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    const [allFilms, setAllFilms] = useState([])

    useEffect(() => {
        // dispatch(getMovie())
        if (user.email === "") {
            dispatch(getUser())
        }
        axios.get(`${process.env.REACT_APP_API_TICKITZ}movies/all-movies/?page=&perPage=&keyword=`)
            .then((res) => {
                console.log(res);
                setAllFilms(res.data.data)
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                    timer: 1000,
                    showConfirmButton: false
                })
            })
    }, [])

    if (loading) {
        return <LoadingAnimation />
    }
    const routeChangeById = (id) => {
        history.push(`/moviedetails/${id}`)
    }

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirsPost = indexOfLastPost - postPerPage;
    const currentFilm = allFilms.slice(indexOfFirsPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div>
            <MyNavbar routeSignUp={() => this.routeChangeSignUp()} isLoggedIn={isLoggedIn} allFilm={allFilms} userImage={user.image} />
            <div className={[['container'], ['bg-light'], style['card-container']].join(' ')}>
                {currentFilm.map((item) =>
                    <div className={`card ${style.cardFilm}`}>
                        <img src={item.image} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className={style['card-title']}>{item.title.length > 13 ? item.title.substring(0, 13) + " . . . " : item.title}</h5>
                            <p className={style['card-text']}>{item.genre}</p>
                            <button className={style.button} onClick={(e) => routeChangeById(item.movie_Id)}>Book Now</button>
                        </div>
                    </div>
                )}

            </div>
            <Pagination postPerPage={postPerPage} totalPost={allFilms.length} paginate={paginate} />

        </div>
    )
}

export default ViewFilm
