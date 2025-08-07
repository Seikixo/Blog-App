import { Button } from "flowbite-react";
import { HiThumbDown, HiThumbUp } from "react-icons/hi";
import { usePost } from "../hooks/usePost";
import React, { useCallback } from "react";
import type { Reaction } from "../types/types";


function Reaction({_id, likesCount, dislikesCount}: Reaction) {
    const {like, dislike} = usePost();
    const handleLike = useCallback(() => like(_id), [like, _id]);
    const handleDislike = useCallback(() => dislike(_id), [dislike, _id]);

    return(
        <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
            size="xs"
            color="light"
            onClick={handleLike}
            className="flex items-center space-x-1 text-xs hover:bg-green-50 hover:text-green-600 transition-colors cursor-pointer"
            >
            <HiThumbUp className="w-3 h-3 sm:w-4 sm:h-4" />
                {likesCount}
            </Button>
            
            <Button
            size="xs"
            color="light"
            onClick={handleDislike}
            className="flex items-center space-x-1 text-xs hover:bg-red-50 hover:text-red-600 transition-colors cursor-pointer"
            >
            <HiThumbDown className="w-3 h-3 sm:w-4 sm:h-4" />
                {dislikesCount}
            </Button>
        </div>        
    )
}

export default React.memo(Reaction);