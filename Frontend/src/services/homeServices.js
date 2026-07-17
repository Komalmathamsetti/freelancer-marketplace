import axios from "axios";
const API = axios.create({
    baseURL:"http://localhost:5000/api"
});
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const getFeaturedJobs = () => API.get("/home/featured-jobs");
export const getCategories = () => API.get("/home/categories");
export const getFeaturedFreelancers = () =>API.get("/home/featured-freelancers");
export const getHomeStats = ()=>API.get("/home/stats");
export const getTestimonials=()=>API.get("/reviews/home-testimonials");