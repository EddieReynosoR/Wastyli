import { Outlet, Navigate } from "react-router-dom"

// Rutas privadas, donde se requiere de una autenticacion del usuario
const PrivateRoute = () => {
    const user = localStorage.getItem('user_id')
    return(
        user ? <Outlet/> : <Navigate to="/login" replace={true} />
    )
}

export default PrivateRoute