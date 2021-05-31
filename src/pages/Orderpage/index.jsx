import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MyNavbar from '../../components/module/navbar'
import style from './orderpage.module.css'
import MyButton from '../../components/base/Button'
import MyFooter from '../../components/module/Footer'

import Swal from 'sweetalert2'
import { useHistory } from 'react-router'
import axios from 'axios'

function OrderPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const urlImg = process.env.REACT_APP_API_IMG

    const { order } = useSelector(state => state.historyReducer)

    const [data, setData] = useState({
        selectedSeat: [],
        totalPrice: 0,
    })

    const [soldSeat, setsoldSeat] = useState([])
    const [selectedSeat, setSelectedSeat] = useState([])
    const [A, setA] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [B, setB] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [C, setC] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [D, setD] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [E, setE] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [F, setF] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [G, setG] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])


    const handleSeat = (box) => {
        if(!selectedSeat.includes(box)){
            if (selectedSeat.length < 4) {
                setSelectedSeat([...selectedSeat, box])
                setData({
                    selectedSeat: [...data.selectedSeat, box],
                    totalPrice: (data.selectedSeat.length + 1) * order.price
                })
        } else {
            Swal.fire({
                icon: "info",
                title: "you can't order more than 4 ticket",
                showConfirmButton: false,
                timer: 1000,
            })
        }
        } 
    }

    const handleCheckOut = () => {
        dispatch({ type: "UPDATE_ORDER", payload: data })
        history.push("/paymentpage")
    }

    useEffect(() => {
        const data = {
            cinemaID: order.btnId,
            movieID: order.films.movie_Id,
            date: order.date,
            time: order.time,
        }
        axios.post(`${process.env.REACT_APP_API_TICKITZ}ticket/get-schedule`, data)
            .then((res) => {
                if (res.data.data.length > 1) {
                    let anSeat = []
                    const newSoldSeat = res.data.data.map((item) => {
                        return {
                            seat: JSON.parse(item.seat)
                        }
                    })
                    for (let i = 0; i < newSoldSeat.length; i++) {
                        anSeat = anSeat.concat(newSoldSeat[i].seat)
                    }
                    return setsoldSeat(anSeat)
                } else if (res.data.data.length = 1) {
                    return setsoldSeat(res.data.data[0].seat)
                }
            })
            .catch((err) => {
                return soldSeat
            })



    }, [])

    return (
        <div>
            <MyNavbar />
            <div className="container-fluid bg-light">
                <div className={[style["cnt-1"],["container"]].join(" ")}>
                    <div className="row">
                        <div className="col-sm-8">
                            <div className={style["box1"]} style={{ margin: '2em 0' }}>
                                <h4>Movie Selected</h4>
                                <div className={[style['cont-fluid'], style['movieselect']].join(' ')} >
                                    <h5>{order.films.title}</h5>
                                    <button onClick={e => history.push('/allmovies')}>Change movie</button>
                                </div>
                            </div>
                            <div className={style["box2"]}>
                                <h4>Choose Your seat</h4>
                                <div className={style['contFluid']} >
                                    <div className={style["cont-box2"]}>
                                        <h5>Screen</h5>
                                        <div className={style["grid-box2"]}>
                                            <h4>A</h4>
                                            {A.map((box, index) => {
                                                return <button className={soldSeat.includes(`A${box}`) ? style["select-box-sold"] : selectedSeat.includes(`A${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("A" + box)} disabled={soldSeat.includes(`A${box}`) ? true : false}></button>
                                            })}
                                            <h4>B</h4>
                                            {B.map((box, index) => {
                                                return <button className={soldSeat.includes(`B${box}`) ? style["select-box-sold"] : selectedSeat.includes(`B${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("B" + box)} disabled={soldSeat.includes(`B${box}`) ? true : false}></button>
                                            })}
                                            <h4>C</h4>
                                            {C.map((box, index) => {
                                                return <button className={soldSeat.includes(`C${box}`) ? style["select-box-sold"] : selectedSeat.includes(`C${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("C" + box)} disabled={soldSeat.includes(`C${box}`) ? true : false}></button>
                                            })}
                                            <h4>D</h4>
                                            {D.map((box, index) => {
                                                return <button className={soldSeat.includes(`D${box}`) ? style["select-box-sold"] : selectedSeat.includes(`D${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("D" + box)} disabled={soldSeat.includes(`D${box}`) ? true : false}></button>
                                            })}
                                            <h4>E</h4>
                                            {E.map((box, index) => {
                                                return <button className={soldSeat.includes(`E${box}`) ? style["select-box-sold"] : selectedSeat.includes(`E${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("E" + box)} disabled={soldSeat.includes(`E${box}`) ? true : false}></button>
                                            })}
                                            <h4>F</h4>
                                            {F.map((box, index) => {
                                                return <button className={soldSeat.includes(`F${box}`) ? style["select-box-sold"] : selectedSeat.includes(`F${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("F" + box)} disabled={soldSeat.includes(`F${box}`) ? true : false}></button>
                                            })}
                                            <h4>G</h4>
                                            {G.map((box, index) => {
                                                return <button className={soldSeat.includes(`G${box}`) ? style["select-box-sold"] : selectedSeat.includes(`G${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("G" + box)} disabled={soldSeat.includes(`G${box}`) ? true : false}></button>
                                            })}
                                            <h4></h4>
                                            <h4>1</h4>
                                            <h4>2</h4>
                                            <h4>3</h4>
                                            <h4>4</h4>
                                            <h4>5</h4>
                                            <h4>6</h4>
                                            <h4>7</h4>
                                            <h4>8</h4>
                                            <h4>9</h4>
                                            <h4>10</h4>
                                            <h4>11</h4>
                                            <h4>12</h4>
                                            <h4>13</h4>
                                            <h4>14</h4>
                                        </div>
                                        <h2>Seating Key</h2>
                                        <div className={style["seating-key"]}>
                                            <div className={style["select-box"]}></div>
                                            <h4>Available</h4>
                                            <div className={style["select-box-active"]}></div>
                                            <h4>Selected</h4>
                                            <div className={style["select-box-sold"]}></div>
                                            <h4>Sold</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={style["btn"]}>
                                <MyButton className="btn-order2" title="Change movie" color="white" />
                                <MyButton className="btn-order" title="checkout Now" onClick={handleCheckOut} />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="box3">
                                <h4>Order Info</h4>
                                <div className={[style['cont-fluid'], style['order-info']].join(' ')}>
                                    <img src={`${urlImg}${order.cinemaImg}`} alt="" />
                                    <p>CineOne21 Cinema</p>
                                    <div className={[["detail-order"], style['detailed']].join(' ')}>
                                        <p className="criteria">Movie selected</p>
                                        <p className="detail">{order.films.title.length > 20 ? order.films.title.substring(0, 20) + " ..." : order.films.title}</p>
                                    </div>
                                    <div className={[["detail-order"], style['detailed']].join(' ')}>
                                        <p className="criteria">{order.date}</p>
                                        <p className="detail">{order.time}</p>
                                    </div>
                                    <div className={[["detail-order"], style['detailed']].join(' ')}>
                                        <p className="criteria">One ticket price</p>
                                        <p className="detail">Rp. {order.price},-</p>
                                    </div>
                                    <div className={[["detail-order"], style['detailed']].join(' ')}>
                                        <p className="criteria">Seat choosed</p>
                                        <p className="detail">{selectedSeat.toString()} </p>

                                    </div>
                                    <div className={[["total-payment"], style['totaled']].join(' ')}>
                                        <p className="criteria-pay">Total Payment</p>
                                        <p className="detail-pay">Rp. {order.price * selectedSeat.length},-</p>
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

export default OrderPage
