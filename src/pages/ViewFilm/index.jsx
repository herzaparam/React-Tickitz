import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
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
    const { user } = useSelector(state => state.userReducer)
    const { loading } = useSelector(state => state.movieReducer)

    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(8)
    const [allFilms, setAllFilms] = useState([])
    const [category, setCategory] = useState("")
    const [genre, setGenre] = useState("")

    useEffect(() => {
        // dispatch(getMovie())
        if (user.email === "") {
            dispatch(getUser())
        }
        axios.get(`${process.env.REACT_APP_API_TICKITZ}movies/all-movies/?page=1&perPage=50&keyword=`)
            .then((res) => {
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

    useEffect(() => {
        if (category !== "" || genre !== "") {
            axios.get(`${process.env.REACT_APP_API_TICKITZ}movies/all-sort/?category=${category}&genre=${genre}&page=1&perPage=50`)
                .then((res) => {
                    setAllFilms(res.data.data)
                })
                .catch((err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `cannot find flim with ${category} category and ${genre} genre`,
                        
                    })
                })
        }
    }, [category, genre])

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
            <MyNavbar />
            <div className={style["sorting"]}>
                <select className={style["inpt-category"]} name="category" id="category" onChange={e => setCategory(e.target.value)}>
                    <option value="now">Now Showing</option>
                    <option value="upcoming">Upcoming</option>
                </select>
                <select className={style["inpt-category"]} name="genre" id="genre" onChange={e => setGenre(e.target.value)}>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option>
                    <option value="Romance">Romance</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Animation">Animation</option>
                </select>
            </div>
            <div className={[['container'], ['bg-light'], style['card-container']].join(' ')}>
                {currentFilm.map((item) =>
                    <div className={`card ${style.cardFilm}`} key={item.movie_Id}>
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
