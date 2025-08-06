import type { UpdateUserPayload } from "../types/types";
import axiosInstance from "./axiosService"

export const getUserProfile = async() => {
    try {
        const response = await axiosInstance.get('/users/profile');
        return response.data;
    }
    catch(error) {
        throw error;
    }
}

export const updateUserProfile = async(data: UpdateUserPayload) => {
    try {
        const response = await axiosInstance.put('/users/profile', data);
        return response.data;        
    }
    catch(error) {
        throw error;
    }
}