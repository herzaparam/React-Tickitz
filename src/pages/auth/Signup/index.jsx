import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { bgimg, logotickitz, tickitzpurpleimg, googleicon, fbicon } from '../../../assets/image/'
import style from './Signuppage.module.css'
import Input from '../../../components/base/Input'
import MyButton from '../../../components/base/Button'
import Axios from 'axios'

class Signup extends Component {
    constructor() {
        super()
        this.state = {
           user :{
                email: '',
                password: '',
                errEmail: '',
                errPassword: ''
           },
           isLoading: false
            
            }
    }
    handleChange = (e) => {
        this.setState({
                user:{
                ...this.state.user,
                    [e.target.name]: e.target.value
            }
            })
    }
    validate = () => {
        let errEmail = '';
        let errPassword = '';
        if (this.state.user.email === '') {
            errEmail = "email can't be empty"
        } else if (!this.state.user.email.includes('@')) {
            errEmail = 'make sure your email include "@"'
        }
        if (errEmail) {
            console.log(errEmail);
            this.setState({ user:{errEmail}});
            
            return false;
        }
        if (this.state.user.password === '') {
            errPassword = "password can't be empty"
        }
        if (errPassword) {
            this.setState({user:{ errPassword} });
            return false
        }
        return true
    }

    handleRegister = (e) => {
        e.preventDefault()
        const isValid = this.validate();
        if (isValid) {
            Axios.post(`${process.env.REACT_APP_API_TICKITZ}user/register`, {
                email: this.state.user.email,
                password: this.state.user.password
            }).then((res) => {
                console.log(res);
                this.props.history.push('/signin')
            }).catch((err) => {
                alert('email has already registered')
            })
        }

    }


    render() {
        return (
            
            <div className={style['container']}>
                <div className={style['container-bg']}>
                    <img src={bgimg} alt="" srcSet="" />
                    <div className={style['container-bg-content']}>
                        <img src={logotickitz} alt="" srcSet="" />
                        <h2>Wait, Watch, Wow!</h2>
                    </div>
                </div>
                <div className={style['container-form']}>
                    <section className={style['box0']}>
                        <img src={tickitzpurpleimg} alt="" />
                    </section>
                    <section className={style['box1']}>
                        <h3>Sign Up</h3>
                        <h4>You can sign up here</h4>
                    </section>
                    <section className={style['box2']}>
                        <form action="">
                            <Input name="email" type="text" placeholder="write your email" label="email" onChange={this.handleChange} />
                            <div className={style.errEmail}>{this.state.user.errEmail}</div><br />
                            <Input name="password" type="password" placeholder="write your password" label="Password" onChange={this.handleChange} />
                            <div className={style.errEmail}>{this.state.user.errPassword}</div><br />
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
                                <button className={style['btn']}> <img src={googleicon} alt="" srcSet="" /><p>Google</p></button>
                                <button className={style['btn']}> <img src={fbicon} alt="" srcSet="" /><p>Facebook</p></button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        )
    }
}
// const mapStateToProps = (state) => {
//     return {
//         user: state.user
//     }
// }
// const mapDispatchToProps = (dispatch) => ({
//     handleRegister: () => {
//         dispatch(register());
//     }
// })
export default Signup
