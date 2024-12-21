"use client";

import { Suspense } from 'react';
import NotFoundClient from '@/src/components/NotFoundClient/NotFoundClient';

export default function NotFoundPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NotFoundClient />
    </Suspense>
  );
} 