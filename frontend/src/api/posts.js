import { authAxios } from './useAxios'

export const editComment = async (data) => {
    await authAxios.put(`/posts/comment/${data.id}/`, data)
}

export const deleteComment = async (id) => {
    await authAxios.delete(`/posts/comment/${id}/`)
}

export const addComment = async (data) => {
    await authAxios.post(`/posts/comments/${data.id}/`, data)
}

export const getComments = async (id) => {
    const response = await authAxios.get(`/posts/comments/${id}/`)
    return response.data
}

export const like = async (id) => {
    await authAxios.post(`/posts/like/${id}/`)
}

export const deletePost = async (id) => {
    await authAxios.delete(`/posts/${id}/`)
}

export const editPost = async (data) => {
    await authAxios.put(`/posts/${data.get('id')}/`, data)
}

export const getUserPosts = async (username) => { 
    const response = await authAxios.get(`posts/my/${username}`)
    return response.data
} 

export const getSoloPost = async (id) => {
    const response = await authAxios.get(`/posts/${id}/`)
    return response.data
}

export const addPost = async (data) => {
    await authAxios.post("/posts/", data)
}

export const getPosts = async ({pageParam = 1}) => {
    const response = await authAxios.get(`/posts/?page=${pageParam}&pages=10`)

    return response.data
}
