import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import MyNavbar from '../../components/module/navbar'
import Footer from '../../components/module/Footer'
import style from './ticket.module.css'
import { logotickitz, downloadicon, printericon } from '../../assets/image/'
import axios from 'axios'
import Swal from 'sweetalert2'

function TicketResult() {
    const { order } = useParams();

    const [ticket, setTicket] = useState({
        cinemaName: "",
        cinemasID: 0,
        movieID: 0,
        movieTitle: "",
        newDate: "",
        newSeat: [],
        order_Id: 0,
        time: "",
        totalPrice: "",
        userID: "",
        genre: ""
    })

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API_TICKITZ}ticket/ticket-result/${order}`, { headers: { Authorization: localStorage.getItem('token') } })
            .then((result) => {
                const newTicket = result.data.data

                setTicket(newTicket)
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "currently unable to find your ticket"
                })
            })
    }, [])
   
    return (
        <div>
            <MyNavbar />
            <div className={style["cont-fluid"]}>
                <main className={style["box-ticket"]}>
                    <h3>Proof of Payment</h3>
                    <div className={style["ticket"]}>
                        <div className={style["ticket-top"]}>
                            <div className={style["ticket-top-left"]}>
                                <img src={logotickitz} alt="" />
                                <h5>Admit One</h5>
                            </div>
                            <div className={style["ticket-top-right"]}>
                                <img src={logotickitz} alt="" />
                            </div>
                        </div>
                        <div className={style["ticket-bottom"]}>
                            <div className={style["ticket-bottom-left"]}>
                                <h5>Movie</h5>
                                <p>{ticket.movieTitle}</p>
                                <div className={style["ticket-bottom-left-grid"]}>
                                    <div className={style["grid-content"]}>
                                        <h5>Date </h5>
                                        <p>{ticket.newDate}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>Time</h5>
                                        <p>{ticket.time}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>Category</h5>
                                        <p>{ticket.genre}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>count</h5>
                                        <p>{ticket.newSeat.length}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>seat</h5>
                                        <p>{ticket.newSeat.toString()}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>price</h5>
                                        <p>{ticket.totalPrice}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={style["ticket-bottom-right"]}>
                                <h5>Movie</h5>
                                <p>{ticket.movieTitle.length > 10 ? ticket.movieTitle.substring(0,10)+"..." : ticket.movieTitle}</p>
                                <div className={style["ticket-bottom-right-grid"]}>
                                    <div className={style["grid-content"]}>
                                        <h5>Date </h5>
                                        <p>{ticket.newDate}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>Time</h5>
                                        <p>{ticket.time}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>Category</h5>
                                        <p>{ticket.genre}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>count</h5>
                                        <p>{ticket.newSeat.length}</p>
                                    </div>
                                    <div className={style["grid-content"]}>
                                        <h5>seat</h5>
                                        <p>{ticket.newSeat.toString()}</p>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={style["btn-group"]}>
                        <button><img src={downloadicon} alt="" /> Download</button>
                        <button><img src={printericon} alt="" /> Print</button>
                    </div>
                </main>
            </div>
            <Footer />
        </div>
    )
}

export default TicketResult
