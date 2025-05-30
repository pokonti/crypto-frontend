import './App.css'
import Detail from './Components/Detail/Detail';
import Home from './Components/Home/Home'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Portfolio from './Components/Portfolio/Portfolio';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Authentication/Login'
import SignUp from './Components/Authentication/SignUp';

function App() {

  return (
    <>
     <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/crypto/:coin_id" element={<Detail />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="*" element={<NotFound />} />
                <Route path='/login' element={<Login/>}/>
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    </>
  )
}

export default App
