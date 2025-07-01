'use client';

import { useState } from "react";
import { createNotification } from "@/lib/actions/notification.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AdminDashboardPage = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetUserId, setTargetUserId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createNotification({
        title,
        message,
        target_user_id: targetUserId || null,
      });
      alert("✅ Notification created");
      setTitle("");
      setMessage("");
      setTargetUserId("");
    } catch (error) {
      console.error("❌ Error creating notification:", error);
      alert("Failed to send notification.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">📢 Create Notification</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <Textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <Input
          placeholder="Target User ID (optional)"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
        />
        <Button type="submit" className="w-full">
          Send Notification
        </Button>
      </form>
    </div>
  );
};

export default AdminDashboardPage;
