import React from 'react'
import style from './button.module.css'

function MyButton({title, color, size, onClick}) {
    return (
    
        <div>
            <button onClick={onClick}  className={`${style.btn} ${style[color]} ${style[size]}`}>{title}</button>
        </div>
    )
}

export default MyButton
