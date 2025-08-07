import React from "react"
import { 
  Spinner,
  Alert,
} from "flowbite-react";
import { 
  HiUser,
} from "react-icons/hi";
import { usePost } from "../hooks/usePost";
import type { Post } from "../types/types";
import PostCard from "./PostCard";

function Posts () {
    const { allPosts, isLoadingAllPost, isErrorAllPost } = usePost();

    if (isLoadingAllPost) {
        return (
        <div className="flex justify-center items-center py-12">
            <Spinner aria-label="Loading posts" size="xl" />
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">
            Loading posts...
            </span>
        </div>
        );
    }

    if (isErrorAllPost) {
        return (
        <Alert color="failure" className="mx-4">
            <span className="font-medium">Error!</span> Failed to load posts. Please try again later.
        </Alert>
        );
    }

    if (!allPosts || allPosts.length === 0) {
        return (
        <Alert color="info" className="mx-4">
            <span className="font-medium">No posts found.</span> Be the first to create a post!
        </Alert>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Blog Posts
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Discover and engage with our community posts
                </p>
            </div>

            <div className="mb-4 sm:mb-6 flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <HiUser className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>
                {allPosts?.length || 0} post{allPosts?.length !== 1 ? 's' : ''} available
                </span>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {allPosts.map((post: Post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))}
            </div>
        </div>
    );
}

export default React.memo(Posts)