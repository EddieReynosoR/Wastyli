import './css/sidebar.css'
import { Link, NavLink } from 'react-router-dom'
import Logo from './images/WastilyLogo.png'


function SideBar() {

    const username = localStorage.getItem('username')
  return (
    <>  

        <div className="sidebar">
            
            <ul>
                <NavLink className="button" to="/">
                    <img className="logo" src={Logo}  />
                </NavLink>
                
                
                <li className="list">
                <NavLink className="button" activeClassName="active" to="/">
                    <span className="icon">
                    <ion-icon name="photos"></ion-icon>
                    </span>
                    <span className="text">Publicaciones</span>
                    </NavLink>
                </li>
                <li className={`list ${username ? '' : 'nodisplay'}`}>
                    <NavLink className="button" activeClassName="active" to={username}>
                        <span className="icon">
                        <ion-icon name="photos"></ion-icon>
                        </span>
                        <span className="text">Cuenta</span>
                        </NavLink>
                </li>
                <li className="list"> 
                    <NavLink className="button" activeClassName="active" to="/grupos"><span className="icon">
                        <ion-icon name="people"></ion-icon>
                    </span>
                    <span className="text">Grupos</span>
                    </NavLink>
                </li>
                <li className="list">
                    <NavLink className="button" activeClassName="active" to="/configuracion"><span className="icon">
                        <ion-icon name="settings">
                        </ion-icon>
                    </span>
                    <span className="text">Configuracion</span>
                    </NavLink>
                </li>
                

            </ul>
        </div>
          
    </>
  )
}

export default SideBar