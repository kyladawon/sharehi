// pages/_app.js
import './index.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Forgotpassword from './pages/Forgotpassword'
import EmailSent from './pages/EmailSent'
import Search from './pages/Search'
import RecieverProfile from './pages/ReceiverProfile'
import RecieverProfileEdit from './pages/RecieverProfileEdit'
import ReceiverProfileViewOnly from './pages/ReceiverProfileViewOnly'
import Setting from './pages/Setting'
import DonatorSetting from './pages/DonatorSetting';
import DonatorProfile from './pages/DonatorProfile';
import DonatorProfileEdit from './pages/DonatorProfileEdit';
import DonationConfirm from './pages/DonationConfirm'
import ProtectedRoute from './components/ProtectedRoute';



function App() {

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/forgotpassword' element={<Forgotpassword />}></Route>
        <Route path='/emailsent' element={<EmailSent />}></Route>
        <Route path='/search' element={<ProtectedRoute><Search /></ProtectedRoute>}></Route>
        <Route path='/recieverprofile' element={<ProtectedRoute><RecieverProfile /></ProtectedRoute>}></Route>
        <Route path='/recieveredit' element={<ProtectedRoute><RecieverProfileEdit /></ProtectedRoute>}></Route>
        <Route path='/setting' element={<ProtectedRoute><Setting /></ProtectedRoute>}></Route>
        <Route path='/donatorsetting' element={<ProtectedRoute><DonatorSetting /></ProtectedRoute>}></Route>
        <Route path='/donatorprofile' element={<ProtectedRoute><DonatorProfile /></ProtectedRoute>}></Route>
        <Route path='/donatoredit' element={<ProtectedRoute><DonatorProfileEdit /></ProtectedRoute>}></Route>
        <Route path='/donationconfirmed' element={<DonationConfirm />}></Route>
        <Route path="/receiver/:receiverId/view" element={<ReceiverProfileViewOnly />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
