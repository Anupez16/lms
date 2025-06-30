"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import PostMessageForm from "./PostMessageForm";

type Message = {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
};

export default function DiscussionSection({ companionId }: { companionId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);

  // Fetch all messages from Supabase
  const fetchMessages = async () => {
    console.log("🔎 Fetching messages for companionId:", companionId);

    const { data, error } = await supabase
      .from("discussions")
      .select("*")
      .eq("companion_id", companionId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error loading messages:", error);
    } else {
      console.log("📦 Messages fetched:", data);
      setMessages(data);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [companionId]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Discussion</h2>

      {/* Post form */}
      <PostMessageForm companionId={companionId} onMessagePosted={fetchMessages} />

      {/* Messages */}
      <div className="mt-6 space-y-4">
        {messages.length === 0 && (
          <p className="text-gray-500">No discussions yet. Start one!</p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="border p-4 rounded-md bg-white shadow-sm"
          >
            <div className="text-sm text-gray-600">
              👤 <span className="font-medium">{msg.user_id}</span>
              <span className="ml-4 text-xs text-gray-500">
                {new Date(msg.created_at).toUTCString()}
              </span>
            </div>
            <div className="mt-2 text-gray-800">{msg.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
