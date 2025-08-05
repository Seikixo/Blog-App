import axiosInstance from "./axiosService";


export const getAllPost = async() => {
    try {
        const response = await axiosInstance.get('/posts');
        return response.data;
    }
    catch(error) {
        throw error;
    }
}