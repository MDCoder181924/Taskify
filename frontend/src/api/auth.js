import api from './axios'

export const getProfile = async()=>{
    const res  = await api.get("/auth/user/profile")
    return res.data;
}