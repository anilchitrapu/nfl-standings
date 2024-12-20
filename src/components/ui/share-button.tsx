"use client"

import React from 'react'

interface ShareButtonProps {
  title: string
  text: string
  url?: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  function handleShare() {
    const shareData = { title, text };
    if (url) {
      shareData['url'] = url;
    }

    if (navigator.share) {
      navigator.share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch(console.error)
    } else {
      // Fallback if the browser does not support navigator.share
      const fallbackText = url ? `${text}\n${url}` : text;
      navigator.clipboard.writeText(fallbackText);
      alert('Copied text to clipboard');
    }
  }

  return (
    <button
      onClick={handleShare}
      className="px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-colors"
    >
      Share
    </button>
  )
}
