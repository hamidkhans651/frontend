// app/layout.js

import './globals.css'; // Your global CSS (e.g., Tailwind base styles)
import Link from 'next/link';

export const metadata = {
  title: 'My Simple Blog App',
  description: 'A basic blog application built with Next.js and MongoDB.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <header className="bg-blue-600 text-white p-4 shadow-md">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
              My Blog
            </Link>
            <div className="space-x-4">
              <Link href="/" className="hover:text-blue-200 transition-colors">
                All Posts
              </Link>
              <Link href="/add-post" className="hover:text-blue-200 transition-colors">
                Add New Post
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-grow container mx-auto p-4">
          {children} {/* This is where your page content will be rendered */}
        </main>
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
          <p>&copy; {new Date().getFullYear()} My Blog App. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
