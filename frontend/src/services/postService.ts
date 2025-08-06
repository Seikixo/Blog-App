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

export const myPost = async() => {
    try {
        debugger;
        const response = await axiosInstance.get('/posts/me');
        return response.data;
    }
    catch(error) {
        throw error;
    }    
}

export const likePost = async(postId: string) => {
    try {
        const response = await axiosInstance.post(`/posts/${postId}/like`);
        return response.data;
    }
    catch(error) {
        throw error;
    }
}

export const dislikePost = async(postId: string) => {
    try {
        const response = await axiosInstance.post(`/posts/${postId}/dislike`);
        return response.data;
    }
    catch(error) {
        throw error;
    }
}