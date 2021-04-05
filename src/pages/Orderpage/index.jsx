import React, { Component } from 'react'
import MyNavbar from '../../components/module/navbar'
import style from './orderpage.module.css'
import seat from '../../assets/image/selectseat.PNG'
import MyButton from '../../components/base/Button'
import MyFooter from '../../components/module/Footer'
import { connect } from 'react-redux'
import { getUser } from '../../configs/redux/actions/user'
import {getMovie} from '../../configs/redux/actions/movie'
import Axios from 'axios'
import {withRouter} from 'react-router-dom'


export class OrderPage extends Component {
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
        this.props.getMovie()
        const id = this.props.match.params.idfilm;
        Axios.get(`${process.env.REACT_APP_API_TICKITZ}movies/${id}`)
            .then((res) => {
                console.log(res);
                this.setState({
                    films: res.data.result[0]
                })
            })
            .catch((err) => {
                console.log(err);
            })

    }

    render() {
        const {title, price} = this.state.films
        return (
            <div>
                <MyNavbar routeSignUp={() => this.routeChangeSignUp()} isLoggedIn={this.props.user.isLoggedIn} allFilm={this.props.allFilms} userImage={this.props.user.user.image} />
                <div className="container-fluid bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="box1" style={{ margin: '2em 0' }}>
                                    <h4>Movie Selected</h4>
                                    <div className={[style['cont-fluid'],style['movieselect']].join(' ')} >
                                        <h5>{title}</h5>
                                        <button onClick={e=>this.props.history.push('/allmovies')}>Change movie</button>
                                    </div>
                                </div>
                                <div className="box2">
                                    <h4>Choose Your seat</h4>
                                    <div className={style['contFluid']} style={{ height: '70vh' }}>
                                        <img src={seat} alt="" />
                                    </div>
                                </div>
                                <div className="btn" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <MyButton title="Change your movie" color="white" />
                                    <MyButton title="checkout Now" onClick={e=>this.props.history.push('/paymentpage')}/>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="box3">
                                    <h4>Order Info</h4>
                                    <div class={[style['cont-fluid'],['order-info']].join(' ')}>
                                        <img src="" alt="" />
                                        <p>CineOne21 Cinema</p>
                                        <div class={[["detail-order"], style['detailed']].join(' ')}>
                                            <p class="criteria">Movie selected</p>
                                            <p class="detail">{title}</p>
                                        </div>
                                        <div class={[["detail-order"], style['detailed']].join(' ')}>
                                            <p class="criteria">Tuesday, 07 july 2020</p>
                                            <p class="detail">02:00pm</p>
                                        </div>
                                        <div class={[["detail-order"], style['detailed']].join(' ')}>
                                            <p class="criteria">One ticket price</p>
                                            <p class="detail">Rp. {price},-</p>
                                        </div>
                                        <div class={[["detail-order"], style['detailed']].join(' ')}>
                                            <p class="criteria">Seat choosed</p>
                                            <p class="detail">C4,C5,C6</p>
                                        </div>
                                        <div class={[["total-payment"], style['totaled']].join(' ')}>
                                            <p class="criteria-pay">Total Payment</p>
                                            <p class="detail-pay">Rp. {price},-</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <MyFooter />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.userReducer,
        allFilms: state.movieReducer.allFilms,
    }
}
const mapDispatchToProps = dispatch => ({
    getUser: () => {
        dispatch(getUser());
    },
    getMovie: () => {
        dispatch(getMovie());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
