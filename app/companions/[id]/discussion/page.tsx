"use client";

import { useParams } from "next/navigation";
import DiscussionSection from "@/components/DiscussionSection";

export default function CompanionDiscussionPage() {
  const params = useParams();
  const companionId = params?.id;

  // Optional loading fallback (if needed)
  if (!companionId) {
    return (
      <div className="text-center mt-10 text-gray-500">
        ⏳ Loading discussion...
      </div>
    );
  }

  if (typeof companionId !== "string" || companionId === "undefined") {
    return (
      <div className="text-center mt-10 text-red-600">
        ❌ Invalid or missing Companion ID.
      </div>
    );
  }

  return <DiscussionSection companionId={companionId} />;
}
