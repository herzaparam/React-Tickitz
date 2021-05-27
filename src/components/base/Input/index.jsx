import React from 'react'
import style from './input.module.css'

function Input({className, type, placeholder, name, label, onChange, setValue, disabled}) {
    return (
        <div className={['input']}>
            <label className={`${style.label}`} htmlFor={name}>{label}</label><br/>
            <input className={style[`${className}`]} value={setValue} name={name} id={name} type={type} placeholder={placeholder} onChange={onChange} disabled={disabled}/>
        </div>
    )
}

export default Input
