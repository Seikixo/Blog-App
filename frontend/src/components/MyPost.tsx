import React, { useMemo } from "react"
import { usePost } from "../hooks/usePost"
import type { Post } from "../types/types";
import { Alert, Avatar, Badge, Card, Spinner } from "flowbite-react";
import { HiClock } from "react-icons/hi";


function MyPost() {
    const {myPosts, isLoadingMyPost, isErrorMyPost} = usePost();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
        });
    };

    const renderingMyPosts = useMemo(() => {
        if(!myPosts || myPosts.length === 0) return null;

        return myPosts.map((post: Post) => (
            <Card key={post._id} className="mb-4 sm:mb-6 hover:shadow-lg transition-shadow duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex items-center space-x-3 mb-4">
                            <Avatar
                            img={`https://ui-avatars.com/api/?name=${encodeURIComponent(post.user.name)}&background=random`}
                            alt={post.user.name}
                            rounded
                            size="sm"
                            className="flex-shrink-0"
                            />
                            <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                {post.user.name}
                                </h4>
                                <Badge color="info" size="xs" className="flex-shrink-0">
                                Author
                                </Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                                <HiClock className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{formatDate(post.createdAt)}</span>
                            </div>
                            </div>
                        </div>
                    </div>
        
                    <div className="mb-4">
                    <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 break-words">
                        {post.title}
                    </h2>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words mb-2">
                        {post.content}
                    </p>
                    <p className="text-xs text-green-600 dark:text-gray-300 leading-relaxed break-words">
                        Likes: {post.likesCount}
                    </p>
                    <p className="text-xs text-red-600 dark:text-gray-300 leading-relaxed break-words">
                        Dislikes: {post.dislikesCount}
                    </p>                    
                    </div>           
            </Card>
        ))
    }, [myPosts])

    if (isLoadingMyPost) {
        return (
        <div className="flex justify-center items-center py-12">
            <Spinner aria-label="Loading posts" size="xl" />
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">
            Loading posts...
            </span>
        </div>
        );
    }

    if (isErrorMyPost) {
        return (
        <Alert color="failure" className="mx-4">
            <span className="font-medium">Error!</span> Failed to load posts. Please try again later.
        </Alert>
        );
    }

    if (!myPosts || myPosts.length === 0) {
        return (
        <Alert color="info" className="mx-4">
            <span className="font-medium">No posts found.</span> Be the first to create a post!
        </Alert>
        );
    }

    return(
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="space-y-4 sm:space-y-6">
                {renderingMyPosts}
            </div>
        </div>
    )
}

export default React.memo(MyPost)