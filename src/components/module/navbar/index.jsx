import React from 'react'
import { Link } from 'react-router-dom'
import MyButton from '../../base/Button'
import tickitzlogo from '../../../assets/image/Tickitz 1.png'
import searchlogo from '../../../assets/image/searchlogo.png'

function MyNavbar(props) {
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src={tickitzlogo} alt="" /></Link>
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
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Location
          </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="#">Jakarta</Link></li>
                            <li><Link className="dropdown-item" to="#">Surabaya</Link></li>
                        </ul>
                    </div>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" style={{ display: 'none' }} />
                        <button className="btn btn-outline-light" type="submit"><img src={searchlogo} alt="" /></button>
                    </form>
                    <MyButton title="Sign Up" onClick={props.routeSignUp}/>

                </div>
            </div>
        </nav>

    )
}

export default MyNavbar
