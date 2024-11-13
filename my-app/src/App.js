// pages/_app.js
import './index.css'
import { ProfileProvider } from './contexts/ProfileContext';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Forgotpassword from './pages/Forgotpassword'
import EmailSent from './pages/EmailSent'
import Search from './pages/Search'
import RecieverProfile from './pages/ReceiverProfile'
import RecieverProfileEdit from './pages/RecieverProfileEdit'
import Setting from './pages/Setting'
import DonatorSetting from './pages/DonatorSetting';
import DonatorProfile from './pages/DonatorProfile';
import DonatorProfileEdit from './pages/DonatorProfileEdit';


function App() {

  return (
    <ProfileProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotpassword' element={<Forgotpassword />}></Route>
        <Route path='/emailsent' element={<EmailSent />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/recieverprofile' element={<RecieverProfile />}></Route>
        <Route path='/recieveredit' element={<RecieverProfileEdit />}></Route>
        <Route path='/setting' element={<Setting />}></Route>
        <Route path='/donatorsetting' element={<DonatorSetting />}></Route>
        <Route path='/donatorprofile' element={<DonatorProfile />}></Route>
        <Route path='/donatoredit' element={<DonatorProfileEdit />}></Route>
      </Routes>
    </BrowserRouter>
    </ProfileProvider>
  )
}

export default App
