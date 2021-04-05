import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMovie } from '../../configs/redux/actions/movie'
import { getUser } from '../../configs/redux/actions/user'
import MyNavbar from '../../components/module/navbar'
import style from './view.module.css'
import LoadingAnimation from '../../components/module/LoadingAnimation'
import Pagination from '../../components/module/Pagination'

function ViewFilm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const { allFilms } = useSelector(state => state.movieReducer)
    const { user, isLoggedIn } = useSelector(state => state.userReducer)
    const {loading} = useSelector(state => state.movieReducer)
    
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)

    useEffect(() => {
        dispatch(getMovie())
        dispatch(getUser())
    }, [])

    if (loading) {
        return <LoadingAnimation />
    }
    const routeChangeById = (id) => {
        history.push(`/orderpage/${id}`)
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
                    <div class={`card ${style.cardFilm}`}>
                        <img src={item.image} class="card-img-top" alt="..." />
                        <div class="card-body">
                            <h5 class={style['card-title']}>{item.title}</h5>
                            <p class={style['card-text']}>{item.genre}</p>
                            <button className={style.button} onClick={() => routeChangeById(item.movie_Id)}>Book Now</button>
                        </div>
                    </div>
                )}

            </div>
            <Pagination postPerPage={postPerPage} totalPost={allFilms.length} paginate={paginate} />

        </div>
    )
}

export default ViewFilm
