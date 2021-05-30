import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

import style from './moviedescription.module.css'
import MyButton from '../../../base/Button'
import Swal from 'sweetalert2'

function MovieDescription() {
    const history = useHistory()

    const [form, setForm] = useState({
        image: null,
        title: "",
        genre: "",
        releaseDate: "",
        hour: "",
        minute: "",
        movieDuration: "",
        dateShow: "",
        director: "",
        casts: "",
        synopsis: "",
        cinemaID: 0,
        cityID: 0,
        date: "",
        time: [],
        preImage: null

    })
    const [loc, setLoc] = useState("Jakarta")
    const [resloc, setResLoc] = useState([])
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_TICKITZ}location/?city=${loc}`)
            .then((res) => {
                setResLoc(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [loc])

  
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const changeImage = (e) => {
        if (e.target.files[0]) {
            setForm({
                ...form,
                preImage: URL.createObjectURL(e.target.files[0]),
                image: e.target.files[0]
            })
        }

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', form.title)
        formData.append('genre', form.genre)
        formData.append('releaseDate', form.releaseDate)
        formData.append('hour', form.hour)
        formData.append('minute', form.minute)
        formData.append('dateShow', form.dateShow)
        formData.append('director', form.director)
        formData.append('casts', form.casts)
        formData.append('synopsis', form.synopsis)
        formData.append('cinemaID', form.cinemaID)
        formData.append('cityID', form.cityID)
        formData.append('date', form.date)
        formData.append('time', form.time)
        formData.append('image', form.image)
        axios.post(`${process.env.REACT_APP_API_TICKITZ}movies/insert-schedule`, formData, { headers: { Authorization: localStorage.getItem('token') } })
            .then((res) => {
                Swal.fire(
                    'Good job!',
                    res.data.message,
                    'success'
                )
                history.push('/profile')

            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err.response.data.message,
                })
            })
    }

    const handleTime = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            time: [...form.time, e.target.value]
        })
    }
  
    return (
        <div className={style["container-flex"]}>
            <div className={style["container-left"]}>
                <h2>Movie Description</h2>
                <div className={style["box-left-movie"]}>
                    <div className={style["left-movie-top"]}>

                        <div className={style["lmt-left"]}>
                            {form.preImage &&
                                <img src={form.preImage} alt="" />
                            }
                        </div>

                        <div className={style["lmt-right"]}>
                            <div className={style["group-input"]}>
                                <label htmlFor="">Movie Name</label>
                                <input onChange={handleChange} name="title" type="text" />
                            </div>
                            <div className={style["group-input"]}>
                                <label htmlFor="">Category</label>
                                <input onChange={handleChange} name="genre" type="text" />
                            </div>
                            <div className={style["group-input-cont"]}>
                                <div className={style["group-input"]}>
                                    <label htmlFor="">Release Date</label>
                                    <input onChange={handleChange} name="releaseDate" type="date" />
                                </div>
                                <div className={[style["dura"], style["group-input"]].join(" ")}>
                                    <label htmlFor="">Duration (Hour / Minute)</label>
                                    <div className={style["group-input-dura"]}>
                                        <input name="hour" type="text" onChange={handleChange} pattern="\d*" maxLength="2" />
                                        <input name="minute" type="text" onChange={handleChange} pattern="\d*" maxLength="2" />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={style["left-movie-middle"]}>
                        <input type="file" onChange={changeImage} />
                        <div className={style["group-input"]}>
                            <label htmlFor="">Director</label>
                            <input onChange={handleChange} name="director" type="text" />
                        </div>
                        <div className={style["group-input"]}>
                            <label htmlFor="">Casts</label>
                            <input onChange={handleChange} name="casts" type="text" />
                        </div>
                    </div>
                    <div className={style["left-movie-bot"]}>
                        <div className={style["group-input-synop"]}>
                            <label htmlFor="">Synopsis</label>
                            <textarea onChange={handleChange} name="synopsis" id="synopsis" cols="30" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style["container-right"]}>
                <h2>Premiere Location</h2>
                <div className={style["box-right-loc"]}>
                    <select name="location" id="location" className={style["loca"]}>
                        <option value="Jakarta">Jakarta</option>
                        <option value="Surabaya">Surabaya</option>
                        <option value="Bandung">Bandung</option>
                    </select>
                    <div className={style["disp-grid"]}>
                        {resloc.length !== 0 ?
                            resloc.map((item) => {
                                return (
                                    <img
                                        src={`${process.env.REACT_APP_API_IMG}${item.image}`}
                                        alt=""
                                        key={item.id}
                                        onClick={e => setForm({
                                            ...form,
                                            cinemaID: item.id,
                                            cityID: item.cityID,
                                        })} />
                                )
                            })
                            :
                            <h2>none</h2>
                        }
                    </div>
                </div>
                <h2>Show Times</h2>
                <div className={style["box-right-date"]}>
                    <input type="date" name="date" onChange={handleChange}/>
                    <div className={style["grid-4"]}>
                        <button className={form.time.includes("08:30AM") ? style["btn-active"] : style["btn"]} value="08:30AM" onClick={handleTime}>08:30AM</button>
                        <button className={form.time.includes("10:30AM") ? style["btn-active"] : style["btn"]} value="10:30AM" onClick={handleTime}>10:30AM</button>
                        <button className={form.time.includes("12:00PM") ? style["btn-active"] : style["btn"]} value="12:00PM" onClick={handleTime}>12:00PM</button>
                        <button className={form.time.includes("02:00PM") ? style["btn-active"] : style["btn"]} value="02:00PM" onClick={handleTime}>02:00PM</button>
                        <button className={form.time.includes("04:30PM") ? style["btn-active"] : style["btn"]} value="04:30PM" onClick={handleTime}>04:30PM</button>
                        <button className={form.time.includes("07:00PM") ? style["btn-active"] : style["btn"]} value="07:00PM" onClick={handleTime}>07:00PM</button>
                        <button className={form.time.includes("08:30PM") ? style["btn-active"] : style["btn"]} value="08:30PM" onClick={handleTime}>08:30PM</button>
                    </div>
                </div>
                <MyButton className="btn-profile" title="Insert" onClick={handleSubmit} />
            </div>
        </div>
    )
}

export default MovieDescription
