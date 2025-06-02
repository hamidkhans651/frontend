// components/PostForm.jsx

"use client"; // This component needs to run on the client-side.

import { useState } from "react";

export default function PostForm({ initialData = { title: "", content: "" }, onSubmit }) {
  const [title, setTitle] = useState(initialData.title);
  const [content, setContent] = useState(initialData.content);

  /**
   * Handles the form submission.
   * @param {Event} e The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content }); // Call the onSubmit prop with the form data.
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
      >
        {initialData.title ? "Update Post" : "Add Post"}
      </button>
    </form>
  );
}
