// pages/_app.js
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Forgotpassword from './pages/Forgotpassword'
import EmailSent from './pages/EmailSent'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotpassword' element={<Forgotpassword />}></Route>
        <Route path='/emailsent' element={<EmailSent />}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
