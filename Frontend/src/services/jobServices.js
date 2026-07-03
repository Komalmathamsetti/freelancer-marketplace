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