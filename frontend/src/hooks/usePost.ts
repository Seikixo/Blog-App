import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getAllPost, myPost } from "../services/postService"
import { likePost as likePostApi, dislikePost as dislikePostApi } from "../services/postService"
import type { Post } from "../types/types";

export const usePost = () => {

    const queryClient = useQueryClient();

    const {data: allPosts, isLoading: isLoadingAllPost, isError: isErrorAllPost} = useQuery({
        queryKey:['all-post'],
        queryFn: getAllPost
    })

    const {data: myPosts, isLoading: isLoadingMyPost, isError: isErrorMyPost} = useQuery({
        queryKey:['my-posts'],
        queryFn: myPost
    })
    
    const likeMutation = useMutation({
        mutationFn: (postId: string) => likePostApi(postId),
        
        onMutate: async (postId: string) => {
            await queryClient.cancelQueries({ queryKey: ['all-post'] });

            const previousPosts = queryClient.getQueryData<Post[]>(['all-post']);

            queryClient.setQueryData<Post[]>(['all-post'], (oldData) => {
                if (!oldData) return oldData;
                return oldData.map((post) =>
                    post._id === postId
                        ? { 
                            ...post, 
                            likesCount: (post.likesCount || 0) + 1
                            }
                        : post
                );
            });

            return { previousPosts };
        },

        onError: (err, _postId, context) => {
            console.error('Failed to like post:', err);
            if (context?.previousPosts) {
                queryClient.setQueryData(['all-post'], context.previousPosts);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['all-post'] });
        },

        onSuccess: (data, postId) => {
            queryClient.setQueryData<Post[]>(['all-post'], (oldData) => {
                if (!oldData) return oldData;
                return oldData.map((post) =>
                    post._id === postId
                        ? { 
                            ...post, 
                            likes: data.likes, 
                            dislikes: data.dislikes,
                            likesCount: data.likesCount || data.likes?.length || 0,
                            dislikesCount: data.dislikesCount || data.dislikes?.length || 0
                            }
                        : post
                );
            });
        }
    })

    const dislikeMutation = useMutation({
        mutationFn: (postId: string) => dislikePostApi(postId),
        
        onMutate: async (postId: string) => {
            await queryClient.cancelQueries({ queryKey: ['all-post'] });
            const previousPosts = queryClient.getQueryData<Post[]>(['all-post']);

            queryClient.setQueryData<Post[]>(['all-post'], (oldData) => {
                if (!oldData) return oldData;
                return oldData.map((post) =>
                    post._id === postId
                        ? { 
                            ...post, 
                            dislikesCount: (post.dislikesCount || 0) + 1
                            }
                        : post
                );
            });

            return { previousPosts };
        },

        onError: (err, _postId, context) => {
            console.error('Failed to like post:', err);
            if (context?.previousPosts) {
                queryClient.setQueryData(['all-post'], context.previousPosts);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['all-post'] });
        },

        onSuccess: (data, postId) => {
            queryClient.setQueryData<Post[]>(['all-post'], (oldData) => {
                if (!oldData) return oldData;
                return oldData.map((post) =>
                    post._id === postId
                        ? { 
                            ...post, 
                            likes: data.likes, 
                            dislikes: data.dislikes,
                            likesCount: data.likesCount || data.likes?.length || 0,
                            dislikesCount: data.dislikesCount || data.dislikes?.length || 0
                            }
                        : post
                );
            });
        }
    })

    const like = async(postId: string) => {
        return likeMutation.mutateAsync(postId);
    }

    const dislike = async(postId: string) => {
        return dislikeMutation.mutateAsync(postId);
    }

    return{
        allPosts,
        myPosts,
        isLoadingAllPost,
        isErrorAllPost,
        isLoadingMyPost,
        isErrorMyPost,
        like,
        dislike,
    }
}