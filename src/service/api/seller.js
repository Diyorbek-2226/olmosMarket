import { api } from "../dataService";

export const getAll  = () => api.get("/sellers/getAll");
export const registerSeller = (data) => api.post("/sellers/register",data ,{ headers :{
    'Content-Type':"multipart/form-data"
}});

export const updateSeller = (id , data) => api.put("/sellers/update/"+id,data, { headers :{
    'Content-Type':"multipart/form-data"
}});
export const deleteSeller = (id) => 
    api.delete(`/sellers/delete/${id}`);

