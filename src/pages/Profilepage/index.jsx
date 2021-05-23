import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../../configs/redux/actions/user'

import MyNavbar from '../../components/module/navbar'
import Footer from '../../components/module/Footer'
import style from './profile.module.css'
import { defaultimage } from '../../assets/image/index'
import Input from '../../components/base/Input'
import MyButton from '../../components/base/Button'
import HistoryCard from '../../components/base/HistoryCard'
import Axios from 'axios'
import { useHistory } from 'react-router'
import { withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'



function ProfilePage(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    // const imageRef = useRef(null)
    const [data, setData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone_number: '',
        image: null,
        password: "",
        confirmPassword: ""
    })

    const { user } = useSelector(state => state.userReducer)
    console.log(data);
    useEffect(() => {
        if (user.email === "") {
            dispatch(getUser())
        }
    }, [])
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
            <div className={[['container-fluid'], ['bg-light']].join(' ')}>
                <div className={['container']}>
                    <div className={['row']}>
                        <div className={['col-sm-4']}>
                            <div className={style['column-1']}>
                                <div>
                                    <p>Info</p>
                                </div>
                                <div className={style.bioProfile}>
                                    <img src={`${process.env.REACT_APP_API_IMG}${user.image}`} alt="" />
                                    <input name="image" type="file" onChange={handleChangeImage}></input>
                                    <h5>{user.fname} {user.lname}</h5>
                                    <p>{user.role !== 'admin' ? 'user' : 'admin'}</p>
                                </div>
                                <div>
                                    <p>Loyalty Point</p>
                                </div>
                            </div>
                        </div>
                        <div className={['col-sm-8']}>
                            <div className={style['column-1']}>
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Account Setting</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" >History</button>
                                    </li>
                                </ul>
                                <div className="tab-content" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div>
                                            <p>Details Information</p><hr />
                                        </div>
                                        <div className={style['grid-2']}>
                                            <Input label="First Name" placeholder={user.fname} name="fname" onChange={e => handleChange(e)}></Input>
                                            <Input label="Last Name" placeholder={user.lname} name="lname" onChange={e => handleChange(e)}></Input>
                                            <Input label="email" placeholder={user.email} name="email" onChange={e => handleChange(e)}></Input>
                                            <Input label="phone number" placeholder={user.phone_number} name="phone_number" onChange={e => handleChange(e)}></Input>

                                        </div>
                                        <div>
                                            <p>Acount and Privacy</p><hr />
                                        </div>
                                        <div className={style['privacy']}>
                                            <Input label="password"></Input>
                                            <Input label="confirm password"></Input>
                                        </div>
                                        <MyButton title="update" onClick={updateProfile} />
                                    </div>
                                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                        {/* {this.state.result.map((item) =>
                                                <HistoryCard title={item.title} cinema={item.cinema} fname={item.fname} seat={item.seat} time={item.time_stamp} btntitle="Delete" fireEvent={this.handleDelete} key={item.order_Id} />

                                            )} */}
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



// class profilepage extends Component {
//     state = {
//         result: [],
//         user: {
//             user_Id: '',
//             fname: '',
//             lname: '',
//             phone_number: '',
//             email: '',
//             password: '',
//         },
//         ticket: {

//         }
//     }
//     componentDidMount() {
//         const id = this.props.match.params.iduser
//         Axios.get(`${process.env.REACT_APP_API_TICKITZ}profile/${id}`)
//             .then((res) => {
//                 this.setState({
//                     user: res.data.user[0]
//                 })
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }

//     handleUpdate = () => {
//         console.log('update jalan');
        // Axios.put(`${process.env.REACT_APP_API_TICKITZ}profile/${this.state.user.user_Id}`, this.state.user)
//             .then((res) => {
//                 console.log(res.data.user);
//                 alert('update berhasil')
//             })
//             .catch((err) => {

//             })
//     }
//     handleChange = (e) => {
//         let userNew = { ...this.state.user };
//         userNew[e.target.name] = e.target.value;
//         this.setState({
//             user: userNew
//         })
//     }
//     handleDelete = () => {

//     }
//     getHistoryId = () => {
//         const id = this.props.match.params.iduser
//         Axios.get(`${process.env.REACT_APP_API_TICKITZ}ticket/${id}`)
//             .then((res) => {
//                 // console.log(res.data.result);
//                 this.setState({
//                     result: res.data.result
//                 })
//             })
//             .catch((err) => {
//                 console.log(err);
//             })
//     }


//     render() {
//         console.log(this.state);
//         const { fname, lname, phone_number, email } = this.state.user
//         return (
//             <div>
                // <MyNavbar />
                // <div className={[['container-fluid'], ['bg-light']].join(' ')}>
                //     <div className={['container']}>
                //         <div className={['row']}>
                //             <div className={['col-sm-4']}>
                //                 <div className={style['column-1']}>
                //                     <div>
                //                         <p>Info</p>
                //                     </div>
                //                     <div>
                //                         <img src={profileimg} alt="" />
                //                         <h5>{fname} {lname}</h5>
                //                         <p>Professional gamer</p>
                //                     </div>
                //                     <div>
                //                         <p>Loyalty Point</p>
                //                     </div>
                //                 </div>
                //             </div>
                //             <div className={['col-sm-8']}>
                //                 <div className={style['column-1']}>
                //                     <ul className="nav nav-tabs" id="myTab" role="tablist">
                //                         <li className="nav-item" role="presentation">
                //                             <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Account Setting</button>
                //                         </li>
                //                         <li className="nav-item" role="presentation">
                //                             <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" onClick={this.getHistoryId}>History</button>
                //                         </li>
                //                     </ul>
                //                     <div className="tab-content" id="myTabContent">
                //                         <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                //                             <div>
                //                                 <p>Details Information</p><hr />
                //                             </div>
                //                             <div className={style['grid-2']}>
                //                                 <Input label="First Name" setValue={fname} name="fname" onChange={e=>setEmail()}/Input>
                //                                 <Input label="Last Name" setValue={lname} name="lname" onChange={e=>setEmail()}/Input>
                //                                 <Input label="email" setValue={email} name="email" onChange={e=>setEmail()}/Input>
                //                                 <Input label="phone number" setValue={phone_number} name="phone_number" onChange={e=>setEmail()}/Input>
                //                             </div>
                //                             <div>
                //                                 <p>Acount and Privacy</p><hr />
                //                             </div>
                //                             <div className={style['privacy']}>
                //                                 <Input label="password"></Input>
                //                                 <Input label="confirm password"></Input>
                //                             </div>
                //                             <MyButton title="update" onClick={this.handleUpdate} />
                //                         </div>
                //                         <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                //                             {this.state.result.map((item) =>
                //                                 <HistoryCard title={item.title} cinema={item.cinema} fname={item.fname} seat={item.seat} time={item.time_stamp} btntitle="Delete" fireEvent={this.handleDelete} key={item.order_Id} />

                //                             )}
                //                         </div>

                //                     </div>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                // </div>
                // <Footer />
//             </div>
//         )
//     }
// }

// export default profilepage
