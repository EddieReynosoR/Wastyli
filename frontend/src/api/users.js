import { axi, authAxios } from "./useAxios"
import { jwtDecode } from 'jwt-decode';


export const updateProfile = async (data) => {
    await authAxios.put(`/users/${localStorage.getItem('username')}/`, data)
}

export const userProfile = async (username) => {
    const res = await authAxios.get(`/users/${username}/`)
    return res.data
}

export const userList = async () => {
    const res = await authAxios.get(`/users/`)
    return res.data
}

export const logout = () => { 
    // localStorage.removeItem('access')
    // localStorage.removeItem('refresh')
    // localStorage.removeItem('username')
    // localStorage.removeItem('user_id')
    // localStorage.removeItem('avatar')

    localStorage.clear()

}

export const registerReq = async (data) => {
    await axi.post('/users/register/', data)
}

export const loginReq = async (data) => {
    const res = await axi.post('/users/login/', data)
    const { access, refresh } = res.data 

    localStorage.setItem('access', access)
    localStorage.setItem('refresh', refresh)

    // Decodear tokens del usuario que inicio sesion
    const user = jwtDecode(localStorage.getItem('access'))

    localStorage.setItem('username', user.username)
    localStorage.setItem('user_id', user.user_id)
    localStorage.setItem('avatar', user.avatar)
}

export const googleLogin = async (data) => {

    await axi.post('/users/register/', data)

}


