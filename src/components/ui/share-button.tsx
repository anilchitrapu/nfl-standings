"use client"

import React from 'react'

interface ShareData {
  title: string;
  text: string;
  url?: string;
}

interface ShareButtonProps {
  title: string;
  text: string;
  url?: string;
  className?: string;
}

export function ShareButton({ title, text, url, className }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData: ShareData = { title, text };
    if (url) {
      shareData.url = url;
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to clipboard
        const shareText = `${title}\n${text}${url ? `\n${url}` : ''}`;
        await navigator.clipboard.writeText(shareText);
        // You might want to show a toast/notification here
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={className}
      aria-label="Share"
    >
      Share
    </button>
  );
}
