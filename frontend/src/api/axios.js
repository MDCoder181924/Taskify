import axios from 'axios'

const getBaseURL = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        return "https://taskify-b6n9.onrender.com";
    }
    return "http://localhost:3000";
};

const api = axios.create({
    baseURL : getBaseURL(),
    withCredentials:true,
})

export default api;

