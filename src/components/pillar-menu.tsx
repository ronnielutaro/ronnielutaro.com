// src/modules/common/components/PillarMenu.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import FloatingButton from '@/__samwise/modules/edit/components/FloatingButton';
import Modal from '@/components/modal';
import EditBlogForm from '@/__samwise/modules/edit/forms/EditBlog';
import EditPostForm from '@/__samwise/modules/edit/forms/EditPost';
import { IS_BLOG_USER_CONFIGURED } from '@/config';
import axios from 'axios';
import { AlertTriangle } from 'lucide-react';
import { toast } from 'react-toastify';
import { Post } from '@/app/get-posts';
import { ButtonsArrayType } from '@/__samwise/types/Buttons';

interface PillarMenuProps {
  buttons?: ButtonsArrayType;
  slug?: string; // For delete-post
  currentPost?: Post; // For edit-post
}

const PillarMenu: React.FC<PillarMenuProps> = ({
  buttons = [],
  slug = '',
  currentPost,
}) => {
  const [isEditBlogModalOpen, setEditBlogModalOpen] = useState(
    !IS_BLOG_USER_CONFIGURED,
  );
  const [isCreatePostModalOpen, setCreatePostModalOpen] = useState(false);
  const [isEditPostModalOpen, setEditPostModalOpen] = useState(false);
  const [isDeletePostModalOpen, setDeletePostModalOpen] = useState(false);
  const [inputSlug, setInputSlug] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const showToast = (message: string, isSuccess: boolean) => {
    if (isSuccess) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (pathname) {
      setIsEditMode(pathname.endsWith('/edit'));
    }
  }, [pathname]);

  useEffect(() => {
    if (!IS_BLOG_USER_CONFIGURED) {
      setEditBlogModalOpen(true);
    }
  }, []);

  // Handler to open modals based on button type
  const handleButtonClick = (type: string) => {
    switch (type) {
      case 'edit-blog':
        setEditBlogModalOpen(true);
        break;
      case 'create-post':
        setCreatePostModalOpen(true);
        break;
      case 'edit-post':
        setEditPostModalOpen(true);
        break;
      case 'delete-post':
        setDeletePostModalOpen(true);
        break;
      case 'toggle-edit-mode':
        handleToggleEditMode();
        break;
      default:
        break;
    }
  };

  const handleToggleEditMode = () => {
    if (!pathname) return;

    if (isEditMode) {
      router.replace(pathname.replace('/edit', ''));
    } else {
      router.replace(`${pathname}/edit`);
    }
    setIsEditMode(!isEditMode);
  };

  // Handlers to close modals
  const closeEditBlogModal = () => {
    setEditBlogModalOpen(false);
  };

  const closeCreatePostModal = () => {
    setCreatePostModalOpen(false);
  };

  const closeEditPostModal = () => {
    setEditPostModalOpen(false);
  };

  const closeDeletePostModal = () => {
    setDeletePostModalOpen(false);
    setInputSlug('');
  };

  // Handle deletion of post
  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const response = await axios.post('/api/blog/delete-post', { slug });

      if (response.data.success) {
        // Show success toast notification
        toast.success('Blog post deleted successfully!', {});

        // Navigate to the home page and refresh
        router.replace('/');
      } else {
        console.error('Error deleting blog post:', response.data.error);
        toast.error('Failed to delete the blog post.', {});
      }
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('An error occurred while deleting the blog post.', {});
    } finally {
      setIsDeleting(false);
    }
  };

  // If in production, return null without rendering anything
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed top-1/2 right-0 transform -translate-y-1/2 flex flex-col mr-4 z-50">
      {/* Menu Container */}
      <div
        className={`transition-all shadow-lg duration-300 ease-in-out py-1 flex flex-col items-center rounded-full bg-[#222222] dark:border-[#555] border`}
        style={{
          height: 'auto',
          opacity: 1,
        }}
      >
        {/* Menu Items */}
        <ul className="flex flex-col items-center space-y-2">
          {buttons.map((button, index) => (
            <li key={index}>
              <FloatingButton
                type={button.type}
                onClick={() => handleButtonClick(button.type)}
                isEditMode={
                  button.type === 'toggle-edit-mode' ? isEditMode : undefined
                }
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Modals */}
      {/* Edit Blog Modal */}
      {isEditBlogModalOpen && (
        <Modal
          isOpen={isEditBlogModalOpen}
          onClose={closeEditBlogModal}
          title="Configure Blog"
        >
          <EditBlogForm
            toggleModal={closeEditBlogModal}
            showToast={showToast} // Pass showToast function here
          />
        </Modal>
      )}

      {/* Create Post Modal */}
      {isCreatePostModalOpen && (
        <Modal
          isOpen={isCreatePostModalOpen}
          onClose={closeCreatePostModal}
          title="Create New Post"
        >
          <EditPostForm
            currentPost={undefined}
            onSuccess={() => {
              closeCreatePostModal();
              router.refresh();
            }}
          />
        </Modal>
      )}

      {/* Edit Post Modal */}
      {isEditPostModalOpen && (
        <Modal
          isOpen={isEditPostModalOpen}
          onClose={closeEditPostModal}
          title="Edit Post"
        >
          <EditPostForm
            currentPost={currentPost}
            onSuccess={() => {
              closeEditPostModal();
              router.refresh();
            }}
          />
        </Modal>
      )}

      {/* Delete Post Modal */}
      {isDeletePostModalOpen && (
        <Modal
          isOpen={isDeletePostModalOpen}
          onClose={closeDeletePostModal}
          title="Delete Blog Post"
        >
          <div className="p-6">
            {/* Slug Input */}
            <p className="mb-4 text-md text-gray-700 dark:text-[#999999]">
              To confirm deletion, type the full slug of the blog post:{' '}
              <b>{slug}</b>.
            </p>
            <div className="flex items-center text-yellow-600 mb-4">
              <AlertTriangle size={24} className="mr-2" />
              <p className="text-sm">
                Blog post will be deleted, along with all images associated with
                the blog post. This action cannot be undone.
              </p>
            </div>
            <input
              type="text"
              value={inputSlug}
              onChange={(e) => setInputSlug(e.target.value)}
              placeholder="Enter full slug here"
              className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:bg-transparent dark:border-gray-700"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeDeletePostModal}
                className="px-4 py-2 rounded-md text-gray-700 bg-white hover:bg-gray-200 dark:bg-gray-700 dark:text-[#999999] dark:hover:bg-gray-600"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={`px-4 py-2 rounded-md text-white ${
                  inputSlug === slug
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-red-300 cursor-not-allowed'
                }`}
                disabled={inputSlug !== slug || isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PillarMenu;
