import React,{useState} from 'react'

import style from './moviedescription.module.css'
import { ebuid, hiflix, cineone } from '../../../../assets/image/index'

function MovieDescription() {
    const [insert, setInsert] = useState({
        image: null,
        title: "",
        genre: "",
        dateShow: "",

    })
    
    return (
        <div className={style["container-flex"]}>
            <div className={style["container-left"]}>
                <h2>Movie Description</h2>
                <div className={style["box-left-movie"]}>
                    <div className={style["left-movie-top"]}>
                        <div className={style["lmt-left"]}>
                            <img src="" alt="" />
                        </div>
                        <div className={style["lmt-right"]}>
                            <div className={style["group-input"]}>
                                <label htmlFor="">Movie Name</label>
                                <input type="text" />
                            </div>
                            <div className={style["group-input"]}>
                                <label htmlFor="">Category</label>
                                <input type="text" />
                            </div>
                            <div className={style["group-input-cont"]}>
                                <div className={style["group-input"]}>
                                    <label htmlFor="">Release Date</label>
                                    <input type="text" />
                                </div>
                                <div className={[style["dura"],style["group-input"]].join(" ")}>
                                    <label htmlFor="">Duration (Hour / Minute)</label>
                                    <div className={style["group-input-dura"]}>
                                        <input type="text" pattern="\d*" maxLength="1"/>
                                        <p>:</p>
                                        <input type="text" pattern="\d*" maxLength="2"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={style["left-movie-middle"]}>
                        <div className={style["group-input"]}>
                            <label htmlFor="">Director</label>
                            <input type="text" />
                        </div>
                        <div className={style["group-input"]}>
                            <label htmlFor="">Casts</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div className={style["left-movie-bot"]}>
                        <div className={style["group-input-synop"]}>
                            <label htmlFor="">Synopsis</label>
                            <textarea name="" id="" cols="30" rows="3"></textarea>
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
                        <img src={ebuid} alt="" />
                        <img src={hiflix} alt="" />
                        <img src={cineone} alt="" />
                        <img src={ebuid} alt="" />
                        <img src={hiflix} alt="" />
                        <img src={cineone} alt="" />
                        <img src={ebuid} alt="" />
                        <img src={hiflix} alt="" />
                        <img src={cineone} alt="" />
                    </div>
                </div>
                <h2>Show Times</h2>
                <div className={style["box-right-date"]}>
                    <input type="date" />
                    <button>+</button>
                </div>
            </div>
        </div>
    )
}

export default MovieDescription
