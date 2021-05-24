import axios from 'axios'
import React from 'react'
import Swal from 'sweetalert2'
import style from './history.module.css'

function HistoryCard({ order_Id, movieTitle, date, time, img, count, setCount }) {

    const deleteTicket = (e) => {
        e.preventDefault()
        axios.delete(`${process.env.REACT_APP_API_TICKITZ}ticket/delete-ticket/${order_Id}`)
            .then((res) => {
                Swal.fire(
                    'delete succes!',
                    'your ticket hisory already deleted!',
                    'success'
                )
                setCount(count+1)
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'delete failed',
                    text: 'Can not delete ticket right now ',
                })
            })
    }

    return (
        <div className={style.post}>
            <div className={style["post-top"]}>
                <div className={style["post-top-content"]}>
                    <h5>{date} - {time}</h5>
                    <h4>{movieTitle.length > 30 ? movieTitle.substring(0, 30) + "..." : movieTitle}</h4>
                </div>
                <img src={`${process.env.REACT_APP_API_IMG}${img}`} alt="" />
            </div>
            <hr />
            <div className={style["post-bot"]}>
                <button onClick={deleteTicket}>Delete</button>
                <button className={style["show-details"]} >Show Details</button>
            </div>
        </div>
    )
}

export default HistoryCard
