import axios from 'axios'

const api = axios.create({
    baseURL : "https://taskify-b6n9.onrender.com",
    withCredentials:true,
})

export default api;

