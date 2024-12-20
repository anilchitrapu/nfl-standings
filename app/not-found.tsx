"use client";

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Import the NotFound wrapper component dynamically
const NotFoundWrapper = dynamic(
  () => import('@/components/NotFoundWrapper'),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  }
);

export default function NotFound() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundWrapper />
    </Suspense>
  );
} 