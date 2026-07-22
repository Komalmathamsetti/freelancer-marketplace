import axios from "axios";
const API = axios.create({
    baseURL:import.meta.env.VITE_API_URL
});
API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const getDashboardStats = () =>
    API.get("/freelancer/dashboard");
// Saved Jobs
export const getSavedJobs = () =>
    API.get("/freelancer/saved");
export const saveJob = (jobId) =>
    API.post(`/freelancer/save/${jobId}`);
export const removeJob = (jobId) =>
    API.delete(`/freelancer/save/${jobId}`);
// Recommended Jobs
export const getRecommendedJobs = () =>
    API.get("/freelancer/recommended");