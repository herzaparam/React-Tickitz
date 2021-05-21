import React, { useState, useEffect } from 'react'
import style from './Signinpage.module.css'
import { bgimg, logotickitz, tickitzpurpleimg, googleicon, fbicon } from '../../../assets/image/'
import Input from '../../../components/base/Input'
import MyButton from '../../../components/base/Button'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { login } from '../../../configs/redux/actions/user'
import Swal from 'sweetalert2'
import qs from 'query-string'
import axios from 'axios'

function Signin() {
    const dispatch = useDispatch()
    let location = useLocation();
    const history = useHistory()
    const urlApi = process.env.REACT_APP_API_TICKITZ

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email,
            password
        }
        dispatch(login(data))
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Login Success!',
                    text: `hi ${res.email}`,
                    showConfirmButton: false,
                    timer: 2000
                })
                history.push('/')
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
    }
    useEffect(() => {
        const { email, token } = qs.parse(location.search)
        if (location.search) {
            axios.get(`${urlApi}user/verify/?email=${email}&token=${token}`)
                .then((res) => {
                    console.log(res);
                    Swal.fire({
                        icon: 'success',
                        title: `Congratulation!`,
                        text: res.data.messge,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.push('/signin')
                })
                .catch((err) => {
                    if(err.response.data.message === 'secretKey is not defined'){
                        return Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: "something went wrong",
                        })
                    }
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.response.data.message,
                    })
                })
        }
    }, [location])

    return (
        <div className={style['container']}>
            <div className={style['container-bg']}>
                <img src={bgimg} alt="" />
                <div className={style['container-bg-content']}>
                    <img src={logotickitz} alt="" />
                    <h2>Wait, Watch, Wow!</h2>
                </div>
            </div>
            <div className={style['container-form']}>
                <section className={style['box0']}>
                    <img src={tickitzpurpleimg} alt="" />
                </section>
                <section className={style['box1']}>
                    <h3>Sign In</h3>
                    <h4>Sign in with your data that you entered during registration </h4>
                </section>
                <section className={style['box2']}>
                    <form action="">
                        <Input name="email" setValue={email} type="text" placeholder="write your email" label="email" onChange={(e) => setEmail(e.target.value)} /><br />
                        <Input name="password" setValue={password} type="password" placeholder="write your password" label="Password" onChange={(e) => setPassword(e.target.value)} /><br />
                        <MyButton title="Sign in" color="" size="full" onClick={handleLogin} />
                    </form>
                    <p className={style['f-password']}>Forgot your password? <Link to="/forgot-password">Reset now</Link></p>
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
                            <button className={style['btn']}> <img src={googleicon} alt="" /><p>Google</p></button>
                            <button className={style['btn']}> <img src={fbicon} alt="" /><p>Facebook</p></button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}
export default Signin


// class Signin extends Component {
    // handleChange = (e) => {
    //     this.setState({
    //         user:{
    //             ...this.props.user,
    //         [e.target.name]: e.target.value
    //     }
    //     })
    // }
    // handleLogin = (e) => {
    //     e.preventDefault()
    //     const data ={
    //         email: this.props.user.email,
    //         password: this.props.user.password
    //     }

//         // this.props.login(data)
//         // Axios.post(`${process.env.REACT_APP_API_TICKITZ}user/login`, {
//         //     email: this.state.email,
//         //     password: this.state.password
//         // }).then((res) => {
//         //     if (res.status === 200)
//         //         localStorage.setItem('token', res.data.result.token)
//         //     this.props.history.push('/')
//         // })
//         // .catch((err) => {
//         //     console.log(err);
//         //     alert('password salah')
//         // })
//     }


//     render() {
//         console.log(this.props);
//         return (
            // <div className={style['container']}>
            //     <div className={style['container-bg']}>
            //         <img src={bgimg} alt="" />
            //         <div className={style['container-bg-content']}>
            //             <img src={logotickitz} alt="" />
            //             <h2>Wait, Watch, Wow!</h2>
            //         </div>
            //     </div>
            //     <div className={style['container-form']}>
            //         <section className={style['box0']}>
            //             <img src={tickitzpurpleimg} alt="" />
            //         </section>
            //         <section className={style['box1']}>
            //             <h3>Sign In</h3>
            //             <h4>Sign in with your data that you entered during registration </h4>
            //         </section>
            //         <section className={style['box2']}>
            //             <form action="">
            //                 <Input name="email" type="text" placeholder="write your email" label="email" onChange={this.handleChange} /><br />
            //                 <Input name="password" type="password" placeholder="write your password" label="Password" onChange={this.handleChange} /><br />
            //                 <MyButton title="Sign in" color="" size="full" onClick={this.handleLogin} />
            //             </form>
            //             <p className={style['f-password']}>Forgot your password? <Link to="">Reset now</Link></p>
            //         </section>
            //         <section className={style['box3']}>
            //             <div className={style['line1']}><hr /></div>
            //             <div className={style['line2']}>
            //                 <p>Or</p>
            //             </div>
            //             <div className={style['line3']}><hr /></div>
            //         </section>
            //         <section className={style['box4']}>
            //             <form action="" className="api">
            //                 <div className={style['btn-div']}>
            //                     <button className={style['btn']}> <img src={googleicon} alt="" /><p>Google</p></button>
            //                     <button className={style['btn']}> <img src={fbicon} alt="" /><p>Facebook</p></button>
            //                 </div>
            //             </form>
            //         </section>
            //     </div>
            // </div>

//         )
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         user: state.userReducer.user
//     }
// }
// const mapDispatchToProps = (dispatch) => ({
//     login: (data) => {
//         dispatch(login(data))
//     }
// })


// export default connect(mapStateToProps, mapDispatchToProps)(Signin)
