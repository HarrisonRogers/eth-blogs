import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Page not found</h1>
      <div className="flex justify-center items-center">
        <Link
          href="/"
          className="mt-10 p-4 border border-gray-300 rounded-md hover:scale-105 active:scale-100 transition-all duration-300"
        >
          Go to home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
