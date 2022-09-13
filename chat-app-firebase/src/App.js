import { Routes, Route } from 'react-router-dom'
import './App.css'
import { Navber } from './Component/Navber'
import { HomePage } from './Pages/HomePage'
import { RegisterPage } from './Pages/RegisterPage'
import { LoginPage } from './Pages/LoginPage'
import { UserAuth } from './Component/UserAuth'
import { NeedLogin } from './Component/NeedLogin'
import { Profile } from './Component/Profile'
import { PublicPage } from './Pages/PublicPage'

function App () {
  return (
    <>
      <UserAuth />
      <Navber />
      <Routes>

        <Route path='/register' element={<RegisterPage />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route path='/profile' element={<NeedLogin><Profile /></NeedLogin>}></Route>
        <Route path='/public' element={<NeedLogin><PublicPage /></NeedLogin>}>   </Route>
        <Route path='/' element={<NeedLogin><HomePage /></NeedLogin>}>   </Route>
      </Routes>

    </>
  )
}

export default App
