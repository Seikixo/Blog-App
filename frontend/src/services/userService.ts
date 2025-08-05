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