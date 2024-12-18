import { api } from "../dataService";

export const getCategories = () => api.get("/categories");
export const deleteCategory = (id) => api.delete(`/categories/${id}`);
export const updateCategory = (id,data) => api.put(`/categories/${id}`,data);
