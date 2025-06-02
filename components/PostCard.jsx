// components/PostCard.jsx

import Link from "next/link";
import DeleteButton from "./DeleteButton"; // Import the delete button component
import { HiPencilAlt } from "react-icons/hi"; // You'll need to install react-icons: npm install react-icons

export default function PostCard({ post }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <div>
        <h2 className="font-bold text-2xl text-gray-800 mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p> {/* line-clamp for summary */}
      </div>
      <div className="flex justify-between items-center mt-4">
        <Link href={`/posts/${post._id}`} className="text-blue-600 hover:underline text-sm font-medium">
          Read More
        </Link>
        <div className="flex gap-2">
          {/* Delete Button */}
          <DeleteButton postId={post._id} />
          {/* Edit Link */}
          <Link href={`/edit-post/${post._id}`} className="text-gray-500 hover:text-blue-600 transition-colors">
            <HiPencilAlt size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
