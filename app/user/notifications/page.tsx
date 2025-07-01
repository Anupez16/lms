"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

const UserNotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const supabase = createClientComponentClient();

      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("❌ Failed to fetch notifications:", error.message);
      } else {
        setNotifications(data || []);

        // ✅ Mark unread notifications as read
        const unreadIds = data?.filter((n) => !n.is_read).map((n) => n.id);
        if (unreadIds && unreadIds.length > 0) {
          await supabase
            .from("notifications")
            .update({ is_read: true })
            .in("id", unreadIds);
        }
      }

      setLoading(false);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold text-center">🔔 Notifications</h1>

      {loading &&
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-20 rounded-lg" />
        ))}

      {!loading && notifications.length === 0 && (
        <p className="text-center text-gray-500">You have no notifications.</p>
      )}

      {!loading &&
        notifications.map((note) => (
          <Card
            key={note.id}
            className={`p-4 border ${
              note.is_read ? "opacity-70" : "border-blue-500 bg-blue-50"
            }`}
          >
            <h2 className="font-semibold text-lg">{note.title}</h2>
            <p className="text-gray-700">{note.message}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(note.created_at).toLocaleString()}
            </p>
          </Card>
        ))}
    </div>
  );
};

export default UserNotificationsPage;
