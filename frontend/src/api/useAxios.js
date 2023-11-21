import axios from "axios"
import { jwtDecode } from "jwt-decode"
// import jwt_decode from "jwt-decode";

const baseURL = "http://127.0.0.1:8000"


export const axi = axios.create({
    baseURL,
})

// Refrescar tokens si es que se necesita
export const authAxios = axios.create({
    baseURL,
    withCredentials: true,
})

// Hacer peticiones cuando estamos autenticados
authAxios.interceptors.request.use(async (config) => {
    const access = localStorage.getItem('access')

    config.headers = {
        'Authorization': `JWT ${access}`,
    }

    // Ver estado del token
    const decoded = jwtDecode(access)

    // Fecha de expiracion y actual
    const exp = new Date(decoded.exp * 1000)
    const now = new Date()
    const five = 1000 * 60 * 5

    // Si queda 5 minutos, esta a punto de expirar
    if((exp.getTime() - now.getTime()) < five){

        try{
            // Obtenemos nuevo token
            const oldRefresh = localStorage.getItem('refresh')
            const res = await axi.post('/users/refresh/', {oldRefresh})
            const { access, refresh } = res.data
    
            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)

        }catch(err){
            // Borrar localStorage para evitar errores de no autorizado
            localStorage.clear()
            window.location.href = '/login'
        }
    }else{
        console.log('Token still valid')
        return config
    }
    return config
})


