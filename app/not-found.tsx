"use client";

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Wrapper component that uses search params
function NotFoundWrapper() {
  const searchParams = useSearchParams();
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-4">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4">The page you're looking for doesn't exist.</p>
        <a 
          href={`/?${searchParams.toString()}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundWrapper />
    </Suspense>
  );
} 