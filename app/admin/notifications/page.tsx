"use client";

import { useState } from "react";
import { createNotification } from "@/lib/actions/notification.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const AdminNotificationPage = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetUserId, setTargetUserId] = useState(""); // Optional

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      await createNotification({
        title,
        message,
        target_user_id: targetUserId.trim() || null,
      });
      setTitle("");
      setMessage("");
      setTargetUserId("");
      setSuccess(true);
    } catch (error) {
      alert("Error creating notification");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Create Notification</h1>
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
          placeholder="Target User ID (leave blank to notify all)"
          value={targetUserId}
          onChange={(e) => setTargetUserId(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Notification"}
        </Button>
        {success && <p className="text-green-600">✅ Notification sent!</p>}
      </form>
    </div>
  );
};

export default AdminNotificationPage;
