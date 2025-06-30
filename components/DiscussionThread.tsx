"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Discussion = {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
};

export default function DiscussionThread({ companionId }: { companionId: string }) {
  const [messages, setMessages] = useState<Discussion[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("discussions")
        .select("*")
        .eq("companion_id", companionId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading messages:", error);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();
  }, [companionId]);

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="border rounded-lg p-4 bg-white shadow-sm"
        >
          <div className="text-sm text-gray-600 mb-1">
            <strong>User:</strong> {msg.user_id}
          </div>
          <div className="text-base">{msg.content}</div>
          {/* 🔜 Reply button will go here */}
        </div>
      ))}
    </div>
  );
}
