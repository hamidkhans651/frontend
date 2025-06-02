// app/edit-post/[id]/page.js

"use client"; // This component needs to run on the client-side.

import PostForm from "../../../components/PostForm"; // Import the reusable PostForm component
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Function to fetch a single post by ID.
async function getPostById(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch post");
    }

    const data = await res.json();
    return data.post;
  } catch (error) {
    console.error("Error loading post for editing:", error);
    return null; // Return null if post not found or error occurs.
  }
}

export default function EditPostPage({ params }) {
  const { id } = params; // Get the post ID from the URL parameters.
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch the post data when the component mounts or ID changes.
    const fetchPost = async () => {
      setLoading(true);
      const fetchedPost = await getPostById(id);
      setPost(fetchedPost);
      setLoading(false);
      if (!fetchedPost) {
        setErrorMessage("Post not found or could not be loaded.");
      }
    };
    fetchPost();
  }, [id]); // Re-run effect if ID changes.

  /**
   * Handles the submission of the edit post form.
   * @param {object} formData The updated data from the form (title, content).
   */
  const handleEditPost = async (formData) => {
    setErrorMessage(""); // Clear previous errors

    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update post");
      }

      // If successful, navigate back to the home page and refresh data.
      router.push("/");
      router.refresh(); // Revalidate data on the home page.
    } catch (error) {
      console.error("Error updating post:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600 text-xl font-semibold">Loading post...</div>
    );
  }

  if (errorMessage) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {errorMessage}</span>
        <button onClick={() => router.push('/')} className="ml-4 text-blue-700 hover:underline">Go to Home</button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-gray-600 text-xl font-semibold">Post not found.</div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog Post</h1>
      <PostForm
        initialData={{ title: post.title, content: post.content }} // Pass existing data to the form
        onSubmit={handleEditPost}
      />
    </div>
  );
}
