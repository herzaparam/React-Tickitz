import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../configs/redux/actions/user'
import Axios from 'axios'


import MyNavbar from '../../components/module/navbar'
import Footer from '../../components/module/Footer'
import style from './profile.module.css'
import Input from '../../components/base/Input'
import MyButton from '../../components/base/Button'
import HistoryCard from '../../components/base/HistoryCard/index'
import { useHistory } from 'react-router'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'
import { staricon, cardloyalty } from '../../assets/image'


function ProfilePage(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone_number: '',
        image: null,
        password: "",
        confirmPassword: ""
    })
    const [ticket, setTicket] = useState([]);
    const [count, setCount] = useState(0)

    const { user } = useSelector(state => state.userReducer)
    console.log(user);
    useEffect(() => {
        if (user.email === "") {
            dispatch(getUser())
        }

    }, [])
    useEffect(() => {
        Axios.post(`${process.env.REACT_APP_API_TICKITZ}ticket/ticket-user`, { headers: { Authorization: localStorage.getItem('token') } })
            .then((res) => {
                setTicket(res.data.data)
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'cannot get user ticket',
                })
            })
    }, [count])



    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeImage = (e) => {
        setData({
            ...data,
            image: e.target.files[0],
        })
    }

    const updateProfile = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fname', data.fname ? data.fname : user.fname)
        formData.append('lname', data.lname ? data.lname : user.lname)
        formData.append('email', data.email ? data.email : user.email)
        formData.append('phone_number', data.phone_number ? data.phone_number : user.phone_number)
        formData.append('image', data.image)
        Axios.put(`${process.env.REACT_APP_API_TICKITZ}user/update-profile`, formData, { headers: { Authorization: localStorage.getItem('token') } })
            .then((res) => {
                Swal.fire(
                    'Good job!',
                    'update profile success!',
                    'success'
                )
                dispatch(getUser())
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            })
    }

    return (
        <div>
            <MyNavbar />
            <div className={[['container-fluid'], ['bg-light'], style["cnt"]].join(' ')}>
                <div className={[['container'], style["cnt-1"]].join(" ")}>
                    <div className={['row']}>
                        <div className={['col-sm-4']}>
                            <div className={style['column-1']}>
                                <div className={style["card-prof-info"]}>
                                    <p>Info</p>
                                    <button>...</button>
                                </div>
                                <div className={style.bioProfile}>
                                    <label className={style.groupInput}>
                                        <img src={`${process.env.REACT_APP_API_IMG}${user.image}`} alt="" />
                                        <input className={style.inpt} name="image" type="file" onChange={handleChangeImage}></input>
                                    </label>
                                    <h5>{user.fname} {user.lname}</h5>
                                    <p>{user.role !== 'admin' ? 'user' : 'admin'}</p>
                                </div>
                                <div className={style["loyalty"]}>
                                    <p>Loyalty Point</p>
                                    <img className={style["card"]} src={cardloyalty} alt="" />
                                    <img className={style["star"]} src={staricon} alt="" />
                                    <div className={style["loyalty-bot"]}>
                                        <p>180 point to become master</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={[['col-sm-8'], style["col-prof"]].join(" ")}>
                            <div className={style['column-1']}>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className={[["nav-link active"], style["tab-btn"]].join(" ")} id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Account Setting</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className={[["nav-link"], style["tab-btn"]].join(" ")} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" >History</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className={style["detail-info"]}>
                                            <p>Details Information</p>
                                        </div>
                                        <div className={style['grid-2']}>
                                            <Input className="input-signup" label="First Name" placeholder={user.fname} name="fname" onChange={e => handleChange(e)}></Input>
                                            <Input className="input-signup" label="Last Name" placeholder={user.lname} name="lname" onChange={e => handleChange(e)}></Input>
                                            <Input className="input-signup" label="Email" placeholder={user.email} name="email" onChange={e => handleChange(e)}></Input>
                                            <Input className="input-signup" label="Phone number" placeholder={user.phone_number} name="phone_number" onChange={e => handleChange(e)}></Input>

                                        </div>
                                        <div className={style["acc-privacy"]}>
                                            <p>Acount and Privacy</p>

                                        </div>
                                        <div className={style['privacy']}>
                                            <Input className="input-signup" label="Password" disabled="true"></Input>
                                            <Input className="input-signup" label="Confirm password" disabled="true"></Input>
                                        </div>
                                        <MyButton className="btn-profile" title="update" onClick={updateProfile} />
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        {ticket.map((item) => {
                                            return (
                                                <HistoryCard order_Id={item.order_Id} movieTitle={item.movieTitle} date={item.schedule} time={item.time} img={item.image} key={item.order_Id} count={count} setCount={setCount} />
                                            )
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default withRouter(ProfilePage)

