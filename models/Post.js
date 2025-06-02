// models/Post.js

import mongoose, { Schema } from "mongoose";

// Define the Post schema.
const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"], // Title is a required string.
      trim: true, // Trim whitespace from the beginning and end of the string.
      minlength: [3, "Title must be at least 3 characters long"], // Minimum length validation.
    },
    content: {
      type: String,
      required: [true, "Content is required"], // Content is a required string.
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields.
  }
);

// Check if the Post model already exists to prevent "OverwriteModelError" in Next.js development mode.
const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
