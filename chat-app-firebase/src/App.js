import { Routes, Route } from 'react-router-dom'
import './styles/global.scss'
import { Navber } from './Component/Navber'
import { HomePage } from './Pages/HomePage'
import { RegisterPage } from './Pages/RegisterPage'
import { LoginPage } from './Pages/LoginPage'
import { UserAuth } from './Component/UserAuth'
import { NeedLogin } from './Component/NeedLogin'
import { Profile } from './Component/Profile'
import { PublicPage } from './Pages/PublicPage'
import VerificationPage from './Pages/VerificationPage'
import PersonalPage from './Pages/PersonalPage'
import ResetPasswordPage from './Pages/ResetPasswordPage'
import { AboutPage } from './Pages/AboutPage'
import { ContactPage } from './Pages/ContactPage'

function App () {
  return (
    <>

      <UserAuth />
      <Navber />
      <Routes>
        {/* if newwlogin page is login,access to the children component, if is not login, redirect to /login */}
        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/profile' element={<NeedLogin><Profile /></NeedLogin>}></Route>
        <Route path='/public' element={<NeedLogin><PublicPage /></NeedLogin>}></Route>
        <Route path='/personal' element={<NeedLogin><PersonalPage /></NeedLogin>}></Route>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/about' element={<AboutPage />}></Route>
        <Route path='/contact' element={<ContactPage />}></Route>
        <Route path='/verification' element={<VerificationPage />}></Route>
        <Route path='/ResetPassword' element={<ResetPasswordPage />}></Route>
      </Routes>

    </>
  )
}

export default App
