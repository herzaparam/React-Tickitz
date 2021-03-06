import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
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
import axios from 'axios'
import Swal from 'sweetalert2'


function PaymentPage() {
    const urlApi = process.env.REACT_APP_API_TICKITZ
    const history = useHistory();

    const { user } = useSelector((state => state.userReducer))
    const { order } = useSelector((state) => state.historyReducer)

    const handlePayment = (e) => {
        e.preventDefault()
       
        Swal.fire({
            icon: "question",
            title: "are you sure?",
        }).then((async (result) => {
            if (result.isConfirmed) {
                const res = await axios.post(`${urlApi}ticket`, { user: user, order: order })
                if (res.request.status === 200) {
                    Swal.fire('Saved!', '', 'success')
                    history.push(`/ticket-result/${res.data.data[0].order_Id}`)
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "oops..",
                        text: "something whent wrong"
                    })
                }
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })

        )
    }

    return (
        <div>
            <MyNavbar />
            <main className={`${style.cont}`}>
                <div className={`${style.contMain}`}>
                    <section className={`${style.box1}`}>
                        <h4>Payment Info</h4>
                        <div className={`${style.itemInfoCont}`}>
                            <div className={`${style.itemInfo1}`}>
                                <h5>Date & time</h5>
                                <h4>{order.date} at {order.time}</h4>
                            </div>
                            <div className={`${style.itemInfo1}`}>
                                <h5>Movie title</h5>
                                <h4>{order.films.title}</h4>
                            </div>
                            <div className={`${style.itemInfo1}`}>
                                <h5>Cinema name</h5>
                                <h4>{order.cinemaName}</h4>
                            </div>
                            <div className={`${style.itemInfo1}`}>
                                <h5>Number of tickets</h5>
                                <h4>{order.selectedSeat.length} Pieces</h4>
                            </div>
                            <div className={`${style.itemInfo}`}>
                                <h5>Total payment</h5>
                                <h4>Rp.{order.totalPrice},-</h4>
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
                        <MyButton className="btn-order2" title="Previous Step" color="white" />
                        <MyButton className="btn-order" title="Pay Your order" onClick={handlePayment} />
                    </div>
                </div>
                <div className={`${style.contSide}`}>
                    <h4>Personal Info</h4>
                    <div className={`${style.box3}`}>
                        <form action="" className={style["nice"]}>
                            <label htmlFor="fname">Full name</label><br />
                            <input type="text" id="fname" name="fname" value={`${user.fname} ${user.lname}`} placeholder="Jonas El Rodrigues" /><br /><br />
                            <label htmlFor="email">Email</label><br />
                            <input type="text" id="email" name="email" value={user.email} placeholder="jonasrodri123@gmail.com" /><br /><br />
                            <label htmlFor="pnumber">Phone number</label><br />
                            <input type="text" id="pnumber" name="pnumber" value={user.phone_number} />
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

export default PaymentPage