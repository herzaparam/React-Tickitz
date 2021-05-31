import React, { useState } from 'react'

import style from './saleschart.module.css'
import GraphCard from '../GraphCard'

function SalesChart() {

    const [active, setActive] = useState(1)

    return (
        <>
            <div className={style["cont-sales"]}>
                <h2>Sales Chart</h2>
                <div className={style["cont-sales-right"]}>
                    <button>08:30am</button>
                    <button>10:30pm</button>
                    <button>12:00pm</button>
                </div>

            </div>
            <div className={style["graph"]}>
                <header className={style["graph-top"]}>
                    <button className={active === 1 && style["active"]} onClick={e => setActive(1)}>Based On Movie</button>
                    <button className={active === 2 && style["active"]} onClick={e => setActive(2)}>Based On Location</button>
                </header>
                <main className={style["graph-mid"]}>
                    <GraphCard />
                    <GraphCard />
                    <GraphCard />
                </main>
            </div>
        </>
    )
}

export default SalesChart
