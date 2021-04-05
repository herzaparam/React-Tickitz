import React from 'react'
import { Redirect, Route } from 'react-router-dom'

function ProtectedRoute({ component: Component, ...rest }) {
    const isLoggedIn = localStorage.getItem('token')
    return <Route {...rest} render={(props) => {
        if (isLoggedIn) {
            return <Component {...props} />
        } else {
            return <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        }
    }} />

}

export default ProtectedRoute
