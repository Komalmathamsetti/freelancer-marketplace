import axios from 'axios';
const API = axios.create({
    baseURL:"http://localhost:5000/api",
});
API.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization=`Bearer ${token}`;
    }
    return config;
});
export const getProfile = ()=>API.get("/profile");
export const updateProfile = (data)=>API.put("/profile",data);
export const uploadResume = (formData)=>API.post("/profile/upload-resume",formData,{
    headers:{
        "Content-type":"multipart/form-data",
    },
});
export const generateBio = (data)=>API.post("/ai/generate-bio",data);
export const getFreelancerProfile = (id)=>API.get(`/profile/freelancer/${id}`);