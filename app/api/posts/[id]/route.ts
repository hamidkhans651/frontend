// app/api/posts/[id]/route.ts

import dbConnect from "../../../../lib/mongodb";
import Post from "../../../../models/Post";
import { NextResponse } from "next/server";

interface Params {
  id: string;
}

// The key fix: Make params explicitly a Promise
export async function GET(request: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;

  try {
    await dbConnect();
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    console.error(`API Error fetching post with ID ${id}:`, error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch post";
    return NextResponse.json(
      { message: "Failed to fetch post", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;
  const body = await request.json();
  const { title, content } = body;

  try {
    await dbConnect();
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post updated successfully", post: updatedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error(`API Error updating post with ID ${id}:`, error);
    
    if (error instanceof Error && error.name === 'ValidationError') {
      const messages = Object.values((error as any).errors).map((err: any) => err.message);
      return NextResponse.json(
        { message: "Validation Error", errors: messages },
        { status: 400 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : "Failed to update post";
    return NextResponse.json(
      { message: "Failed to update post", error: errorMessage },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;

  try {
    await dbConnect();
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(`API Error deleting post with ID ${id}:`, error);
    
    const errorMessage = error instanceof Error ? error.message : "Failed to delete post";
    return NextResponse.json(
      { message: "Failed to delete post", error: errorMessage },
      { status: 500 }
    );
  }
}