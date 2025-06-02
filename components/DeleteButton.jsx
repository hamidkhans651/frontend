// components/DeleteButton.jsx

"use client"; // This component needs to run on the client-side.

import { HiOutlineTrash } from "react-icons/hi"; // You'll need to install react-icons
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ postId }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  /**
   * Handles the delete action after confirmation.
   */
  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError("");
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete post");
      }

      // If successful, navigate back to the home page and refresh data.
      router.push("/");
      router.refresh(); // Revalidate data on the home page.
    } catch (error) {
      console.error("Error deleting post:", error);
      setDeleteError(error.message || "An unexpected error occurred during deletion.");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false); // Close the confirmation modal.
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-600 hover:text-red-800 transition-colors"
        disabled={isDeleting} // Disable button while deleting
      >
        <HiOutlineTrash size={24} />
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
            {deleteError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-sm">
                {deleteError}
              </div>
            )}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
