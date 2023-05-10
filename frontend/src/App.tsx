import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route, Navigate} from 'react-router-dom'
import Login from './pages/Login/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, adminLogout } from './redux/admin/adminActions';
import { StateValue } from './interfaces';
function App() {

  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState(true)

  const state = useSelector((state: StateValue) => state)
  const adminData = state.admin.data;
  
  useEffect(() => {
    axios.get('/verifyAdmin').then((response) => {
      dispatch(adminLogin(response.data));
    }).catch((error) => {
      console.log(error);
      dispatch(adminLogout());
    }).finally(() => {
      setLoading(false);
    })
  },[dispatch])

  return (
    <div className="App">
      {
        loading ? 'loading' :
      <Routes>
        <Route path='/login' element={ adminData ? <Navigate to='/'/> : <Login /> } />
        <Route path='/' element={ <Navigate to='/dashboard' />} />
        <Route path='*' element={ adminData ? <Home /> : <Navigate to='/login' /> } />
      </Routes>
      }
    </div>
  );
}

export default App;
