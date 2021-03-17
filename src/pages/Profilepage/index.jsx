import React, { Component } from 'react'
import MyNavbar from '../../components/module/navbar'
import Footer from '../../components/module/Footer'
import style from './profile.module.css'
import profileimg from '../../assets/image/Ellipse 11.png'
import Input from '../../components/base/Input'
import MyButton from '../../components/base/Button'
import Axios from 'axios'

class profilepage extends Component {
    state = {
        user: {
            user_Id: '',
            fname: '',
            lname: '',
            phone_number: '',
            email: '',
            password: '',
        }
    }
    componentDidMount() {
        const id = this.props.match.params.iduser
        Axios.get(`${process.env.REACT_APP_API_PROFILE}${id}`)
            .then((res) => {
                this.setState({
                    user: res.data.user[0]
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    handleUpdate = () => {
        console.log('update jalan');
        Axios.put(`${process.env.REACT_APP_API_PROFILE}${this.state.user.user_Id}`, this.state.user)
            .then((res) => {
                console.log(res.data.user);
                alert('update berhasil')
            })
            .catch((err) => {

            })
    }
    handleChange = (e) => {
        let userNew = { ...this.state.user };
        userNew[e.target.name] = e.target.value;
        this.setState({
            user: userNew
        })
    }
    // getHistoryId = () =>{
    //     const id = this.props.match.params.iduser
    //     Axios.get(`http://localhost:8000/ticket/${id}`)
    //         .then((res) => {
    //             console.log(res);
    //             this.setState({
    //                 user: res.data
    //             })
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }


    render() {
        const { fname, lname, phone_number, email } = this.state.user
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
                                    <div>
                                        <img src={profileimg} alt="" />
                                        <h5>{fname} {lname}</h5>
                                        <p>Professional gamer</p>
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
                                            <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false" onClick={this.getHistoryId}>History</button>
                                        </li>
                                    </ul>
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div>
                                                <p>Details Information</p><hr />
                                            </div>
                                            <div className={style['grid-2']}>
                                                <Input label="First Name" setValue={fname} name="fname" onChange={this.handleChange}></Input>
                                                <Input label="Last Name" setValue={lname} name="lname" onChange={this.handleChange}></Input>
                                                <Input label="email" setValue={email} name="email" onChange={this.handleChange}></Input>
                                                <Input label="phone number" setValue={phone_number} name="phone_number" onChange={this.handleChange}></Input>
                                            </div>
                                            <div>
                                                <p>Acount and Privacy</p><hr />
                                            </div>
                                            <div className={style['privacy']}>
                                                <Input label="password"></Input>
                                                <Input label="confirm password"></Input>
                                            </div>
                                            <MyButton title="update" onClick={this.handleUpdate} />
                                        </div>
                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className={style.post}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et voluptates recusandae delectus alias sapiente maxime, ea cum, quae quod, quos obcaecati amet inventore illo atque id quas excepturi nisi? Facilis!</div>
                                            <div className={style.post}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et voluptates recusandae delectus alias sapiente maxime, ea cum, quae quod, quos obcaecati amet inventore illo atque id quas excepturi nisi? Facilis!</div>
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
}

export default profilepage
