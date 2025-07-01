"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { supabase } from "@/lib/supabase-browser";
import { addBookmark, removeBookmark } from "@/lib/actions/companion.actions";

export default function BookmarkButton({
  companionId,
}: {
  companionId: string;
}) {
  const pathname = usePathname();
  const { user } = useUser();
  const [bookmarked, setBookmarked] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const checkBookmark = async () => {
      if (!user?.id) return;

      const { data } = await supabase
        .from("bookmarks")
        .select("id")
        .eq("companion_id", companionId)
        .eq("user_id", user.id)
        .maybeSingle();

      setBookmarked(!!data);
    };

    checkBookmark();
  }, [user?.id, companionId]);

  const handleClick = () => {
    startTransition(async () => {
      if (!user?.id) return;

      if (bookmarked) {
        await removeBookmark(companionId, pathname);
        setBookmarked(false);
      } else {
        await addBookmark(companionId, pathname);
        setBookmarked(true);
      }
    });
  };

  // ✅ Log render to verify
  console.log("🔁 BookmarkButton rendered. Bookmarked:", bookmarked);

  return (
    <button
      key={`${companionId}-${bookmarked}`} // ✅ force re-render when bookmark toggles
      onClick={handleClick}
      disabled={isPending}
      aria-label={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
      className="p-2"
    >
      <Image
        key={bookmarked ? "filled" : "empty"} // ✅ force image re-render
        src={bookmarked ? "/icons/bookmark-filled.svg" : "/icons/bookmark.svg"}
        alt={bookmarked ? "Bookmarked" : "Not bookmarked"}
        width={14}
        height={14}
      />
    </button>
  );
}
