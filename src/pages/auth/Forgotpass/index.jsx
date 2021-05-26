import React, { useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import qs from 'query-string'

import style from './forgotpass.module.css'
import { bgimg, logotickitz } from '../../../assets/image'
import MyButton from '../../../components/base/Button'
import Swal from 'sweetalert2'
import axios from 'axios'

function ForgotPass() {
    const urlApi = process.env.REACT_APP_API_TICKITZ
    let location = useLocation();
    const history = useHistory();

    const [email, setEmail] = useState("")
    const [dataPassword, setDataPassword] = useState({
        password: "",
        confirmPassword: ""
    })

    const handleChange = (e) => {
        const newDataPassword = { ...dataPassword }
        newDataPassword[e.target.name] = e.target.value;
        setDataPassword(newDataPassword)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${urlApi}user/forgot-password`, { email: email })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'we found your account!',
                    text: 'Please check your email to reset your password',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.message,
                })
            })
    }
    const handleReset = () => {
        const { email, token } = qs.parse(location.search)
        axios.put(`${urlApi}user/reset-password/?email=${email}&token=${token}`, { password: dataPassword.password })
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'password has been change!',
                    text: 'Now you can login with your new password',
                    showConfirmButton: false,
                    timer: 1500
                })
                history.push("/signin")
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
    }

    return (
        <div className={style['container']}>
            <div className={style['container-bg']}>
                <img src={bgimg} alt="" />
                <div className={style['container-bg-content']}>
                    <img src={logotickitz} alt="" />
                    <h2>Let's reset your password</h2>
                    <h5>To be able to use your account again, please complete the following steps.</h5>
                </div>
            </div>
            <div className={style['container-form']}>
                {location.search ?
                    <>
                        <label htmlFor="" className={style["form-label"]}>new password</label>
                        <input name="password" type="password" onChange={handleChange} />
                        <label htmlFor="" className={style["form-label"]}>new password confirmation</label>
                        <input name="confirmPassword" type="password" onChange={handleChange} />
                        <MyButton title="Reset" size="full" onClick={handleReset} />
                    </>
                    :
                    <>
                        <div className={style["container-form-title"]}>
                            <h3>Fill your complete email</h3>
                            <h4>we'll send a link to your email shortly</h4>
                        </div>
                        <form action="">
                            <label htmlFor="" className={style["form-label"]}>Your Email</label>
                            <input type="text" onChange={(e) => setEmail(e.target.value)} />
                            <MyButton title="Reset" size="full" onClick={handleSubmit} />
                        </form>
                    </>
                }

            </div>
        </div>
    )
}

export default ForgotPass
