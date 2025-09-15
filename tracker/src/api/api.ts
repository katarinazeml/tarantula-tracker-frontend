import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// USERS
export const getUsers = () => api.get("/users");
export const createUser = (data: any) => api.post("/users", data);
export const loginUser = (data: any) => api.post("/login", data); // NEW
export const updateUser = (id: number, data: any) => api.put(`/users/${id}`, data);
export const deleteUser = async (id: number) => {
    try {
        return await api.delete(`/users/${id}`);
    } catch (error) {
        console.error('Delete user error:', error);
        throw error;
    }
};

// TARANTULAS
export const getTarantulas = () => api.get("/tarantulas");
export const createTarantula = (data: any) => api.post("/tarantulas", data);
export const updateTarantula = (id: number, data: any) => api.put(`/tarantulas/${id}`, data);
export const deleteTarantula = (id: number) => api.delete(`/tarantulas/${id}`);
