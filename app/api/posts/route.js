// app/api/posts/route.js

import dbConnect from "../../../lib/mongodb"; // Adjust path as per your project structure
import Post from "../../../models/Post";     // Adjust path as per your project structure
import { NextResponse } from "next/server";

/**
 * Handles GET requests to fetch all blog posts.
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A JSON response containing all posts or an error message.
 */
export async function GET() {
  try {
    await dbConnect(); // Connect to the database.
    const posts = await Post.find({}); // Find all posts.
    return NextResponse.json({ posts }, { status: 200 }); // Respond with posts and 200 OK.
  } catch (error) {
    console.error("API Error fetching posts:", error);
    return NextResponse.json(
      { message: "Failed to fetch posts", error: error.message },
      { status: 500 } // Respond with 500 Internal Server Error.
    );
  }
}

/**
 * Handles POST requests to create a new blog post.
 * @param {Request} request The incoming request object containing the post data.
 * @returns {NextResponse} A JSON response containing the created post or an error message.
 */
export async function POST(request) {
  try {
    await dbConnect(); // Connect to the database.
    const body = await request.json(); // Parse the JSON body from the request.
    const { title, content } = body;

    // Basic validation
    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content are required." },
        { status: 400 } // Bad Request if data is missing.
      );
    }

    const newPost = await Post.create({ title, content }); // Create a new post.
    return NextResponse.json(
      { message: "Post created successfully", post: newPost },
      { status: 201 } // Respond with 201 Created.
    );
  } catch (error) {
    console.error("API Error creating post:", error);
    // Handle Mongoose validation errors specifically.
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: "Validation Error", errors: messages },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to create post", error: error.message },
      { status: 500 } // Respond with 500 Internal Server Error.
    );
  }
}
