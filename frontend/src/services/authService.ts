import axiosInstance from "./axiosService"

interface Credentials {
    email: string; 
    password: string;
}

export const login = async(credentials: Credentials) => {
    try {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    }
    catch(error) {
        throw error;
    }

}