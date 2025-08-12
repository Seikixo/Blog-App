import React, { useCallback, useEffect, useState } from "react"
import { 
  Spinner,
  Alert,
} from "flowbite-react";
import { 
  HiUser,
} from "react-icons/hi";
import { usePost } from "../hooks/usePost";
import type { Post } from "../interface/interface";
import PostCard from "./PostCard";
import Search from "./Search";

function Posts () {
    const { allPosts, isLoadingAllPost, isErrorAllPost } = usePost();
    const [posts, setPosts] = useState(allPosts);

    useEffect(() => {
        setPosts(allPosts);
    }, [allPosts]);

    const handleSearch = useCallback((text: string) => {
        const filteredPost = allPosts.filter((post: any) => 
            post.title.toLowerCase().includes(text.toLocaleLowerCase())
        );

        setPosts(filteredPost);
    }, [posts])

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

    return (
        <>
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">

            <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Blog Posts
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                Discover and engage with our community posts
                </p>
            </div>
            
            <div className="mb-6 sm:mb-8">
                <Search onChange={handleSearch}/>
            </div>

            <div className="mb-4 sm:mb-6 flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <HiUser className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <span>
                {posts?.length || 0} post{posts?.length !== 1 ? 's' : ''} available
                </span>
            </div>

            <div className="space-y-4 sm:space-y-6">
                {posts?.map((post: Post) => (
                    <PostCard
                        key={post._id}
                        post={post}
                    />
                ))}
            </div>
        </div>
        </>
    );
}

export default React.memo(Posts)