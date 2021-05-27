import React from 'react'
import style from './button.module.css'

function MyButton({ title, color, size, onClick, className }) {
    return (
        <>
            <button onClick={onClick} className={style[`${className}`]}>{title}</button>
        </>
    )
}

export default MyButton
