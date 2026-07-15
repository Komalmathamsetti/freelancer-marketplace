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
export const sendMessage = (data) =>
    API.post("/messages/send", data);
export const getConversations = () =>
    API.get("/messages/conversations");
export const getMessages = (userId) =>
    API.get(`/messages/${userId}`);
export const deleteMessage = (id)=>
    API.delete(`/messages/${id}`);