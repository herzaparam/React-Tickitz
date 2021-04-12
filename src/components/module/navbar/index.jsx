import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import MyButton from '../../base/Button'
import { tickitzpurpleimg, searchlogo, defaultimage } from '../../../assets/image'
import style from './navbar.module.css'
import { useState } from 'react'

function MyNavbar({ routeSignUp, isLoggedIn, allFilm, userImage }) {
    let history = useHistory();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [authLogin, setAuthLogin] = useState(isLoggedIn)

    const handleShowSearch = (e) => {
        e.preventDefault();
        setShowSearch(true)

    }
    const handleLogOut = (e) =>{
        localStorage.removeItem("token")
        setAuthLogin(false)
        window.location.reload()
    }    
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={tickitzpurpleimg} alt="" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/moviedetails/1">Movies</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Cinemas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/orderpage">Buy Ticket</Link>
                        </li>

                    </ul>
                    <div className="nav-item dropdown">
                        <Link className="nav-link " to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Location
          </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="#">Jakarta</Link></li>
                            <li><Link className="dropdown-item" to="#">Surabaya</Link></li>
                        </ul>
                    </div>

                    <form className={`d-flex `}>
                        {showSearch ?
                            <div className={style.dropdown}>
                                <div className={style.search}>
                                    <input className={`dropdown-header form-control me-2 ${style.inputSearch}`} type="search" placeholder="Search" aria-label="Search" onChange={e => { setSearchTerm(e.target.value) }} />
                                    <button className="btn btn-outline-light" type="submit" onClick={handleShowSearch}><img src={searchlogo} alt="" /></button>
                                </div>
                                <div className={style.dropdownContent}>
                                    {allFilm.filter((film) => {
                                        if (searchTerm === "") {
                                            return film
                                        } else if (film.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                                            return film
                                        }
                                    }).map((film, key) => {
                                        return (<div className={`${style.film}`} key={key}>
                                            <img src={film.image} alt="" />
                                            <p>{film.title}</p>
                                        </div>)
                                    })}
                                </div>
                            </div> :
                            <button className="btn btn-outline-light" type="submit" onClick={handleShowSearch}><img src={searchlogo} alt="" /></button>
                        }
                    </form>
                    <div className="nav-item dropdown">
                        {!isLoggedIn ?
                            <MyButton title="Sign Up" onClick={routeSignUp} /> :
                            <div>
                                <button className={`nav-link ${style.btnProfile}`} to="#" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={userImage === '' ? defaultimage : userImage} alt="" />
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><button className="dropdown-item" onClick={()=>{ history.push("/profile") }}>Profile</button></li>
                                    <li><button className="dropdown-item" to="#" onClick={handleLogOut}>Logout</button></li>
                                </ul>
                            </div>
                        }
                    </div>



                </div>
            </div>
        </nav>

    )
}

export default MyNavbar
