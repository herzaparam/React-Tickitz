import React from 'react'
import style from './loading.module.css'

function LoadingAnimation() {
    return (
        <div class={style["load-wrapp"]}>
            <div class={style["load-3"]}>
                <p>Loading 3</p>
                <div class={style["line"]}></div>
                <div class={style["line"]}></div>
                <div class={style["line"]}></div>
            </div>
        </div>
    )
}

export default LoadingAnimation
