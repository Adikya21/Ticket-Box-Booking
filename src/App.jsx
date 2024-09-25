import './App.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoImg from './assets/logo.png';
import { Button } from "react-bootstrap";
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Routes, Route, useNavigate} from 'react-router-dom';
import Home from './components/Home';
import Movie from './components/Movie';
import SelectSeat from './components/SelectSeat';
import CheckOut from './components/CheckOut';


function App() {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={LogoImg}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Ticket Box
          </Navbar.Brand>
          <Button className='Logout-btn' onClick={() => navigate('/login')}>Logout</Button>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/movies/:id' element={<Movie/>}/>
        <Route path='/select' element={<SelectSeat/>}/>
        <Route path='/success' element={<CheckOut/>}/>
      </Routes>
    </div>
      
  )
}

export default App
