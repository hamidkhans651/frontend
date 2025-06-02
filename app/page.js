// app/page.js

import PostCard from "../components/PostCard"; // Import the PostCard component

// Function to fetch all posts from your API.
// This runs on the server side in Next.js App Router.
async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/posts", {
      cache: "no-store", // Ensure data is always fresh, not cached.
    });

    if (!res.ok) {
      // If the response is not OK (e.g., 500 error), throw an error.
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch posts");
    }

    const data = await res.json();
    return data.posts; // Return the array of posts.
  } catch (error) {
    console.error("Error loading posts:", error);
    // You might want to return an empty array or null to handle gracefully in UI.
    return [];
  }
}

export default async function HomePage() {
  const posts = await getPosts(); // Fetch posts when the component renders.

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">All Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found. Start by adding a new one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} /> // Render each post using PostCard.
          ))}
        </div>
      )}
    </div>
  );
}
