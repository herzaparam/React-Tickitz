import React from 'react'
import style from './payment.module.css'
import gpay from '../../assets/image/gpay-icon.png'
import visa from '../../assets/image/visa-icon.png'
import gopay from '../../assets/image/gopay-icon.png'
import paypal from '../../assets/image/paypal-icon.png'
import dana from '../../assets/image/dana-icon.png'
import bca from '../../assets/image/bca-icon.png'
import bri from '../../assets/image/bri-icon.png'
import ovo from '../../assets/image/ovo-icon.png'
import warning from '../../assets/image/warning-icon.png'
import MyNavbar from '../../components/module/navbar'
import MyFooter from '../../components/module/Footer'
import MyButton from '../../components/base/Button'
import {withRouter} from 'react-router-dom'


function index() {
    return (
        <div>
            <MyNavbar />
            <main className={`${style.cont}`}>
                <div className={`${style.contMain}`}>
                    <section className={`${style.box1}`}>
                        <h4>Payment Info</h4>
                        <div className={`${style.itemInfoCont}`}>
                            <div className={`${style.itemInfo1}`}>
                                <p>Date & time</p>
                                <p>Tuesday, 07 July 2020 at 02.20pm</p>
                            </div>
                            <div className={`${style.itemInfo1}`}>
                                <p>Movie title</p>
                                <p>Spider-Man:Homecoming</p>
                            </div>
                            <div className={`${style.itemInfo1}`}>
                                <p>Cinema name</p>
                                <p>CineOne21 Cinema</p>
                            </div>
                            <div className={`${style.itemInfo1}`}>
                                <p>Number of tickets</p>
                                <p>3 Pieces</p>
                            </div>
                            <div className={`${style.itemInfo}`}>
                                <p>Total payment</p>
                                <p>$30,00</p>
                            </div>

                        </div>
                    </section>
                    <section className={`${style.box2}`}>
                        <h4>Choose a Payment Method</h4>
                        <div className={`${style.gridPay}`}>
                            <div className={`${style.payMethod}`}>
                                <img src={ovo} alt="" />
                            </div>
                            <div className={`${style.payMethod}`}>
                                <img src={gpay} alt="" />
                            </div>
                            <div className={`${style.payMethod}`}>
                                <img src={visa} alt="" />
                            </div>
                            <div className={`${style.payMethod}`}>
                                <img src={gopay} alt="" />
                            </div>
                            <div className={`${style.payMethod}`}>
                                <img src={paypal} alt="" />
                            </div>
                            <div className={`${style.payMethod}`}>
                                <img src={dana} alt="" />
                            </div>
                            <div className={`${style.payMethod}`}>
                                <img src={bca} alt="" />
                            </div>
                            <div className={`${style.payMethod}`}>
                                <img src={bri} alt="" />
                            </div>
                        </div>
                    </section>
                    <div className={`${style.btnflex}`}>
                        <MyButton title="Previous Step" color="white" />
                        <MyButton title="Pay Your order" />
                    </div>
                </div>
                <div className={`${style.contSide}`}>
                    <h4>Personal Info</h4>
                    <div className={`${style.box3}`}>
                        <form action="">
                            <label for="fname">Full name</label><br />
                            <input type="text" id="fname" name="fname" placeholder="Jonas El Rodrigues" /><br /><br />
                            <label for="email">Email</label><br />
                            <input type="text" id="email" name="email" placeholder="jonasrodri123@gmail.com" /><br /><br />
                            <label for="pnumber">Phone number</label><br />
                            <input type="text" id="pnumber" name="pnumber" placeholder="81445687121" />
                        </form>
                        <div className={`${style.warning}`}>
                            <img src={warning} alt="" />
                            <span><p>Fill your data correctly.</p></span>
                        </div>
                    </div>
                </div>
            </main>
            <MyFooter />
        </div>
    )
}

export default withRouter(index)