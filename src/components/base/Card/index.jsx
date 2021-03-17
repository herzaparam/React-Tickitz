import React, { Component } from 'react'
import style from './card.module.css'

export class Card extends Component {
    render() {
        return (
            <div className={style['card']}>
                <img src={`${this.props.img}`} alt="" style={{width:'100%'}} />
                
                </div>
        )
    }
}

export default Card
