import React, { Component } from 'react'
import style from './Signinpage.module.css'
import bgimg from '../../../assets/image/avenger.png'
import logotickitz from '../../../assets/image/logotickitz.png'
import Input from '../../../components/base/Input'
import MyButton from '../../../components/base/Button'
import Axios from 'axios'


class Signin extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleLogin = (e) => {
        e.preventDefault()
        console.log('handle login dijalankan');
        Axios.post(`${process.env.REACT_APP_API_SIGNIN}`, {
            email: this.state.email,
            password: this.state.password

        }).then((res) => {
            console.log(res);
            if(res.status === 200)
            this.props.history.push('/')
        })
            .catch((err) => {
                console.log(err);
                alert('password salah')
            })
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className={`col-7 ${style.contbg}`}>
                        <img src={bgimg} alt="avenger" />
                        <div className={style.contbgcontent}>
                            <img src={logotickitz} alt="logo" />
                            <h3 style={{ color: 'white', textAlign: 'center', fontSize: '2.5rem' }}>Wait, Watch, Wow!</h3>
                        </div>
                    </div>
                    <div className={`col-5 ${style.contform}`}>
                        <h1 style={{ fontWeight: '700', fontSize: '3rem' }}>Sign in</h1>
                        <p>Sign in with your data that you entered</p>
                        <Input name="email" type="text" placeholder="write your email" label="email" onChange={this.handleChange} />
                        <Input name="password" type="password" placeholder="write your password" label="Password" onChange={this.handleChange} />
                        <MyButton title="Sign in" color="" size="full" onClick={this.handleLogin} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Signin
