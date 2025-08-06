import React, { useMemo, useState } from "react";
import { usePost } from "../hooks/usePost";
import type { Post } from "../types/types";
import {
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Modal,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { HiClock, HiOutlineTrash, HiOutlinePencil } from "react-icons/hi";



function MyPost() {
    const {myPosts, isLoadingMyPost, isErrorMyPost, deletePost, updatePost} = usePost();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [updatedTitle, setUpdatedTitle] = useState("");
    const [updatedContent, setUpdatedContent] = useState("");

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

    const handleDelete = async () => {
        if (selectedPost) {
        await deletePost(selectedPost._id);
        setShowDeleteModal(false);
        }
    };

    const handleUpdate = async () => {
        if (selectedPost) {
        await updatePost(selectedPost._id, {
            title: updatedTitle,
            content: updatedContent,
        });
        setShowUpdateModal(false);
        }
    };

    const openDeleteModal = (post: Post) => {
        setSelectedPost(post);
        setShowDeleteModal(true);
    };

    const openUpdateModal = (post: Post) => {
        setSelectedPost(post);
        setUpdatedTitle(post.title);
        setUpdatedContent(post.content);
        setShowUpdateModal(true);
    };

  const renderingMyPosts = useMemo(() => {
    if (!myPosts || myPosts.length === 0) return null;

    return myPosts.map((post: Post) => (
      <Card
        key={post._id}
        className="mb-4 sm:mb-6 hover:shadow-lg transition-shadow duration-300 relative"
      >
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <Button className="cursor-pointer" color="blue" size="xs" onClick={() => openUpdateModal(post)}>
            <HiOutlinePencil className="w-4 h-4" />
          </Button>
          <Button className="cursor-pointer" color="red" size="xs" onClick={() => openDeleteModal(post)}>
            <HiOutlineTrash className="w-4 h-4" />
          </Button>
        </div>

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
        {post.updatedAt !== post.createdAt && (
            <div className="flex text-xs text-gray-500 dark:text-gray-400 truncate w-full justify-end">
            <span className="hidden sm:inline">Updated: </span>
            <span className="sm:hidden">Updated </span>
            { formatDate(post.updatedAt)  }
            </div>
        )}
      </Card>
    ));
  }, [myPosts]);

  if (isLoadingMyPost) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner aria-label="Loading posts" size="xl" />
        <span className="ml-3 text-lg text-gray-600 dark:text-gray-400">Loading posts...</span>
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

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Posts
            </h1>
        </div>
       <div className="space-y-4 sm:space-y-6">{renderingMyPosts}</div>
        <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} size="md">
            <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Delete Post
                </h3>
                
                <div className="mb-6">
                <p className="text-gray-500 dark:text-gray-400">
                    Are you sure you want to delete this post? This action cannot be undone.
                </p>
                </div>
                
                <div className="flex justify-end gap-2">
                <Button className="cursor-pointer" color="red" onClick={handleDelete}>
                    Delete
                </Button>
                <Button className="cursor-pointer" color="gray" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                </div>
            </div>
        </Modal>   

        <Modal
        show={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        size="md"
        popup
        >
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Update Post
              </h3>
              
              <form className="space-y-4 mb-6">
                <TextInput
                    id="title"
                    placeholder="Enter title"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                    required
                />
                <Textarea
                    id="content"
                    placeholder="Enter content"
                    value={updatedContent}
                    onChange={(e) => setUpdatedContent(e.target.value)}
                    rows={5}
                    required
                />
              </form>
                
              <div className="flex justify-end gap-2">
                <Button className="cursor-pointer" color="blue" onClick={handleUpdate}>
                    Save Changes
                </Button>
                <Button className="cursor-pointer" color="gray" onClick={() => setShowUpdateModal(false)}>
                    Cancel
                </Button>
              </div>
            </div>
        </Modal>
    </div>
  );
}

export default React.memo(MyPost);