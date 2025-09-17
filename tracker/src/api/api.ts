import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
});

// USERS
export const getUsers = () => api.get("/users");
export const createUser = (data: any) => api.post("/users", data);
export const loginUser = (data: any) => api.post("/auth/login", data);
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
export const getTarantulaById = (id: number) => api.get(`/tarantulas/${id}`);
export const createTarantula = (data: any) => api.post("/tarantulas", data);
export const updateTarantula = (id: number, data: any) => api.put(`/tarantulas/${id}`, data);
export const deleteTarantula = (id: number) => api.delete(`/tarantulas/${id}`);

// FRIENDSHIPS
export const sendFriendRequest = (userId: number, data: { usernameOrEmail: string }) =>
    api.post(`/friendships/request?userId=${userId}`, data);

export const respondToFriendRequest = (userId: number, friendshipId: number, data: { response: string }) =>
    api.put(`/friendships/${friendshipId}/respond?userId=${userId}`, data);

export const getPendingFriendRequests = (userId: number) =>
    api.get(`/friendships/pending?userId=${userId}`);

export const getSentFriendRequests = (userId: number) =>
    api.get(`/friendships/sent?userId=${userId}`);

export const getFriends = (userId: number) =>
    api.get(`/friendships/friends?userId=${userId}`);

export const removeFriend = (userId: number, friendId: number) =>
    api.delete(`/friendships/remove?userId=${userId}&friendId=${friendId}`);

export const blockUser = (userId: number, userToBlockId: number) =>
    api.post(`/friendships/block?userId=${userId}&userToBlockId=${userToBlockId}`);

export const getFriendshipStatistics = (userId: number) =>
    api.get(`/friendships/statistics?userId=${userId}`);
