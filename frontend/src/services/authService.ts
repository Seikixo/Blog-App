import type { Credentials, RegisterUserPayload } from "../types/types";
import axiosInstance from "./axiosService"

export const login = async(credentials: Credentials) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    }
    catch(error) {
        throw error;
    }

}

export const register = async(registerUserPayload: RegisterUserPayload) => {
    try {
        const response = await axiosInstance.post('/auth/register', registerUserPayload);
        return response.data
    }
    catch(error) {
        throw error;
    }
}