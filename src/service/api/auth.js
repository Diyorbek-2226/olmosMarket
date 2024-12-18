import { api } from "../dataService";

export const login = ( data ) => api.post("/login" , data);