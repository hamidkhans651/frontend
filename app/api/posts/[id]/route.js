// app/api/posts/[id]/route.js

import dbConnect from "../../../../lib/mongodb"; // Adjust path
import Post from "../../../../models/Post";     // Adjust path
import { NextResponse } from "next/server";

/**
 * Handles GET requests to fetch a single blog post by ID.
 * @param {Request} request The incoming request object.
 * @param {object} params The dynamic route parameters (e.g., { id: 'postId' }).
 * @returns {NextResponse} A JSON response containing the post or an error message.
 */
export async function GET(request, { params }) {
  const { id } = params; // Get the ID from the URL parameters.

  try {
    await dbConnect(); // Connect to the database.
    const post = await Post.findById(id); // Find post by ID.

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 } // Not Found if post doesn't exist.
      );
    }

    return NextResponse.json({ post }, { status: 200 }); // Respond with post and 200 OK.
  } catch (error) {
    console.error(`API Error fetching post with ID ${id}:`, error);
    return NextResponse.json(
      { message: "Failed to fetch post", error: error.message },
      { status: 500 } // Respond with 500 Internal Server Error.
    );
  }
}

/**
 * Handles PUT requests to update a single blog post by ID.
 * @param {Request} request The incoming request object containing updated post data.
 * @param {object} params The dynamic route parameters (e.g., { id: 'postId' }).
 * @returns {NextResponse} A JSON response containing the updated post or an error message.
 */
export async function PUT(request, { params }) {
  const { id } = params; // Get the ID from the URL parameters.
  const body = await request.json(); // Parse the JSON body.
  const { title, content } = body;

  try {
    await dbConnect(); // Connect to the database.

    // Find the post by ID and update it.
    // `new: true` returns the updated document.
    // `runValidators: true` runs schema validators on update.
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 } // Not Found if post doesn't exist.
      );
    }

    return NextResponse.json(
      { message: "Post updated successfully", post: updatedPost },
      { status: 200 } // Respond with 200 OK.
    );
  } catch (error) {
    console.error(`API Error updating post with ID ${id}:`, error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: "Validation Error", errors: messages },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Failed to update post", error: error.message },
      { status: 500 } // Respond with 500 Internal Server Error.
    );
  }
}

/**
 * Handles DELETE requests to delete a single blog post by ID.
 * @param {Request} request The incoming request object.
 * @param {object} params The dynamic route parameters (e.g., { id: 'postId' }).
 * @returns {NextResponse} A JSON response indicating success or an error message.
 */
export async function DELETE(request, { params }) {
  const { id } = params; // Get the ID from the URL parameters.

  try {
    await dbConnect(); // Connect to the database.
    const deletedPost = await Post.findByIdAndDelete(id); // Find and delete post by ID.

    if (!deletedPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 } // Not Found if post doesn't exist.
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 } // Respond with 200 OK.
    );
  } catch (error) {
    console.error(`API Error deleting post with ID ${id}:`, error);
    return NextResponse.json(
      { message: "Failed to delete post", error: error.message },
      { status: 500 } // Respond with 500 Internal Server Error.
    );
  }
}
