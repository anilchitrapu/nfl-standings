"use client";

import { Inter } from 'next/font/google'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react';
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentUrl, setCurrentUrl] = useState('');
  
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [pathname, searchParams]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  )
}

