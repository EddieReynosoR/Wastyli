
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SideBar from './components/sidebar'
import NavBar from './components/navbar'
import Publicaciones from './pages/publicaciones'
import Grupos from './pages/grupos'
import Configuracion from './pages/configuracion'
import './app.scss'
// import Profile from './pages/profile'
import Feed from './pages/Feed'
import Register from './pages/Register'
import UserProfile from './pages/userProfile'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
// import PP from './components/ProfilePicture'


import Home from "./pages/Home"
import LoginPage from "./pages/LoginPage"
import SoloPost from './pages/SoloPost'

function App() {

  return (
    <Router>

      
      <Routes>

        <Route path='/' element={<Layout/>} >

          <Route element={<PrivateRoute/>}>
            
            <Route path='/:username' exact={true} element={<UserProfile/>}/>
            <Route path="/post/:id" element={<SoloPost/>} />
            <Route path="/" element={<Feed/>} />
            <Route exact path='/publicaciones' element={<Publicaciones/>}/>
            <Route path='/grupos' exact={true} element={<Grupos/>}/>
            <Route path='/configuracion' exact={true} element={<Configuracion/>}/>

          </Route>

        </Route>

          
          
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<LoginPage/>} />
          
      </Routes>
      
    </Router>
  )
}

export default App
