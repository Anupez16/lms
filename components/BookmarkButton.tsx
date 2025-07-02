"use client"; // Enables client-side interactivity in Next.js App Router

import { useState, useTransition } from "react";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";

// BookmarkButton Component
// Renders a clickable icon to bookmark/unbookmark a companion
export const BookmarkButton = ({
  id, // Unique identifier of the companion item
  initialBookmarked, // Whether the item is already bookmarked
  path, // Current page path, used in Supabase queries
}: {
  id: string;
  initialBookmarked: boolean;
  path: string;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked); // Local state to reflect UI
  const [isPending, startTransition] = useTransition(); // Used to show async UI transitions

  // Toggles the bookmark state: adds or removes from Supabase
  const toggle = async () => {
    startTransition(async () => {
      try {
        if (isBookmarked) {
          await removeBookmark(id, path); // Remove from bookmarks
        } else {
          await addBookmark(id, path); // Add to bookmarks
        }
        setIsBookmarked((prev) => !prev); // Update local UI state
      } catch (e) {
        console.error("Toggle failed", e); // Catch async errors (e.g. network issues)
      }
    });
  };

  return (
    <button onClick={toggle} disabled={isPending}>
      {/* Show filled or empty bookmark icon based on current state */}
      <Image
        src={
          isBookmarked
            ? "/icons/bookmark-filled.svg"
            : "/icons/bookmark.svg"
        }
        alt="Bookmark"
        width={18}
        height={18}
      />
    </button>
  );
};
