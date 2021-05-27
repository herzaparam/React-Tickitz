import React, { Component } from 'react'
import style from './moviedetails.module.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MyNavbar from '../../components/module/navbar'
import Footer from '../../components/module/Footer'
import { connect } from 'react-redux'
import { getUser } from '../../configs/redux/actions/user'
import { getLocation } from '../../configs/redux/actions/location'
import { ebuid, hiflix, cineone } from '../../assets/image/index'
import Swal from 'sweetalert2'

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
            movie_duration: ''
        },
        date: "",
        city: "Jakarta",
        time: "",
        activeBtn: false,
        btnId: 0,
        price: "",
        cinemaImg: ""
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.city !== this.state.city) {
            this.props.getLocation(this.state.city)
        }
    }

    componentDidMount() {
        this.props.getUser()

        if (this.state.city !== undefined) {
            this.props.getLocation(this.state.city)
        }
        const id = this.props.match.params.idfilm;
        axios.get(`${process.env.REACT_APP_API_TICKITZ}movies/${id}`)
            .then((res) => {
                this.setState({
                    films: res.data.data[0]
                })
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "Cannot get this movies",
                    text: "Please try again later",
                    timer: 1000,
                    showConfirmButton: false
                })
            })
    }
    routeChangeById = (id) => {
        this.props.history.push(`/orderpage/${id}`)
    }

    displayImage = (bioskop) => {
        if (bioskop === 'ebuid') {
            return <img src={ebuid} alt="" srcset="" />
        } else if (bioskop === 'hiflix') {
            return <img src={hiflix} alt="" srcset="" />
        } else {
            return <img src={cineone} alt="" srcset="" />
        }
    }
    routeChangeSignUp = () => {
        this.props.history.push(`/signup`)
    }

    handleDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }
    handleCity = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    handleBook = (e) => {
        e.preventDefault()
        if (this.state.date === "") {
            return Swal.fire({
                icon: "info",
                title: "Please select order date",
                showConfirmButton: false,
                timer: 1500
            })
        } else if (this.state.time === "") {
            return Swal.fire({
                icon: "info",
                title: "Please select order time",
                showConfirmButton: false,
                timer: 1500
            })
        }
        const data = this.state
        this.props.addOrder(data)
        this.props.history.push("/orderpage")
    }

    render() {
        const urlImg = process.env.REACT_APP_API_IMG

        return (
            <div>
                <MyNavbar routeSignUp={() => this.routeChangeSignUp()} isLoggedIn={this.props.user.isLoggedIn} allFilm={this.props.allFilms} userImage={this.props.user.user.image} />
                <main className="cont">
                    <div className={[style['section'], style['flex']].join(' ')}>
                        <div className={[style['border'], style['image'], style['mgrl-1']].join(' ')}>
                            <img src={this.state.films.image} alt="" />
                        </div>
                        <div className={[['descript'], style['flex-col'], style['mgrl-1']].join(' ')}>
                            <div className={style["title-mov"]}>
                                <h3>{this.state.films.title}</h3>
                                <p>{this.state.films.genre}</p>
                            </div>
                            <div className={[['desc-detail'], style['grid-2'], style['border-bot']].join(' ')}>
                                <div>
                                    <p className={style["detail"]}>Release Date</p>
                                    <p className={style["desc"]}>June 28,2017</p>
                                </div>
                                <div>
                                    <p className={style["detail"]}>Directed by</p>
                                    <p className={style["desc"]}>Jon Watss</p>
                                </div>
                                <div>
                                    <p className={style["detail"]}>Duration</p>
                                    <p className={style["desc"]}>{this.state.films.movie_duration}</p>
                                </div>
                                <div>
                                    <p className={style["detail"]}>Casts</p>
                                    <p className={style["desc"]}>{this.state.films.casts}</p>
                                </div>
                            </div>
                            <div className={style['desc-synopsis']}>
                                <h4>Synopsis</h4>
                                <p>{this.state.films.Synopsis}</p>
                            </div>
                        </div>
                    </div>
                    <div className={[style['section'], style['flex-col'], style['bg-grey']].join(' ')}>
                        <div className={style["line"]}>
                            <h4>Showtimes and Tickets</h4>
                        </div>
                        <div className={[['line'], style['flex'], style['center'], style["hehe"]].join(' ')}>
                            <input type="date" onChange={this.handleDate} />
                            <select className={style["s-mov-detail"]} name="city" id="city" onChange={this.handleCity}>
                                <option value="Jakarta" >Jakarta</option>
                                <option value="Surabaya" >Surabaya</option>
                                <option value="Bandung" >Bandung</option>
                            </select>
                        </div>
                        <div className={[['line'], style['grid-3']].join(' ')}>
                            {this.props.location.location.map((item) =>
                                <div className={[['card'], style['flex-col']].join(' ')} key={item.id}>
                                    <div className={[style['card-line'], style['flex'], style["hehe"]].join(' ')}>
                                        <div className={[style['card-img'], style['grow-1']].join(' ')}>
                                            <img src={`${urlImg}${item.image}`} alt="" />
                                        </div>
                                        <div className={[style['card-desc'], style['grow-2']].join(' ')}>
                                            <p className={style['card-title']}>{item.name}</p>
                                            <p className={style['card-desc']}>{item.address}</p>
                                        </div>
                                    </div>
                                    <div className={[style['card-line-1'], style['grid-4']].join(' ')}>
                                        <button className={this.state.activeBtn === 1 && this.state.btnId === item.id ? style["activeBtn"] : "btn-time"} onClick={(e) => this.setState({ time: e.target.value, activeBtn: 1, btnId: item.id, price: item.price, cinemaImg: item.image, cinemaName: item.name })} value="08:30am">08:30am</button>
                                        <button className={this.state.activeBtn === 2 && this.state.btnId === item.id ? style["activeBtn"] : "btn-time"} onClick={(e) => this.setState({ time: e.target.value, activeBtn: 2, btnId: item.id, price: item.price, cinemaImg: item.image, cinemaName: item.name })} value="10:30am">10:30am</button>
                                        <button className={this.state.activeBtn === 3 && this.state.btnId === item.id ? style["activeBtn"] : "btn-time"} onClick={(e) => this.setState({ time: e.target.value, activeBtn: 3, btnId: item.id, price: item.price, cinemaImg: item.image, cinemaName: item.name })} value="12:00pm">12:00pm</button>
                                        <button className={this.state.activeBtn === 4 && this.state.btnId === item.id ? style["activeBtn"] : "btn-time"} onClick={(e) => this.setState({ time: e.target.value, activeBtn: 4, btnId: item.id, price: item.price, cinemaImg: item.image, cinemaName: item.name })} value="02:00pm">02:00pm</button>
                                        <button className={this.state.activeBtn === 5 && this.state.btnId === item.id ? style["activeBtn"] : "btn-time"} onClick={(e) => this.setState({ time: e.target.value, activeBtn: 5, btnId: item.id, price: item.price, cinemaImg: item.image, cinemaName: item.name })} value="04:30pm">04:30pm</button>
                                        <button className={this.state.activeBtn === 6 && this.state.btnId === item.id ? style["activeBtn"] : "btn-time"} onClick={(e) => this.setState({ time: e.target.value, activeBtn: 6, btnId: item.id, price: item.price, cinemaImg: item.image, cinemaName: item.name })} value="07:70pm">07:00pm</button>
                                        <button className={this.state.activeBtn === 7 && this.state.btnId === item.id ? style["activeBtn"] : "btn-time"} onClick={(e) => this.setState({ time: e.target.value, activeBtn: 7, btnId: item.id, price: item.price, cinemaImg: item.image, cinemaName: item.name })} value="08:30pm">08:30pm</button>
                                    </div>
                                    <div className={[style['card-line'], style['flex'], style['sp-bt'], style['base-line']].join(' ')}>
                                        <p className="price">price</p>
                                        <p className={style['price-sum']}>Rp.{item.price} /seat</p>
                                    </div>
                                    <div className={[style['card-line'], style['flex'], style['sp-bt'], style['base-line'], style["hehe"]].join(' ')}>
                                        <button onClick={this.handleBook}>Book Now</button>
                                        <Link to="" className={style['paddingr-1']}>add to cart</Link>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className={[['line'], style['flex'], style['mgtb-2'], ['line-2'], style["hehe"]].join(' ')}>
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
    getLocation: (city) => {
        dispatch(getLocation(city))
    },
    addOrder: (data) => {
        dispatch({ type: "ADD_ORDER", payload: data })
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Moviedetails)
