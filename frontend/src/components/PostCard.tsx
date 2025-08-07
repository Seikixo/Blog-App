import React from "react"
import { 
  Card, 
  Avatar, 
  Badge, 
} from "flowbite-react";
import { 

  HiClock, 
} from "react-icons/hi";
import type { Post } from "../types/types";
import Reaction from "./Reaction";

interface PostCardProps {
  post: Post;
}


function PostCard({post}: PostCardProps) {
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

    return(
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
                <Reaction _id={post._id} likesCount={post.likesCount} dislikesCount={post.dislikesCount}/>

                {post.updatedAt !== post.createdAt && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    <span className="hidden sm:inline">Updated: </span>
                    <span className="sm:hidden">Updated </span>
                    {formatDate(post.updatedAt)}
                    </div>
                )}
            </div>
        </Card>        
    )
}

export default React.memo(PostCard);