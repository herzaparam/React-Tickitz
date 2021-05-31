import React, { useState } from 'react'


import style from './graphcard.module.css'

function GraphCard() {

    const [active, setActive] = useState(1)

    return (
        <div className={style["card"]}>
            <h4>Movie Title</h4>
            <div className={style["tabs"]}>
                <button className={active === 1 && style["active"]} onClick={e => setActive(1)}>Weekly</button>
                <button className={active === 2 && style["active"]} onClick={e => setActive(2)}>Monthly</button>
                <button className={active === 3 && style["active"]} onClick={e => setActive(3)}>Yearly</button>
            </div>
            <div className={style["main-tabs"]}>
               
            </div>
        </div>
    )
}

export default GraphCard
