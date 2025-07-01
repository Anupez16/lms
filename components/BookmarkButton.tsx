"use client";

import { useState, useTransition } from "react";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";
import Image from "next/image";

export const BookmarkButton = ({
  id,
  initialBookmarked,
  path,
}: {
  id: string;
  initialBookmarked: boolean;
  path: string;
}) => {
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [isPending, startTransition] = useTransition();

  const toggle = async () => {
    startTransition(async () => {
      try {
        if (isBookmarked) {
          await removeBookmark(id, path);
        } else {
          await addBookmark(id, path);
        }
        setIsBookmarked((prev) => !prev);
      } catch (e) {
        console.error("Toggle failed", e);
      }
    });
  };

  return (
    <button onClick={toggle} disabled={isPending}>
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
