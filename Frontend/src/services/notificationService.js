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
export const getNotifications = async()=>API.get("/notifications");
export const markAsRead = async(id)=>API.patch(`/notifications/${id}/read`);
export const markAllAsRead = async()=>API.patch("/notifications/read-all");
export const deleteNotification = async(id)=>API.delete(`/notifications/${id}`);