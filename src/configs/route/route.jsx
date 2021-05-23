import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Signin, Signup, Moviedetails, Orderpage, Paymentpage, Profilepage, ViewFilm, ForgotPass, TicketResult } from '../../pages'
import ProtectedRoute from './module/protectedRoute'


function MainRouter() {
 
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/forgot-password' component={ForgotPass} />
        <Route path='/moviedetails/:idfilm' component={Moviedetails} />
        <ProtectedRoute path='/orderpage' component={Orderpage} />
        <ProtectedRoute path='/paymentpage' component={Paymentpage} />
        <ProtectedRoute path='/ticket-result/:order' component={TicketResult} />
        <ProtectedRoute path='/profile' component={Profilepage} />
        <Route path='/allmovies' component={ViewFilm} />
      </Switch>
    </Router>
  )
}

export default MainRouter
