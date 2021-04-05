import React from 'react'
import style from './input.module.css'

function Input({ type, placeholder, name, label, onChange, setValue}) {
    return (
        <div className={['input']}>
            <label className={`${style.label}`} htmlFor={name}>{label}</label><br/>
            <input className={`${style.input}`} value={setValue} name={name} id={name} type={type} placeholder={placeholder} onChange={onChange}/>
        </div>
    )
}

export default Input
