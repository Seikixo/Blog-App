import React, { useMemo, useState } from "react"
import { 
  Card, 
  Avatar, 
  Button, 
  Badge, 
  Spinner,
  Alert
} from "flowbite-react";
import { 
  HiThumbUp, 
  HiThumbDown, 
  HiClock, 
  HiUser
} from "react-icons/hi";
import { usePost } from "../hooks/usePost";
import type { Post } from "../types/types";

function Posts () {
    const { data: posts, isLoading, isError } = usePost();

    const [likedPosts, setLikedPosts] = useState(new Set());
    const [dislikedPosts, setDislikedPosts] = useState(new Set());

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

    const handleLike = (postId: string) => {
        setLikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
            newSet.delete(postId);
        } else {
            newSet.add(postId);
            setDislikedPosts(prevDislikes => {
            const newDislikes = new Set(prevDislikes);
            newDislikes.delete(postId);
            return newDislikes;
            });
        }
        return newSet;
        });
    };

    const handleDislike = (postId: string) => {
        setDislikedPosts(prev => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
            newSet.delete(postId);
        } else {
            newSet.add(postId);
            setLikedPosts(prevLikes => {
            const newLikes = new Set(prevLikes);
            newLikes.delete(postId);
            return newLikes;
            });
        }
        return newSet;
        });
    };

        const renderedPosts = useMemo(() => {
        if (!posts || posts.length === 0) return null;

        return posts.map((post: Post) => (
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
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed break-words">
                {post.content}
            </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
                <Button
                size="xs"
                color={likedPosts.has(post._id) ? "success" : "light"}
                onClick={() => handleLike(post._id)}
                className="flex items-center space-x-1 text-xs cursor-pointer"
                >
                <HiThumbUp className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{(post.likesCount || 0) + (likedPosts.has(post._id) ? 1 : 0)}</span>
                </Button>
                
                <Button
                size="xs"
                color={dislikedPosts.has(post._id) ? "failure" : "light"}
                onClick={() => handleDislike(post._id)}
                className="flex items-center space-x-1 text-xs cursor-pointer"
                >
                <HiThumbDown className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{(post.dislikesCount || 0) + (dislikedPosts.has(post._id) ? 1 : 0)}</span>
                </Button>
            </div>

            {post.updatedAt !== post.createdAt && (
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                <span className="hidden sm:inline">Updated: </span>
                <span className="sm:hidden">Updated </span>
                {formatDate(post.updatedAt)}
                </div>
            )}
            </div>
        </Card>
        ));
    }, [posts, likedPosts, dislikedPosts]);

    if (isLoading) {
        return (
        <div className="flex justify-center items-center py-12">
            <Spinner aria-label="Loading posts" size="xl" />
            <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">
            Loading posts...
            </span>
        </div>
        );
    }

    if (isError) {
        return (
        <Alert color="failure" className="mx-4">
            <span className="font-medium">Error!</span> Failed to load posts. Please try again later.
        </Alert>
        );
    }

    if (!posts || posts.length === 0) {
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
            {posts?.length || 0} post{posts?.length !== 1 ? 's' : ''} available
            </span>
        </div>

        <div className="space-y-4 sm:space-y-6">
            {renderedPosts}
        </div>
        </div>
    );
}

export default React.memo(Posts)