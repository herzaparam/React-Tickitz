import React, { Component } from 'react'
import MyButton from '../../base/Button'
import style from './mycard.module.css'

export class MyCard extends Component {

    

    render() {
        return (
            <div className={style['card']} >
                <img src={`${this.props.img}`} alt="tes" />
                <h5>{this.props.title}</h5>
                <p>{this.props.genre}</p>
                <MyButton title="details" size="full" onClick={this.props.routeChange} color=""/>
            </div>
        )
    }
}

export default MyCard

