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

// Response interceptor to handle token refresh automatically
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // Check if the error is 401 (Unauthorized) and we haven't already retried this request
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // Call the refresh token endpoint
                await axios.post(
                    `${getBaseURL()}/auth/user/refresh-token`,
                    {},
                    { withCredentials: true }
                );
                
                // Retry the original request
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                // If refresh token is also invalid/expired, redirect to login
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default api;

