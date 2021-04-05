import React, { Component } from 'react'
import style from './history.module.css'
import MyButton from '../Button'

export class HistoryCard extends Component {
    render() {
        return (
                <div className={style.post}>
                    <div className={style.postdiv}>
                        <h5>{this.props.title}</h5>
                    </div>
                    <div className={style.postdiv}>
                        <p>Cinema :</p>
                        <p>{this.props.cinema}</p>
                    </div>
                    <div className={style.postdiv}>
                        <p>User :</p>
                        <p>{this.props.fname}</p>
                    </div>
                    <div className={style.postdiv}>
                        <p>Seat :</p>
                        <p>{this.props.seat}</p>
                    </div>
                    <div className={style.postdiv}>
                        <p>time :</p>
                        <p>{this.props.time}</p>
                    </div>
                    <MyButton title={this.props.btntitle} onClick={this.props.fireEvent}/>
                </div>
            
        )
    }
}

export default HistoryCard
