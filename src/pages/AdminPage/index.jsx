import React from 'react'

import MovieDescription from '../../components/module/AdminPage/MovieDescription'
import SalesChart from '../../components/module/AdminPage/SalesChart'
import MyNavbar from '../../components/module/navbar'
import Footer from '../../components/module/Footer'
import style from './admin.module.css'

function AdminPage() {
    return (
        <>
            <MyNavbar />
            <div className={style["container-fluid"]}>
                <MovieDescription />
                <SalesChart />
            </div>
            <Footer />
        </>
    )
}

export default AdminPage
