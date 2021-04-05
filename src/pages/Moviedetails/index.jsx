import React, { Component } from 'react'
import style from './moviedetails.module.css'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import MyNavbar from '../../components/module/navbar'
import Footer from '../../components/module/Footer'
import { connect } from 'react-redux'
import { getUser } from '../../configs/redux/actions/user'
import { getLocation } from '../../configs/redux/actions/location'
import {ebuid, hiflix, cineone} from '../../assets/image/index'

export class Moviedetails extends Component {
    state = {
        films: {
            movie_Id: '',
            title: '',
            Synopsis: '',
            casts: '',
            directed_By: '',
            genre: '',
            image: '',
            movie_duration: '',
            price: ''
        },

    }


    componentDidMount() {
        this.props.getUser()
        this.props.getLocation()
        const id = this.props.match.params.idfilm;
        console.log(this.props.match);
        Axios.get(`${process.env.REACT_APP_API_TICKITZ}movies/${id}`)
            .then((res) => {
                this.setState({
                    films: res.data.result[0]
                })
            })
            .catch((err) => {
                console.log(err);
            })

    }
    routeChangeById = (id) => {
        this.props.history.push(`/orderpage/${id}`)
    }

    displayImage = (bioskop) =>{
        if(bioskop === 'ebuid'){
            return <img src={ebuid} alt="" srcset=""/>
        }else if(bioskop === 'hiflix'){
            return <img src={hiflix} alt="" srcset=""/>
        }else{
            return <img src={cineone} alt="" srcset=""/>
        }
    }
    routeChangeSignUp = () => {
        this.props.history.push(`/signup`)
    }
    
    render() {
        
        return (
            <div>
                <MyNavbar routeSignUp={() => this.routeChangeSignUp()} isLoggedIn={this.props.user.isLoggedIn} allFilm={this.props.allFilms} userImage={this.props.user.user.image} />
                <main className="cont">
                    <div className={[style['section'], style['flex']].join(' ')}>
                        <div className={[style['border'], style['image'], style['mgrl-1']].join(' ')}>
                            <img src={this.state.films.image} alt="" />
                        </div>
                        <div className={[['descript'], style['flex-col'], style['mgrl-1']].join(' ')}>
                            <div className="desc-tittle">
                                <h3>{this.state.films.title}</h3>
                                <p>{this.state.films.genre}</p>
                            </div>
                            <div className={[['desc-detail'], style['grid-2'], style['border-bot']].join(' ')}>
                                <div>
                                    <p className="detail">Release Date</p>
                                    <p className="desc">June 28,2017</p>
                                </div>
                                <div>
                                    <p className="detail">Directed by</p>
                                    <p className="desc">Jon Watss</p>
                                </div>
                                <div>
                                    <p className="detail">Duration</p>
                                    <p className="desc">{this.state.films.movie_duration}</p>
                                </div>
                                <div>
                                    <p className="detail">Casts</p>
                                    <p className="desc">{this.state.films.casts}</p>
                                </div>
                            </div>
                            <div className={style['desc-synopsis']}>
                                <h4>Synopsis</h4>
                                <p>{this.state.films.Synopsis}</p>
                            </div>
                        </div>
                    </div>
                    <div className={[style['section'], style['flex-col'], style['bg-grey']].join(' ')}>
                        <div className="line"><h4>Showtimes and Tickets</h4></div>
                        <div className={[['line'], style['flex'], style['center']].join(' ')}>
                            <div className="dropdown">
                                <button className={[['btn'], ['dropdown-toggle']].join(' ')} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="/Movie detail/image/calendar.png" alt="" />
                21/07/20
              </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link className={['dropdown-item'].join(' ')} to="#">Action</Link></li>
                                    <li><Link className={["dropdown-item"].join(' ')} to="#">Another action</Link></li>
                                    <li><Link className={["dropdown-item"].join(' ')} to="#">Something else here</Link></li>
                                </ul>
                            </div>
                            <div className="dropdown">
                                <button className={[['btn'], ['dropdown-toggle']].join(' ')} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src="/Movie detail/image/location.png" alt="" />
                Purwokerto
              </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link className={["dropdown-item"].join(' ')} to="#">Action</Link></li>
                                    <li><Link className={["dropdown-item"].join(' ')} to="#">Another action</Link></li>
                                    <li><Link className={["dropdown-item"].join(' ')} to="#">Something else here</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className={[['line'], style['grid-3']].join(' ')}>
                            {this.props.location.location.map((item) =>
                                <div className={[['card'], style['flex-col']].join(' ')}>
                                    <div className={[style['card-line'], style['flex']].join(' ')}>
                                        <div className={[style['card-img'], style['grow-1']].join(' ')}>
                                            {this.displayImage(item.bioskop)}
                                        </div>
                                        <div className={[style['card-desc'], style['grow-2']].join(' ')}>
                                            <p className={style['card-title']}>{item.bioskop}</p>
                                            <p className={style['card-desc']}>{item.cinema}</p>
                                        </div>
                                    </div>
                                    <div className={[style['card-line'], style['grid-4']].join(' ')}>
                                        <Link to="" className={style["card-time"]}>08:30am</Link>
                                        <Link to="" className={style["card-time"]}>10:30am</Link>
                                        <Link to="" className={style["card-time"]}>12:00pm</Link>
                                        <Link to="" className={style["card-time"]}>02:00pm</Link>
                                        <Link to="" className={style["card-time"]}>04:30pm</Link>
                                        <Link to="" className={style["card-time"]}>07:00pm</Link>
                                        <Link to="" className={style["card-time"]}>08:30pm</Link>
                                    </div>
                                    <div className={[style['card-line'], style['flex'], style['sp-bt'], style['base-line']].join(' ')}>
                                        <p className="price">price</p>
                                        <p className={style['price-sum']}>Rp.{item.price} /seat</p>
                                    </div>
                                    <div className={[style['card-line'], style['flex'], style['sp-bt'], style['base-line']].join(' ')}>
                                        <button onClick={() => this.routeChangeById(this.props.match.params.idfilm)}>Book Now</button>
                                        <Link to="" className={style['paddingr-1']}>add to cart</Link>
                                    </div>
                                </div>
                            )}




                        </div>
                        <div className={[['line'], style['flex'], style['mgtb-2'], ['line-2']].join(' ')}>
                            <div className={[style['line-lit'], style['grow-3']].join(' ')}><hr /></div>
                            <div className={[style['line-lit'], style['grow-1']].join(' ')}><Link to="">view more</Link></div>
                            <div className={[style['line-lit'], style['grow-3']].join(' ')}><hr /></div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        location: state.locationReducer
    }
}
const mapDispatchToProps = dispatch => ({
    getUser: () => {
        dispatch(getUser());
    },
    getLocation: () => {
        dispatch(getLocation())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Moviedetails)
