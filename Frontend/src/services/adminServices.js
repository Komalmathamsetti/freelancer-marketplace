import axios from "axios";
const API = axios.create({
    baseURL:"http://localhost:5000/api"
});
API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
export const getDashboardStats = ()=>API.get("/admin/dashboard");
export const getAllUsers = ()=>API.get("/admin/users");
export const getAllJobs = ()=>API.get("/admin/jobs");
export const getAllProposals = ()=>API.get("/admin/proposals");
export const deleteProposal = (id)=>API.delete(`/admin/proposals/${id}`);
export const deleteUser = (id)=>API.delete(`/admin/users/${id}`);
export const deleteJob = (id)=>API.delete(`/admin/jobs/${id}`);
export const getPlatformAnalytics = () =>API.get("/admin/analytics");
export const getRecentActivity = () =>API.get("/admin/recent-activity");
export const getPlatformInsights = () =>API.get("/admin/insights");
export const getUserProfile = (id) =>API.get(`/admin/users/${id}`);