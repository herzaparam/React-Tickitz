import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import MyNavbar from '../../components/module/navbar'
import style from './orderpage.module.css'
import MyButton from '../../components/base/Button'
import MyFooter from '../../components/module/Footer'

import Swal from 'sweetalert2'
import { useHistory } from 'react-router'

function OrderPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const urlImg = process.env.REACT_APP_API_IMG

    const { order } = useSelector(state => state.historyReducer)

    const [data, setData] = useState({
        selectedSeat: [],
        totalPrice: 0,
    })

    const [selectedSeat, setSelectedSeat] = useState([])
    const [A, setA] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [B, setB] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [C, setC] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [D, setD] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [E, setE] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [F, setF] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])
    const [G, setG] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"])


    const handleSeat = (box) => {
        if (selectedSeat.length < 4) {
            setSelectedSeat([...selectedSeat, box])
            setData({
                selectedSeat: [...data.selectedSeat, box],
                totalPrice: selectedSeat.length * order.price
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

    const handleCheckOut = () => {
        dispatch({ type: "UPDATE_ORDER", payload: data })
        history.push("/paymentpage")
    }


    return (
        <div>
            <MyNavbar />
            <div className="container-fluid bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8">
                            <div className="box1" style={{ margin: '2em 0' }}>
                                <h4>Movie Selected</h4>
                                <div className={[style['cont-fluid'], style['movieselect']].join(' ')} >
                                    <h5>{order.films.title}</h5>
                                    <button onClick={e => history.push('/allmovies')}>Change movie</button>
                                </div>
                            </div>
                            <div className="box2">
                                <h4>Choose Your seat</h4>
                                <div className={style['contFluid']} >
                                    <div className={style["cont-box2"]}>
                                        <h5>Screen</h5>
                                        <div className={style["grid-box2"]}>
                                            <h4>A</h4>
                                            {A.map((box, index) => {
                                                return <div className={selectedSeat.includes(`A${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("A" + box)}></div>
                                            })}
                                            <h4>B</h4>
                                            {B.map((box, index) => {
                                                return <div className={selectedSeat.includes(`B${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("B" + box)}></div>
                                            })}
                                            <h4>C</h4>
                                            {C.map((box, index) => {
                                                return <div className={selectedSeat.includes(`C${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("C" + box)}></div>
                                            })}
                                            <h4>D</h4>
                                            {D.map((box, index) => {
                                                return <div className={selectedSeat.includes(`D${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("D" + box)}></div>
                                            })}
                                            <h4>E</h4>
                                            {E.map((box, index) => {
                                                return <div className={selectedSeat.includes(`E${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("E" + box)}></div>
                                            })}
                                            <h4>F</h4>
                                            {F.map((box, index) => {
                                                return <div className={selectedSeat.includes(`F${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("F" + box)}></div>
                                            })}
                                            <h4>G</h4>
                                            {G.map((box, index) => {
                                                return <div className={selectedSeat.includes(`G${box}`) ? style["select-box-active"] : style["select-box"]} key={index} onClick={(e) => handleSeat("G" + box)}></div>
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
                                    </div>
                                </div>
                            </div>
                            <div className={style["btn"]}>
                                <MyButton title="Change your movie" color="white" />
                                <MyButton title="checkout Now" onClick={handleCheckOut} />
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
                                        <p className="detail">{order.films.title}</p>
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
