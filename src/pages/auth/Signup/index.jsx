import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './Signuppage.module.css'
import bgimg from '../../../assets/image/avenger.png'
import logotickitz from '../../../assets/image/logotickitz.png'
import googleicon from '../../../assets/image/googleicon.png'
import fbicon from '../../../assets/image/fbicon.png'
import Input from '../../../components/base/Input'
import MyButton from '../../../components/base/Button'
import Axios from 'axios'

class Signup extends Component {
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
    handleRegister = (e) => {
        e.preventDefault()
        Axios.post(`${process.env.REACT_APP_API_SIGNUP}`, {
            email: this.state.email,
            password: this.state.password

        }).then((res) => {
            console.log(res);
            this.props.history.push('/signin')

        }).catch((err) => {
                console.log(err);
                alert('salah')
            })
    }

    render() {
        return (
            <body>
                <div className={style['container']}>
                    <div className={style['container-bg']}>
                        <img src={bgimg} alt="" srcset="" />
                        <div className={style['container-bg-content']}>
                            <img src={logotickitz} alt="" srcset="" />
                            <h2>Wait, Watch, Wow!</h2>
                        </div>
                    </div>
                    <div className={style['container-form']}>
                        <section className={style['box0']}>
                            <img src="/Sign in/image/tickitzlogo.png" alt="" />
                        </section>
                        <section className={style['box1']}>
                            <h3>Sign Up</h3>
                            <h4>You can sign up here</h4>
                        </section>
                        <section className={style['box2']}>
                            <form action="">
                                <Input name="email" type="text" placeholder="write your email" label="email" onChange={this.handleChange} /><br />
                                <Input name="password" type="password" placeholder="write your password" label="Password" onChange={this.handleChange} /><br />
                                <MyButton title="Sign up" color="" size="full" onClick={this.handleRegister} />
                            </form>
                            <p className={style['f-password']}>Forgot your password? <Link to="">Reset now</Link></p>
                        </section>
                        <section className={style['box3']}>
                            <div className={style['line1']}><hr /></div>
                            <div className={style['line2']}>
                                <p>Or</p>
                            </div>
                            <div className={style['line3']}><hr /></div>
                        </section>
                        <section className={style['box4']}>
                            <form action="" className="api">
                                <div className={style['btn-div']}>
                                    <button className={style['btn']}> <img src={googleicon} alt="" srcset="" /><p>Google</p></button>
                                    <button className={style['btn']}> <img src={fbicon} alt="" srcset="" /><p>Facebook</p></button>

                                </div>

                            </form>
                        </section>
                    </div>
                </div>
            </body>
        )
    }
}
export default Signup
