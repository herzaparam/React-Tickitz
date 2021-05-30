import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home, Signin, Signup, Moviedetails, Orderpage, Paymentpage, Profilepage, ViewFilm, ForgotPass, TicketResult, AdminPage } from '../../pages'
import ProtectedRoute from './module/protectedRoute'
import ScrollToTop from '../helpers/ScrollToTop.js'
import AdminRoute from './module/AdminRoute'

function MainRouter() {

  return (
    <Router>
      <ScrollToTop />
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
        <AdminRoute path='/admin-page' component={AdminPage} />
      </Switch>
    </Router>
  )
}

export default MainRouter
