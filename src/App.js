import './App.css';
import { Provider } from 'react-redux'
import  store  from './configs/redux/store'
import Route from './configs/route/route'


function App() {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
}

export default App;
