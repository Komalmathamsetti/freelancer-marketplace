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
export const createJob = (data)=>API.post("/jobs",data);
export const getAllJobs = ()=>API.get("/jobs");
export const getSingleJob = (id)=>API.get(`/jobs/${id}`);
export const getMyJobs = () => API.get("/jobs/my-jobs");
export const updateJob = (id,data)=>API.put(`/jobs/${id}`,data);
export const deleteJob = (id)=>API.delete(`/jobs/${id}`);
export const getDashboardStats = ()=>API.get("/jobs/dashboard-stats");