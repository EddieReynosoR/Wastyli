import './css/navbar.css'
import Logo from './images/WastilyLogo.png'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

// import LogIn from './LogIn'
// import PP from './ProfilePicture'



function NavBar() {
  // const { isAuthenticated } = useAuth0();

  const user = localStorage.getItem('user_id')

  

  return (
    
    <>  
        <div className="navbar">
         
            <p>Menu Principal</p>
            
            {/* <div className="login">
              { isAuthenticated ? <PP/> : <LogIn/> }
              
            </div> */}

            {/* <NavLink className="button" activeClassName="active" to="/login">
                
                <span className="text">Login</span>
            </NavLink> */}

         
            
             
        </div>
          
    </>
  )
}

export default NavBar