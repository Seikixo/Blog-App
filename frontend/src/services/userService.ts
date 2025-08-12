import type { UpdateUserPayload } from "../interface/interface";
import axiosInstance from "./axiosService"

export const getUserProfile = async() => {
    try {
        const response = await axiosInstance.get('/users/profile');
        return response.data;
    }
    catch(error: any) {
        const serverMessage = error.response?.data?.message || error.message;
        throw new Error(serverMessage);
    }
}

export const updateUserProfile = async(data: UpdateUserPayload) => {
    try {
        const response = await axiosInstance.put('/users/profile', data);
        return response.data;        
    }
    catch(error: any) {
        const serverMessage = error.response?.data?.message || error.message;
        throw new Error(serverMessage);
    }
}