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
        const response = await axiosInstance.get('/posts/me');
        return response.data;
    }
    catch(error) {
        throw error;
    }    
}

export const createPost = async(newPost: { title: string; content: string }) => {
    try {
        const response = await axiosInstance.post('/posts', newPost);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updatePost = async(postId: string, updatedData: { title?: string; content?: string }) => {
    try {
        const response = await axiosInstance.put(`/posts/${postId}`, updatedData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePost = async(postId: string) => {
    try {
        const response = await axiosInstance.delete(`/posts/${postId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

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