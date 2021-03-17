
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signin from './pages/auth/Signin'
import Signup from './pages/auth/Signup'
import Moviedetails from './pages/Moviedetails'
import Orderpage from './pages/Orderpage'
import Paymentpage from './pages/Paymentpage'
import Profilepage from './pages/Profilepage'

function App() {
  return (
    <div>
    <Router>

      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/moviedetails/:idfilm' component={Moviedetails} />
        <Route path='/orderpage' component={Orderpage} />
        <Route path='/paymentpage' component={Paymentpage} />
        <Route path='/profile/:iduser' component={Profilepage} />

      </Switch>
    </Router>
      </div>
  );
}

export default App;
