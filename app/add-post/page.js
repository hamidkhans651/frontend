// app/add-post/page.js

"use client"; // This component needs to run on the client-side for form interaction.

import PostForm from "../../components/PostForm"; // Import the reusable PostForm component
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddPostPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Handles the submission of the new post form.
   * @param {object} formData The data from the form (title, content).
   */
  const handleAddPost = async (formData) => {
    setErrorMessage(""); // Clear previous errors

    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add post");
      }

      // If successful, navigate back to the home page and refresh data.
      router.push("/");
      router.refresh(); // Revalidate data on the home page.
    } catch (error) {
      console.error("Error adding post:", error);
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Blog Post</h1>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      )}
      <PostForm onSubmit={handleAddPost} /> {/* Render the PostForm component */}
    </div>
  );
}
