import { NavLink } from 'react-router-dom'


function Configuration() {


  const user = localStorage.getItem('user_id')
    return (
      <>
          <div>
            <p>Configuracion</p>


            

            {user ? <NavLink className="button" activeClassName="active" to="/">
                
                <span className="text" onClick={() => {
                  localStorage.clear()
                  location.reload()
                }}>Log out</span>
            </NavLink> : <span>No ha iniciado sesion</span>}
          </div>
          
      </>
    )
  }
  
  export default Configuration