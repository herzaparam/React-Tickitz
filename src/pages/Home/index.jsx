import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MyNavbar from '../../components/module/navbar'
import MyFooter from '../../components/module/Footer'
import Card from '../../components/base/Card'
import MyCard from '../../components/base/MyCard'
import rectone from '../../assets/image/rectangle1.png'
import recttwo from '../../assets/image/rectangle2.png'
import rectthree from '../../assets/image/rectangle3.png'
import style from './home.module.css'
import { connect } from 'react-redux'
import { getMovie } from '../../configs/redux/actions/movie'
import { getUser } from '../../configs/redux/actions/user'


export class Home extends Component {
    componentDidMount() {
        this.props.getMovie()
        this.props.getUser()
    }
    routeChangeById = (id) => {
        this.props.history.push(`/moviedetails/${id}`)
    }
    routeChangeSignUp = () => {
        this.props.history.push(`/signup`)
    }

    render() {
        return (
            <div>
                <MyNavbar />
                <div className={style.sectone}>
                    <h1 className={style['headingstyle']}><span className={style.spanstyle}>Nearest Cinema, Newest Movie<br /></span> Find out now!</h1>
                    <div className={style.contimg}>
                        <img src={rectone} alt="" id={style.imgone} />
                        <img src={recttwo} alt="" id={style.imgtwo} />
                        <img src={rectthree} alt="" id={style.imgthree} />
                    </div>
                </div>
                <div className="container-fluid" style={{ backgroundColor: '#F5F6F8', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2em 5%' }}>
                        <h3 style={{ color: '#5F2EEA' }}>Now Showing</h3>
                        <p style={{ color: '#5F2EEA' }}><Link to="/allmovies">view alll</Link></p>
                    </div>
                    <div className={style['card-show']} id={style['style-2']}>
                        {this.props.nowFilms.map((item) =>
                            <Card img={item.image} key={item.movie_Id} />
                        )}
                    </div>
                    <section className={style['section-three']}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2em 0' }}>
                            <h3 style={{ color: '#5F2EEA' }}>Upcoming Movies</h3>
                            <p style={{ color: '#5F2EEA' }}><Link to="/allmovies">view all</Link></p>
                        </div>
                        <div className={style['overflow']} >
                            <button>January</button>
                            <button>February</button>
                            <button>March</button>
                            <button>April</button>
                            <button>May</button>
                            <button>June</button>
                            <button>July</button>
                            <button>August</button>
                            <button>September</button>
                            <button>Oktober</button>
                            <button>November</button>
                            <button>December</button>
                        </div>
                        <div className={[style['cont-up-movies'], style['overflow']].join(' ')} id={style['style-2']}>
                            {this.props.upFilms.map((item) =>
                                <MyCard title={item.title} genre={item.genre} img={item.image} routeChange={() => this.routeChangeById(item.movie_Id)} key={item.movie_Id} />
                            )}
                        </div>
                    </section>
                    <section className={style['section-four']}>
                        <div className={style['cont-join']}>
                            <div className={style['cont-join-content']}>
                                <h1>Be the vanguard of the<span className={style['t-style']}><br />Moviegoers</span></h1>
                                <input type="text" placeholder="Type your email" />
                                <button>join now</button>
                                <p>By joining you as a Tickitz member <br /> we will always send you the latest updates via email.</p>
                            </div>
                        </div>
                    </section>

                </div>
                <MyFooter />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        allFilms: state.movieReducer.allFilms,
        nowFilms: state.movieReducer.nowFilms,
        upFilms: state.movieReducer.upFilms,
        user: state.userReducer
    }
}
const mapDispatchToProps = dispatch => ({
    getMovie: () => {
        dispatch(getMovie());
    },
    getUser: () => {
        dispatch(getUser());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home)
