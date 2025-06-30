"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase-browser";

export default function PostMessageForm({
  companionId,
  onMessagePosted,
}: {
  companionId: string;
  onMessagePosted?: () => void;
}) {
  const [content, setContent] = useState("");
  const { user } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content || !user?.id) return alert("Missing content or user.");

    const { error } = await supabase.from("discussions").insert({
      content,
      companion_id: companionId,
      user_id: user.id,
    });

    if (error) {
      alert("Error posting: " + error.message);
    } else {
      setContent("");
      onMessagePosted?.(); // 👈 Trigger refetch
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your message..."
        className="w-full p-3 border rounded-md"
        rows={3}
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Post Message
      </button>
    </form>
  );
}
