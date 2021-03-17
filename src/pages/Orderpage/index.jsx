import React, { Component } from 'react'
import MyNavbar from '../../components/module/navbar'
import style from './orderpage.module.css'
import seat from '../../assets/image/selectseat.PNG'
import MyButton from '../../components/base/Button'
import MyFooter from '../../components/module/Footer'

export class OrderPage extends Component {
    render() {
        return (
            <div>
                <MyNavbar />
                <div className="container-fluid bg-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="box1" style={{margin:'2em 0'}}>
                                    <h4>Movie Selected</h4>
                                    <div className={`${style.contfluid} ${style.movieselect}`} >
                                        <p>Spider-Man:Homecoming</p>
                                        <button>Change movie</button>
                                    </div>
                                </div>
                                <div className="box2">
                                    <h4>Choose Your seat</h4>
                                    <div className={`${style.contfluid}`} style={{ height:'70vh'}}>
                                        <img src={seat} alt=""/>
                                    </div>
                                </div>
                                <div className="btn" style={{display: 'flex', justifyContent:'space-between'}}>
                                <MyButton title="Change your movie" color="white" />
                                <MyButton title="checkout Now" />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                    <div className="box3">
                                        <h4>Order Info</h4>
                                        <div class="cont-fluid order-info">
                                <img src="/Home page/image/cineone21.png" alt="" />
                                <p>CineOne21 Cinema</p>
                                <div class="detail-order">
                                    <p class="criteria">Movie selected</p>
                                    <p class="detail">Spider-Man:Homecoming</p>
                                </div>
                                <div class="detail-order">
                                    <p class="criteria">Tuesday, 07 july 2020</p>
                                    <p class="detail">02:00pm</p>
                                </div>
                                <div class="detail-order">
                                    <p class="criteria">One ticket price</p>
                                    <p class="detail">$10</p>
                                </div>
                                <div class="detail-order">
                                    <p class="criteria">Seat choosed</p>
                                    <p class="detail">C4,C5,C6</p>
                                </div>
                                <div class="total-payment">
                                    <p class="criteria-pay">Total Payment</p>
                                    <p class="detail-pay">$30</p>
                                </div>
    
                            </div>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <MyFooter/>
            </div>
        )
    }
}

export default OrderPage
