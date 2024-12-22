import { api } from "../dataService"; 


export const createColor = (data) => api.post("/colors/create",data);
export const colorGetAll  = () => api.get("/colors/getAll");
export const colorGetAllId  = (id) => api.get("/colors/getAll"+id);
export const updateColor = (id , data) => api.put("/colors/update/"+id,data, { headers :{
    'Content-Type':"multipart/form-data"
}});