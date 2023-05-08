import './App.css';
import Home from './pages/Home/Home';
import { Routes, Route} from 'react-router-dom'
import Login from './pages/Login/Login';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' element={ <Login /> } />
        <Route path='*' element={ <Home /> } />
      </Routes>
    </div>
  );
}

export default App;
